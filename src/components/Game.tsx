import { OrbitControls } from "@react-three/drei";
import { Debug, Physics } from "@react-three/rapier";
import { Level } from "./Level";
import { Lights } from "./Lights";

export const Game = () => {
  return (
    <>
      <OrbitControls />
      <Physics>
        <Debug />
        <Lights />
        <Level />
      </Physics>
    </>
  );
};
