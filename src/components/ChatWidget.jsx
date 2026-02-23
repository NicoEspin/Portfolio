import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

/* ─────────────────────────────────────────────
   Helpers: URLs + rendering + preview
───────────────────────────────────────────── */

const TECH_TLDS = new Set([
  "js",
  "ts",
  "jsx",
  "tsx",
  "json",
  "md",
  "css",
  "html",
  "htm",
]);

function isProbablyUrlToken(rawHit, prevChar = "") {
  const s = String(rawHit || "").trim();
  if (prevChar === "@") return false;
  if (/^https?:\/\//i.test(s) || /^www\./i.test(s)) return true;
  if (!/^[a-z0-9.-]+\.[a-z]{2,}([/?#]|$)/i.test(s)) return false;
  const host = s.split(/[/?#]/)[0];
  const tld = (host.split(".").pop() || "").toLowerCase();
  const hasPath = /[/?#]/.test(s);
  if (TECH_TLDS.has(tld) && !hasPath) return false;
  return true;
}

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
  s = s
    .replace(/^[<("'\[]+/, "")
    .replace(/[>")'\]]+$/, "")
    .replace(/[)\].,!?;:>]+$/g, "");
  if (/^www\./i.test(s)) return `https://${s}`;
  if (!/^https?:\/\//i.test(s) && /^[a-z0-9.-]+\.[a-z]{2,}(\/|$)/i.test(s))
    return `https://${s}`;
  return s;
}

function stripTrailingPunctuation(url) {
  return normalizeUrl(url);
}

function getHost(url) {
  try {
    return new URL(url).host.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
}

function pickPreviewUrls(urls, limit = 2) {
  const picked = [];
  const seenHosts = new Set();
  for (const u of urls) {
    const href = normalizeUrl(u);
    const host = getHost(href) || href;
    if (seenHosts.has(host)) continue;
    seenHosts.add(host);
    picked.push(href);
    if (picked.length >= limit) break;
  }
  return picked;
}

function extractUrls(content) {
  const text = String(content || "");
  const urls = new Set();
  const mdRe = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let m;
  while ((m = mdRe.exec(text)) !== null) urls.add(normalizeUrl(m[2]));
  const rawRe =
    /(?:https?:\/\/|www\.)[^\s)<>"'\]]+|(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s)<>"'\]]*)?/gi;
  while ((m = rawRe.exec(text)) !== null) {
    const hit = (m[0] || "").trim();
    if (!hit || hit.length < 4) continue;
    const prevChar = m.index > 0 ? text[m.index - 1] : "";
    if (!isProbablyUrlToken(hit, prevChar)) continue;
    urls.add(normalizeUrl(hit));
  }
  return Array.from(urls);
}

/* ─────────────────────────────────────────────
   MessageContent
───────────────────────────────────────────── */
function MessageContent({ content }) {
  const text = String(content || "");
  const mdLinkRe = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const boldRe = /\*\*([^*]+?)\*\*/g;
  const rawUrlRe =
    /(?:https?:\/\/|www\.)[^\s)<>"'\]]+|(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s)<>"'\]]*)?/gi;

  const renderInline = (lineText, keyBase) => {
    const nodes = [];
    let i = 0;
    while (i < lineText.length) {
      mdLinkRe.lastIndex = i;
      rawUrlRe.lastIndex = i;
      boldRe.lastIndex = i;
      const mdMatch = mdLinkRe.exec(lineText);
      const rawMatch = rawUrlRe.exec(lineText);
      const boldMatch = boldRe.exec(lineText);
      const next = (() => {
        const candidates = [
          mdMatch ? { type: "md", match: mdMatch } : null,
          rawMatch ? { type: "raw", match: rawMatch } : null,
          boldMatch ? { type: "bold", match: boldMatch } : null,
        ].filter(Boolean);
        if (!candidates.length) return null;
        candidates.sort((a, b) => a.match.index - b.match.index);
        return candidates[0];
      })();
      if (!next) {
        nodes.push(lineText.slice(i));
        break;
      }
      const start = next.match.index;
      if (start > i) nodes.push(lineText.slice(i, start));
      if (next.type === "bold") {
        nodes.push(
          <strong
            key={`${keyBase}-b-${start}`}
            className="font-semibold text-text1/90"
          >
            {next.match[1] || ""}
          </strong>,
        );
        i = start + next.match[0].length;
        continue;
      }
      if (next.type === "md") {
        const label = next.match[1];
        const href = normalizeUrl(next.match[2]);
        const display =
          label && label.trim() ? label : safeDecodeUrlForDisplay(href);
        nodes.push(
          <a
            key={`${keyBase}-md-${start}-${href}`}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2 text-primary1 hover:opacity-75 break-all transition-opacity duration-150"
          >
            {display}
          </a>,
        );
        i = start + next.match[0].length;
        continue;
      }
      const rawHit = next.match[0] || "";
      const prevChar = start > 0 ? lineText[start - 1] : "";
      if (!isProbablyUrlToken(rawHit, prevChar)) {
        nodes.push(rawHit);
        i = start + rawHit.length;
        continue;
      }
      const href = stripTrailingPunctuation(rawHit);
      nodes.push(
        <a
          key={`${keyBase}-raw-${start}-${href}`}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-2 text-primary1 hover:opacity-75 break-all transition-opacity duration-150"
        >
          {safeDecodeUrlForDisplay(href)}
        </a>,
      );
      i = start + rawHit.length;
    }
    return nodes;
  };

  const lines = text.split(/\r?\n/);
  const blocks = [];
  let idx = 0,
    blockId = 0;
  while (idx < lines.length) {
    if (!lines[idx].trim()) {
      blocks.push(<div key={`sp-${blockId++}`} className="h-1.5" />);
      idx++;
      continue;
    }
    if (/^\s*-\s+/.test(lines[idx])) {
      const items = [];
      while (idx < lines.length && /^\s*-\s+/.test(lines[idx])) {
        items.push(lines[idx].replace(/^\s*-\s+/, ""));
        idx++;
      }
      blocks.push(
        <ul key={`ul-${blockId++}`} className="list-none space-y-1.5 pl-1">
          {items.map((it, i2) => (
            <li key={`li-${blockId}-${i2}`} className="flex items-start gap-2">
              <span className="mt-[6px] w-1 h-1 rounded-full bg-primary1/50 flex-shrink-0" />
              <span>{renderInline(it, `li-${blockId}-${i2}`)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }
    const paraLines = [];
    while (
      idx < lines.length &&
      lines[idx].trim() &&
      !/^\s*-\s+/.test(lines[idx])
    ) {
      paraLines.push(lines[idx]);
      idx++;
    }
    const paraNodes = [];
    paraLines.forEach((ln, i2) => {
      paraNodes.push(...renderInline(ln, `p-${blockId}-${i2}`));
      if (i2 < paraLines.length - 1)
        paraNodes.push(<br key={`br-${blockId}-${i2}`} />);
    });
    blocks.push(
      <p key={`p-${blockId++}`} className="whitespace-pre-wrap">
        {paraNodes}
      </p>,
    );
  }
  return <div className="space-y-2">{blocks}</div>;
}

/* ─────────────────────────────────────────────
   LinkPreview
───────────────────────────────────────────── */
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

  if (error)
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-2 block rounded-xl border border-primary1/20 bg-white/[0.03] p-3 hover:border-primary1/40 hover:bg-white/[0.05] transition-all duration-200"
      >
        <div className="text-[10px] text-text2/60 truncate font-mono">
          {pretty}
        </div>
        <div className="text-xs text-text1/70 mt-1">Open link →</div>
      </a>
    );

  if (!data)
    return (
      <div className="mt-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
        <div className="text-[10px] text-text2/60 truncate font-mono">
          {pretty}
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="w-1 h-1 rounded-full bg-primary1/50 animate-pulse" />
          <span className="w-1 h-1 rounded-full bg-primary1/50 animate-pulse [animation-delay:150ms]" />
          <span className="w-1 h-1 rounded-full bg-primary1/50 animate-pulse [animation-delay:300ms]" />
        </div>
      </div>
    );

  const title = data.title || pretty;
  const desc = data.description || "";
  const site = data.siteName || "";
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="mt-2 block rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-primary1/30 hover:bg-white/[0.04] transition-all duration-200 overflow-hidden"
    >
      {data.image && (
        <div className="w-full h-28 bg-black/20">
          <img
            src={data.image}
            alt={title}
            className="w-full h-28 object-cover opacity-90"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
      <div className="p-3">
        {site && (
          <div className="text-[10px] text-text2/50 mb-1 uppercase tracking-wider">
            {site}
          </div>
        )}
        <div className="text-xs font-semibold text-text1/90 line-clamp-2">
          {title}
        </div>
        {desc && (
          <div className="text-[10px] text-text2/60 mt-1 line-clamp-2 leading-relaxed">
            {desc}
          </div>
        )}
        <div className="text-[10px] text-primary1/60 mt-2 truncate font-mono">
          {pretty}
        </div>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────
   Typing indicator
───────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-0.5 px-1">
      {[0, 150, 300].map((delay) => (
        <motion.span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-primary1/50"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 0.9,
            delay: delay / 1000,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ChatWidget
───────────────────────────────────────────── */
export function ChatWidget() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState(() => [
    { role: "assistant", meta: "welcome", content: t("chat.welcome") },
  ]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length !== 1 || prev[0]?.meta !== "welcome") return prev;
      return [{ ...prev[0], content: t("chat.welcome") }];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage, i18n.language]);

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
    const assistantIndex = base.length;
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
        cache: "no-store",
        body: JSON.stringify({
          messages: base.map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      if (!resp.body) throw new Error("No response body");

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
            content: text || "An error occurred.",
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
              setAssistantToError(
                JSON.parse(dataStr || "{}").message || t("chat.errors.stream"),
              );
            } catch {
              setAssistantToError(t("chat.errors.stream"));
            }
            continue;
          }
          if (eventType === "delta") {
            try {
              appendToAssistant(JSON.parse(dataStr || "{}").delta || "");
            } catch {
              appendToAssistant(dataStr);
            }
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[assistantIndex] = {
          role: "assistant",
          content: t("chat.errors.connect"),
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
        /* ── FAB ── */
        <motion.button
          key="chat-fab"
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("chat.aria.open")}
          className="fixed bottom-6 right-6 z-50 flex justify-center items-center size-14 border rounded-full border-primary1 text-text1 bg-custom-gradient shadow-custom-shadow"
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 8 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <Bot className="w-6 h-6" />
          {/* Unread pulse ring */}
          <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-black/60" />
        </motion.button>
      ) : (
        /* ── Panel ── */
        <motion.div
          key="chat-panel"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="
            fixed z-[160]
            bottom-0 left-0 right-0
            w-full h-[85dvh]
            
            sm:w-[min(440px,calc(100vw-2rem))]
            sm:h-[min(620px,calc(100dvh-2rem))]
            sm:rounded-2xl
            flex flex-col overflow-hidden
            bg-background1/95 backdrop-blur-xl
            border border-primary1/20
            shadow-[0_8px_60px_rgba(139,92,246,0.15),0_2px_8px_rgba(0,0,0,0.4)]
          "
        >
          {/* Top accent bar — matches ExperienceCard style */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-primary1/60 via-primary1/30 to-transparent pointer-events-none z-10" />

          {/* ── Header ── */}
          <div className="relative flex items-center justify-between px-4 py-3.5 border-b border-white/[0.07] flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Avatar — matches StatBadge glass style */}
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full border border-primary1/40 bg-primary1/10">
                <Bot className="w-4.5 h-4.5 text-primary1" />
                {/* Online dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-black/70" />
              </div>
              <div className="leading-none">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-text1 tracking-wide">
                    Coquito
                  </span>
                  <Sparkles size={10} className="text-primary1/70" />
                </div>
                <span className="text-[10px] text-text1/35 tracking-wide mt-0.5 block">
                  {t("chat.subtitle")}
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={t("chat.aria.close")}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] hover:border-primary1/30 hover:bg-primary1/10 text-text1/40 hover:text-text1/80 transition-all duration-200"
            >
              <X size={14} />
            </button>
          </div>

          {/* ── Messages ── */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-3 scroll-smooth
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-primary1/20
              [&::-webkit-scrollbar-thumb:hover]:bg-primary1/40"
          >
            {messages.map((m, idx) => {
              const isUser = m.role === "user";
              const isLastAssistant = !isUser && idx === messages.length - 1;
              const isStreaming = isLastAssistant && loading;
              const showTyping = isLastAssistant && loading && !m.content;

              const urls = !isUser ? extractUrls(m.content || "") : [];
              const previewUrls = !isUser ? pickPreviewUrls(urls, 2) : [];
              const prev = idx > 0 ? messages[idx - 1] : null;
              const prevUrls =
                prev && prev.role !== "user"
                  ? extractUrls(prev.content || "")
                  : [];
              const prevPreviewUrls = prev ? pickPreviewUrls(prevUrls, 2) : [];
              const uniquePreviewUrls = previewUrls.filter(
                (u) => !prevPreviewUrls.includes(u),
              );

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={[
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      isUser
                        ? /* User bubble: glass with primary border */
                          "bg-primary1/15 border border-primary1/35 text-text1 rounded-br-sm"
                        : /* Assistant bubble: subtle glass */
                          "bg-white/[0.04] border border-white/[0.08] text-text1/85 rounded-bl-sm",
                    ].join(" ")}
                  >
                    {showTyping ? (
                      <TypingDots />
                    ) : m.content ? (
                      <MessageContent content={m.content} />
                    ) : null}

                    {!isUser &&
                      !isStreaming &&
                      uniquePreviewUrls.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {uniquePreviewUrls.map((u) => (
                            <LinkPreview key={u} url={u} />
                          ))}
                        </div>
                      )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Input ── */}
          <div className="flex-shrink-0 px-3 py-3 border-t border-white/[0.07]">
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 focus-within:border-primary1/40 transition-colors duration-200">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                placeholder={t("chat.placeholder")}
                disabled={loading}
                className="flex-1 bg-transparent py-1 outline-none placeholder:text-text1/25 text-text1/85 text-sm font-medium disabled:opacity-50"
              />
              <motion.button
                type="button"
                onClick={send}
                disabled={!canSend}
                aria-label={t("chat.send")}
                className="flex items-center justify-center size-8 rounded-lg border border-primary1/50 bg-primary1/15 text-primary1 hover:bg-primary1/25 hover:border-primary1/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
                whileHover={canSend ? { scale: 1.08 } : undefined}
                whileTap={canSend ? { scale: 0.92 } : undefined}
              >
                {loading ? (
                  <motion.div
                    className="w-3.5 h-3.5 rounded-full border-2 border-primary1/40 border-t-primary1"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ) : (
                  <Send size={13} />
                )}
              </motion.button>
            </div>
            <p className="text-[9px] text-text1/20 text-center mt-1.5 tracking-wide">
              Enter ↵ to send
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
