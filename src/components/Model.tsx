import { useGLTF } from "@react-three/drei";

export const Model = () => {
  const model = useGLTF("../../models/FlightHelmet/glTF/FlightHelmet.gltf");

  return (
    <primitive
      object={model.scene}
      scale={5}
      position-y={-1}
    />
  );
};
