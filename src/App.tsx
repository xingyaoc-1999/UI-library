import { Canvas } from "@react-three/fiber";
import { Game } from "./components/Game";

function App() {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Game />
    </Canvas>
  );
}

export default App;
