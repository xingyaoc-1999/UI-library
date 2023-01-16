import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Debug,
  RigidBody,
  Physics,
  CuboidCollider,
  RigidBodyApi,
  InstancedRigidBodies,
  Vector3Array,
} from "@react-three/rapier";
import { useMemo, useRef, useState } from "react";
import { Euler, Quaternion } from "three";

export const Effect = () => {
  const cube = useRef<RigidBodyApi>(null!);
  const twister = useRef<RigidBodyApi>(null!);
  const [hitSound] = useState(() => new Audio());
  const cubeCounts = 3000

  const cubesTransforms = useMemo(() => {
    const positions: Vector3Array[] = [],
      rotations: Vector3Array[] = [],
      scales: Vector3Array[] = [];
    for (let i = 0; i < cubeCounts; i++) {
      positions.push([
        (Math.random() - 0.5) * 8,
        6 + i * 0.2,
        (Math.random() - 0.5) * 8,
      ]);
      rotations.push([Math.random(), Math.random(), Math.random()]);
      const scale = 0.2 + Math.random() * 0.8;
      scales.push([scale, scale, scale]);
    }
    return { positions, rotations, scales };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const eulerRotation = new Euler(0, time, 0);
    const quaternionRotation = new Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);
    const angle = time / 2;
    const x = Math.sin(angle) * 2;
    const z = Math.cos(angle) * 2;
    twister.current.setNextKinematicTranslation({ x, y: -0.8, z });
  });
  const cubeJump = () => {
    cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };
  return (
    <>
      <OrbitControls />
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />
      <Physics gravity={[0, -9.08, 0]}>
        <Debug />
        <RigidBody colliders="ball">
          <mesh
            castShadow
            position={[-1.5, 2, 0]}
          >
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        {/* <RigidBody
          colliders={false}
          position={[0, 1, 0]}
          rotation={[Math.PI * 0.5, 0, 0]}
        >
          <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <mesh castShadow>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}
        <RigidBody
          ref={cube}
          position={[1.5, 2, 0]}
          gravityScale={1}
          restitution={0}
          friction={0.7}
          colliders={false}
          onCollisionEnter={() => {
            hitSound.currentTime = 0;
            hitSound.volume = Math.random();
            hitSound.play();
          }}
          onCollisionExit={() => {
            console.log("Exit");
          }}
          onWake={() => {
            console.log("awake");
          }}
          onSleep={() => {
            console.log("sleep");
          }}
        >
          <mesh
            castShadow
            onClick={cubeJump}
          >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider
            mass={0.6}
            args={[0.5, 0.5, 0.5]}
          />
        </RigidBody>
        <RigidBody
          type="fixed"
          friction={0.7}
        >
          <mesh
            receiveShadow
            position-y={[-1.25]}
          >
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        <RigidBody
          type="kinematicPosition"
          ref={twister}
        >
          <mesh
            castShadow
            scale={[0.4, 0.4, 3]}
          >
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed">
          <CuboidCollider
            args={[5, 2, 0.5]}
            position={[0, 1, 5.5]}
          />
          <CuboidCollider
            args={[5, 2, 0.5]}
            position={[0, 1, -5.5]}
          />
          <CuboidCollider
            args={[0.5, 2, 5]}
            position={[5.5, 1, 0]}
          />
          <CuboidCollider
            args={[0.5, 2, 5]}
            position={[-5.5, 1, 0]}
          />
        </RigidBody>
        <InstancedRigidBodies
          positions={cubesTransforms.positions}
          rotations={cubesTransforms.rotations}
          scales={cubesTransforms.scales}
        >
          <instancedMesh
            castShadow
            args={[null!, null!, cubeCounts]}
          >
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
};
