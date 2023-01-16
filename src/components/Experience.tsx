import { Perf } from "r3f-perf";
import { meshBounds, OrbitControls, useCursor } from "@react-three/drei";
import { Model } from "./Model";
import { ElementRef, Suspense, useRef, useState } from "react";
import { Placeholder } from "./Placeholder";
import { Fox } from "./Fox";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";
import {
  SSR,
  Vignette,
  EffectComposer,
  Glitch,
  Noise,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { Drunk } from "./Drunk";
import { useControls } from "leva";

export const Experience = () => {
  const cube = useRef<Mesh>(null!);
  const [hovered, set] = useState(false);
  const drunkRef = useRef<ElementRef<typeof Drunk>>(null);
  const drunkProps = useControls("Drunk Effect", {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });

  useFrame((_, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  useCursor(hovered, "pointer", "default");
  return (
    <>
      <color
        attach="background"
        args={["#000000"]}
      />
      <EffectComposer multisampling={8}>
        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
        /> */}
        {/* <Glitch
          delay={new Vector2(0.3, 1)}
          duration={new Vector2(0.1, 0.3)}
          mode={GlitchMode.CONSTANT_WILD}
        /> */}
        {/* <Bloom
          mipmapBlur
          intensity={0.5}
          luminanceThreshold={0}
        /> */}
        {/* <Noise blendFunction={BlendFunction.SOFT_LIGHT} premultiply/> */}
        {/* <DepthOfField
          focusDistance={0.02}
          focalLength={0.02}
          bokehScale={6}
        /> */}
        {/* <SSR /> */}
        {/* <Drunk
          ref={drunkRef}
          {...drunkProps}
        /> */}
      </EffectComposer>
      
      <OrbitControls makeDefault />
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />

      <mesh
        receiveShadow
        position-y={-1}
        scale={10}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <mesh
        onPointerEnter={() => set(true)}
        onPointerLeave={() => set(false)}
        raycast={meshBounds}
        ref={cube}
        position-x={2}
        scale={1.5}
        onClick={(e) => {
          (cube.current.material as MeshStandardMaterial).color.set(
            `hsl(${Math.random() * 360},100%,75%)`
          );
        }}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="white"
          emissive="orange"
          emissiveIntensity={5}
          toneMapped={false}
        />
      </mesh>
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* <Suspense
        fallback={
          <Placeholder
            position-y={0.5}
            scale={[2, 3, 2]}
          />
        }
      >
        <Model />
      </Suspense>
      <Fox /> */}
    </>
  );
};
