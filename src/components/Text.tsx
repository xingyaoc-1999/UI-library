import { Perf } from "r3f-perf";
import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MeshMatcapMaterial, sRGBEncoding, TorusGeometry } from "three";

export const Text = () => {
  
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  matcapTexture.encoding = sRGBEncoding;
  const donutsGroup = useRef<Group>(null);

  const torusGeometry = useRef(new TorusGeometry(1, 0.6, 16, 32));
  const material = useRef(new MeshMatcapMaterial({ matcap: matcapTexture }));
  useFrame((_, delta) => {
    donutsGroup.current?.children?.forEach((donut) => {
      donut.rotation.y += delta * 0.1;
    });
  });
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <Center>
        <Text3D
          material={material.current}
          font="../../fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          I Love R3F
        </Text3D>
      </Center>
      <group ref={donutsGroup}>
        {[...Array(100)].map(() => {
          return (
            <mesh
              material={material.current}
              geometry={torusGeometry.current}
              key={crypto.randomUUID()}
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
              ]}
              scale={0.2 + Math.random() * 0.2}
              rotation={[Math.PI * Math.random(), Math.PI * Math.random(), 0]}
            />
          );
        })}
      </group>
    </>
  );
};
