"use client";
import { useFrame, extend, useThree, Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import CustomCursor from '@/components/shared/cursor';
import * as THREE from 'three';

// Create a WebGLRenderTarget for offscreen rendering
const useFBO = () => {
  const { size } = useThree();
  return useMemo(() => new THREE.WebGLRenderTarget(size.width, size.height), [size]);
};

const OffscreenCube = ({ fbo }) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));
  
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color="blue" />
    </mesh>
  );
};

const MainCube = ({ tex }) => (
  <mesh>
    <boxBufferGeometry attach="geometry" />
    <meshBasicMaterial attach="material" map={tex} />
  </mesh>
);

const Scene = () => {
  const fbo = useFBO();
  const { gl, scene, camera, size } = useThree();
  
  // Offscreen rendering
  
  return (
    <>
      <OffscreenCube fbo={fbo} />
      <MainCube tex={fbo.texture} />
    </>
  );
};

// In your main component
export default function Page() {
  return (
   <>
    <Canvas>
      <Scene />
    </Canvas>
    <CustomCursor />
    </>
  );
}
