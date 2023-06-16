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
  scene.background = new THREE.Color(0xcccccc);
  const v = new Float32Array(1000000);
  for (let i = 0; i < v.length; i += 3) {
    v[i * 3 + 0] = THREE.MathUtils.randFloatSpread(window.innerWidth - 100);
    v[i * 3 + 1] = THREE.MathUtils.randFloatSpread(window.innerWidth - 100);
    v[i * 3 + 2] = THREE.MathUtils.randFloatSpread(window.innerWidth - 100);
  }
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

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={v.length / 3}
            array={v}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.5} color={0x000000} sizeAttenuation={true} />
      </points>
      <OrbitControls />
    </>
  );
};
