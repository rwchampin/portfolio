"use client"
import * as THREE from 'three';
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import fragment from "@/shaders/tubes/fragment.glsl";
import vertex from "@/shaders/tubes/vertex.glsl";

const Tube = (props) => {
    const mesh = useRef();
    const shaderMaterial = new THREE.ShaderMaterial({
        extensions: {
            derivatives: "#extension GL_OES_standard_derivatives : enable",
        },
        uniforms: {
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
    });
    return (
        <mesh ref={mesh} {...props}>
            <tubeGeometry args={[props.path, 600, 0.005, 8, false]} />
            <shaderMaterial ref={shaderMaterial} />
        </mesh>
    );
};
const getCurves = (start) => {
    let scale = 3;
    let points = [];
    points.push(start);

    let currentPoint = start.clone();

    for (let i = 0; i < 100; i++) {
        let v = computeCurl(currentPoint.x / scale, currentPoint.y / scale, currentPoint.z / scale);
        currentPoint.addScaledVector(v, 0.001);
        points.push(currentPoint.clone());
    }

    return points;
};
const computeCurl = (x, y, z) => {
    const eps = 0.0001;
    let curl = new THREE.Vector3();
    let dx = new THREE.Vector3();
    let dy = new THREE.Vector3();
    let dz = new THREE.Vector3();

    dx.set(x + eps, y, z);
    dy.set(x, y + eps, z);
    dz.set(x, y, z + eps);

    dx.normalize();
    dy.normalize();
    dz.normalize();

    let f1 = new THREE.Vector3();
    let f2 = new THREE.Vector3();

    f1.crossVectors(dy, dz);
    f2.crossVectors(dz, dx);

    curl.addVectors(f1, f2);
    curl.multiplyScalar(0.5 / eps);

    return curl;
};


 
export const CurlTubes = () => {
    const { gl, scene, camera } = useThree();
    
    useEffect(() => {
        
        gl.setClearColor("#000000");
        gl.setClearAlpha(1);
        scene.background = "#000000";
        scene.fog = new THREE.Fog("0x88080b", .10, 1000);
    
      }, [gl, scene])
    useEffect(() => {





    }, []);
    const getPath = (i) =>
        new THREE.CatmullRomCurve3(
            getCurves(
                new THREE.Vector3(
                    Math.random() - .5,
                    Math.random() - .5,
                    Math.random() - .5
                )
            )
        );


    return Array.from({ length: 1000 }, (_, i) => (
        <Tube key={i} path={getPath(i)} />
    ));
};
