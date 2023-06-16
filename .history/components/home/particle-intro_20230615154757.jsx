"use client";
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';

export const ParticleIntro = (props) => {
    
    return (
        <Canvas 
            camera={[0, 0, 5]}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <mesh>
                    <sphereBufferGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="hotpink" />
                </mesh>
        </Canvas>
    )
}