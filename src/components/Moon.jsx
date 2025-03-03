import React, { Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import { TextureLoader } from "three";
import CanvasLoader from "./Loader";


const MoonModel = React.memo(({ ...props }) => {
  const { scene } = useGLTF("/models/moon.glb");
  const moonTexture = useMemo(() => useLoader(TextureLoader, "/models/textures/moon_texture.jpeg"), []); 
  const modelRef = useRef();

  useEffect(() => {
    if (scene && moonTexture) {
      scene.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = false; 
          node.receiveShadow = false;
          node.material.map = moonTexture;
        }
      });
    }
  }, [scene, moonTexture]);

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.6; 
    }
  });

  return <primitive object={scene} ref={modelRef} scale={[0.01, 0.01, 0.01]} {...props} />;
});


const Moon = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Canvas
        dpr={[1, 1]} 
        shadows={false} 
        camera={{ near: 0.1, far: 200, fov: 45, position: [-4, 3, 6] }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <PresentationControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          >
            <ambientLight intensity={0.5} />
            <directionalLight intensity={1} position={[5, 5, 5]} />
            <Stage shadows={false}>
              <MoonModel />
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Moon;