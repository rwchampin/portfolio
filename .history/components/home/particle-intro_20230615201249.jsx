"use client";
import * as THREE from "three";
import { Canvas, extend, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Effects, useTexture } from '@react-three/drei'

export const ParticleIntro = (props) => {
  return (
    <Canvas className="main-canvas-ui" frameloop="demand" camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight />
      <pointLight color={0xff0000} position={[10, 10, 10]} />
      <spotLight
        intensity={0.5}
        angle={0.2}
        penumbra={1}
        position={[5, 15, 10]}
      />
        <mesh>
            <icosahedronGeometry args={[1, 5]} />
            <meshStandardMaterial color="hotpink" />
        </mesh>
      <OrbitControls />
    </Canvas>
  );
};
