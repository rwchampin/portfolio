"use client";
import * as THREE from "three";
import { Canvas, extend, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Effects, useTexture } from '@react-three/drei'

export const ParticleIntro = (props) => {
  return (
    <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight />
      <spotLight
        intensity={0.5}
        angle={0.2}
        penumbra={1}
        position={[5, 15, 10]}
      />

      <OrbitControls />
    </Canvas>
  );
};
