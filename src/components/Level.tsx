import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { Vector3 } from "three";

THREE.ColorManagement.legacyMode = false;
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "yellowgreen" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });
const BlockStart = ({ position = new THREE.Vector3(0, 0, 0) }) => {
  return (
    <group position={position}>
      <mesh
        receiveShadow
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      ></mesh>
    </group>
  );
};

const BlockSpinner = ({ position = new THREE.Vector3(0, 0, 0) }) => {
  return (
    <group position={position}>
      <mesh
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={floor2Material}
        receiveShadow
      />
      <RigidBody
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        friction={0}
        restitution={0.2}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};
export const Level = () => {
  return (
    <>
      <BlockStart position={new THREE.Vector3(0, 0, 4)} />
      <BlockSpinner position={new THREE.Vector3(0, 0, 0)} />
    </>
  );
};
