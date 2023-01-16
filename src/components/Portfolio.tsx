import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  PresentationControls,
  useGLTF,
  Text,
} from "@react-three/drei";
import { useRef, useState } from "react";

export const Portfolio = () => {


  const ref = useRef(null);

  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
  return (
    <>
      <Environment preset="city" />
      <color
        args={["#695b5b"]}
        attach="background"
      />
      <OrbitControls />
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={0xffffff}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive
            ref={ref}
            object={scene}
            position-y={-1.2}
          >
            <Html
              transform
              distanceFactor={1.17}
              wrapperClass="htmlScreen"
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
              occlude={[ref]}
            >
              <iframe
                title="Detail"
                src="https://pyecharts.org/#/zh-cn/composite_charts"
              />
            </Html>
          </primitive>
          <Text
            fontSize={1}
            position={[2, 0.75, 0.75]}
            rotation-y={-1.25}
            maxWidth={2}
            textAlign="center"
          >
            BRUNO SIMON
          </Text>
        </Float>
      </PresentationControls>
      <ContactShadows
        position-y={-1.4}
        opacity={0.4}
        scale={5}
        blur={2.4}
      />
    </>
  );
};
