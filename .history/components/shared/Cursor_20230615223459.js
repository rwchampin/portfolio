import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export const Cursor = () => {

    return (

            <mesh>
                <planeGeometry args={[10.15, 10.15]} />
                <meshBasicMaterial color="black" />
            </mesh>

    )
}