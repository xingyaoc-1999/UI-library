import {
  Center,
  OrbitControls,
  shaderMaterial,
  Sparkles,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { extend, Object3DNode, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, MeshBasicMaterial } from "three";

// import portalVertexShader from "";
// import portalFragmentShader from "";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new Color("#ffffff"),
    uColorEnd: new Color("#000000"),
  },
  "",
  ""
);

extend({ PortalMaterial });
declare module "@react-three/fiber" {
  interface ThreeElements {
    portalMaterial: Object3DNode<typeof PortalMaterial, typeof PortalMaterial>;
  }
}

export const Portal = () => {
  const { nodes }: { [index: string]: any } = useGLTF(
    "../../models/Portal/portal.glb"
  );
  const material = useRef(new MeshBasicMaterial({ color: "#ffffe5" }));

  const bakedTexture = useTexture("../../models/Portal/baked.jpg");
  bakedTexture.flipY = false;
  const portalMaterial = useRef<typeof PortalMaterial>(null!);
  useFrame((_, delta) => {
    (portalMaterial.current as any).uTime += delta;
  });
  return (
    <>
      <color
        args={["#201919"]}
        attach="background"
      />
      <OrbitControls />
      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh></mesh>
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
          material={material.current}
        ></mesh>
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
          material={material.current}
        ></mesh>
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial ref={portalMaterial} />
        </mesh>
        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          speed={0.2}
          position-y={1}
          count={40}
        />
      </Center>
    </>
  );
};
