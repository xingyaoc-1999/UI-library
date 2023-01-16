import { MeshProps } from "@react-three/fiber/dist/declarations/src/three-types";

export const Placeholder = (props: MeshProps) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshBasicMaterial
        wireframe
        color="red"
      />
    </mesh>
  );
};
