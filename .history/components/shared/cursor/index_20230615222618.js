import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
export const Cursor = () => {

    return (
        <>
            <mesh>
                <planeGeometry args={[0.15, 0.15]} />
                <meshBasicMaterial color="black" />
            </mesh>
        </>
    )
}