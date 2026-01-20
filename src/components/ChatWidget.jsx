import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

/**
 * Helpers: URLs + rendering + preview
 */
const API_BASE = (
  import.meta.env.VITE_COQUITO_API_BASE ||
  "https://chatbot-portfolio-red.vercel.app"
).replace(/\/$/, "");

function safeDecodeUrlForDisplay(url) {
  try {
    const u = new URL(url);
    const host = u.host;
    const path = decodeURIComponent(u.pathname);
    const rest = (u.search || "") + (u.hash || "");
    return host + path + rest;
  } catch {
    try {
      return decodeURIComponent(url);
    } catch {
      return url;
    }
  }
}

function normalizeUrl(raw) {
  let s = String(raw || "").trim();

  // ✅ Remove common wrappers: <...>  "...", '...', (...), [...]
  s = s.replace(/^[<("'\[]+/, "");
  s = s.replace(/[>")'\]]+$/, "");

  // ✅ Remove trailing punctuation (includes > which can break)
  s = s.replace(/[)\].,!?;:>]+$/g, "");

  // ✅ Normalize scheme
  if (/^www\./i.test(s)) return `https://${s}`;

  // bare domain: github.com/NicoEspin
  if (!/^https?:\/\//i.test(s) && /^[a-z0-9.-]+\.[a-z]{2,}(\/|$)/i.test(s)) {
    return `https://${s}`;
  }

  return s;
}

// ✅ keep this name because you already use it in multiple places
function stripTrailingPunctuation(url) {
  return normalizeUrl(url);
}

function extractUrls(content) {
  const text = String(content || "");
  const urls = new Set();

  // markdown: [text](https://...)
  const mdRe = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let m;
  while ((m = mdRe.exec(text)) !== null) {
    urls.add(normalizeUrl(m[2]));
  }

  // raw: https://..., www..., github.com/...
  // (avoid capturing ')' '>' '"' ']' etc as part of the link)
  const rawRe =
    /(?:https?:\/\/|www\.)[^\s)<>"'\]]+|(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s)<>"'\]]*)?/gi;

  while ((m = rawRe.exec(text)) !== null) {
    const hit = (m[0] || "").trim();
    if (!hit || hit.length < 4) continue;
    urls.add(normalizeUrl(hit));
  }

  return Array.from(urls);
}

function MessageContent({ content }) {
  const text = String(content || "");
  const nodes = [];
  let i = 0;

  const mdRe = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

  // raw: https://..., www..., github.com/...
  const rawRe =
    /(?:https?:\/\/|www\.)[^\s)<>"'\]]+|(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s)<>"'\]]*)?/gi;

  while (i < text.length) {
    mdRe.lastIndex = i;
    rawRe.lastIndex = i;

    const mdMatch = mdRe.exec(text);
    const rawMatch = rawRe.exec(text);

    const next = (() => {
      if (!mdMatch && !rawMatch) return null;
      if (mdMatch && rawMatch) {
        return mdMatch.index <= rawMatch.index
          ? { type: "md", match: mdMatch }
          : { type: "raw", match: rawMatch };
      }
      if (mdMatch) return { type: "md", match: mdMatch };
      return { type: "raw", match: rawMatch };
    })();

    if (!next) {
      nodes.push(text.slice(i));
      break;
    }

    const start = next.match.index;
    if (start > i) nodes.push(text.slice(i, start));

    if (next.type === "md") {
      const label = next.match[1];
      const href = normalizeUrl(next.match[2]);
      const display =
        label && label.trim() ? label : safeDecodeUrlForDisplay(href);

      nodes.push(
        <a
          key={`md-${start}-${href}`}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="underline text-primary1 hover:opacity-80 break-all"
        >
          {display}
        </a>,
      );

      i = start + next.match[0].length;
    } else {
      const rawHit = next.match[0] || "";

      const href = stripTrailingPunctuation(rawHit);
      const looksLikeUrl =
        /^https?:\/\//i.test(href) ||
        /^www\./i.test(href) ||
        /^[a-z0-9.-]+\.[a-z]{2,}(\/|$)/i.test(href);

      if (!looksLikeUrl) {
        nodes.push(rawHit);
        i = start + rawHit.length;
        continue;
      }

      const display = safeDecodeUrlForDisplay(href);

      nodes.push(
        <a
          key={`raw-${start}-${href}`}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="underline text-primary1 hover:opacity-80 break-all"
        >
          {display}
        </a>,
      );

      i = start + rawHit.length;
    }
  }

  return <>{nodes}</>;
}

function LinkPreview({ url }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function run() {
      setError(false);
      setData(null);

      try {
        const resp = await fetch(
          `/api/link-preview?url=${encodeURIComponent(url)}`,
          { signal: controller.signal },
        );
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    run();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [url]);

  const pretty = safeDecodeUrlForDisplay(url);

  if (error) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-2 block rounded-2xl border border-primary1/25 bg-background3/70 p-3 hover:bg-background3 transition"
      >
        <div className="text-xs text-text2 truncate">{pretty}</div>
        <div className="text-sm text-text1 mt-1">Open link</div>
      </a>
    );
  }

  if (!data) {
    return (
      <div className="mt-2 rounded-2xl border border-primary1/25 bg-background3/70 p-3">
        <div className="text-xs text-text2 truncate">{pretty}</div>
        <div className="text-sm text-text1/80 mt-1">Loading preview…</div>
      </div>
    );
  }

  const title = data.title || pretty;
  const desc = data.description || "";
  const site = data.siteName || "";

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="mt-2 block rounded-2xl border border-primary1/25 bg-background3/70 hover:bg-background3 transition overflow-hidden"
    >
      {data.image ? (
        <div className="w-full h-32 bg-black/20">
          <img
            src={data.image}
            alt={title}
            className="w-full h-32 object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : null}

      <div className="p-3">
        {site ? <div className="text-xs text-text2 mb-1">{site}</div> : null}
        <div className="text-sm font-semibold text-text1 line-clamp-2">
          {title}
        </div>
        {desc ? (
          <div className="text-xs text-text2 mt-1 line-clamp-2">{desc}</div>
        ) : null}
        <div className="text-xs text-primary1 mt-2 truncate">{pretty}</div>
      </div>
    </a>
  );
}

/**
 * ChatWidget (JSX)
 */

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi 👋 I'm Coquito, Nico's portfolio assistant. What would you like to know?",
    },
  ]);

  const listRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading],
  );

  async function send() {
    if (!canSend) return;

    const userMsg = { role: "user", content: input.trim() };
    const base = [...messages, userMsg];
    const assistantIndex = base.length; // placeholder index

    setMessages([...base, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch(`${API_BASE}/api/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        // ⚠️ evita caché intermedia en algunos entornos
        cache: "no-store",
        body: JSON.stringify({ messages: base }),
      });

      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      if (!resp.body)
        throw new Error("No response body (ReadableStream) available");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      const appendToAssistant = (delta) => {
        if (!delta) return;
        setMessages((prev) => {
          const next = [...prev];
          const curr = next[assistantIndex] || {
            role: "assistant",
            content: "",
          };
          next[assistantIndex] = {
            ...curr,
            content: (curr.content || "") + delta,
          };
          return next;
        });
      };

      const setAssistantToError = (text) => {
        setMessages((prev) => {
          const next = [...prev];
          next[assistantIndex] = {
            role: "assistant",
            content: text || "An error occurred in the stream.",
          };
          return next;
        });
      };

      let shouldStop = false;

      while (!shouldStop) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split(/\r?\n\r?\n/);
        buffer = events.pop() || "";

        for (const rawEvent of events) {
          if (!rawEvent || rawEvent.startsWith(":")) continue;

          const lines = rawEvent.split(/\r?\n/);

          let eventType = "message";
          const dataLines = [];

          for (const line of lines) {
            if (line.startsWith("event:")) eventType = line.slice(6).trim();
            if (line.startsWith("data:")) dataLines.push(line.slice(5).trim());
          }

          const dataStr = dataLines.join("\n");

          if (eventType === "done" || dataStr === "[DONE]") {
            shouldStop = true;
            try {
              await reader.cancel();
            } catch {}
            break;
          }

          if (eventType === "error") {
            try {
              const parsed = JSON.parse(dataStr || "{}");
              setAssistantToError(parsed?.message || "Stream error.");
            } catch {
              setAssistantToError("Stream error.");
            }
            continue;
          }

          if (eventType === "delta") {
            try {
              const parsed = JSON.parse(dataStr || "{}");
              appendToAssistant(parsed?.delta || "");
            } catch {
              appendToAssistant(dataStr);
            }
          }
        }
      }
    } catch (e) {
      setMessages((prev) => {
        const next = [...prev];
        next[assistantIndex] = {
          role: "assistant",
          content:
            "Oops — there was an error connecting to the chat. Please try again in a few seconds.",
        };
        return next;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      {!open ? (
        <motion.button
          key="chat-fab"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-6 right-6 z-50 flex justify-center items-center size-14 border rounded-full border-primary1 text-text1 bg-custom-gradient shadow-custom-shadow"
          initial={{ opacity: 0, scale: 0.92, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 6 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bot className="w-7 h-7" />
        </motion.button>
      ) : (
        <motion.div
          key="chat-panel"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed bottom-4 right-4 z-50 w-[360px] h-[520px] rounded-2xl bg-background1 bg-opacity-90 shadow-md overflow-hidden flex flex-col border border-primary1/20"
        >
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-primary1/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-9 rounded-full border border-primary1/30 bg-background3">
                <Bot className="w-5 h-5 text-text1" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-text1">Coquito</div>
                <div className="text-xs text-text2">Portfolio assistant</div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="size-9 rounded-full flex items-center justify-center border border-primary1/20 hover:border-primary1/40 hover:bg-background3 transition"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-text1" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="coquito-scroll flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 pr-4 space-y-3"
          >
            {messages.map((m, idx) => {
              const isUser = m.role === "user";
              const isStreaming =
                !isUser && loading && idx === messages.length - 1;

              const urls = !isUser ? extractUrls(m.content || "") : [];
              const firstUrl = urls[0] ? normalizeUrl(urls[0]) : null;

              return (
                <div
                  key={idx}
                  className={[
                    "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap border",
                    isUser
                      ? "ml-auto bg-background3 text-white border-primary1/30"
                      : "bg-background3/70 text-white border-white/10",
                  ].join(" ")}
                >
                  {m.content ? (
                    <MessageContent content={m.content} />
                  ) : m.role === "assistant" && loading ? (
                    <span className="text-text2">Typing…</span>
                  ) : null}

                  {!isUser && !isStreaming && firstUrl ? (
                    <LinkPreview url={firstUrl} />
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-primary1/20">
            <div className="flex gap-2 items-end">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? send() : null)}
                placeholder="Ask about experience, projects, stack…"
                className="flex-1 bg-background3 py-3 outline-none px-4 placeholder:text-text2 text-white rounded-lg border-none font-medium"
              />

              <motion.button
                type="button"
                onClick={send}
                disabled={!canSend}
                className="text-center font-medium px-4 py-3 rounded-full border border-primary1 text-text1 bg-custom-gradient shadow-custom-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                whileHover={canSend ? { scale: 1.08 } : undefined}
                whileTap={canSend ? { scale: 0.95 } : undefined}
              >
                <span className="hidden sm:inline">
                  {loading ? "Sending..." : "Send"}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
