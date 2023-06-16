"use client";
import * as THREE from "three";
import { Canvas, extend, useLoader, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Effects,
  useTexture,
} from "@react-three/drei";

export const ParticleIntro = (props) => {
  const { scene } = useThree();
  scene.background = new THREE.Color(0x000000);
  return (
    <>
      <ambientLight />
      <pointLight color={0xff0000} position={[10, 10, 10]} />
      <spotLight
        intensity={0.5}
        angle={0.2}
        penumbra={1}
        position={[0, 0, 0]}
      />
      <mesh>
        <icosahedronGeometry args={[1, 5, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <OrbitControls />
    </>
  );
};
