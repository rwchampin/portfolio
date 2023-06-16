varying vec2 vUv;

void main(void) {
    vUv = uv;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 50. * ( 1. / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

}

