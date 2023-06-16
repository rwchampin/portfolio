#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 resolution;
uniform float time;

varying vec2 vUv;

void main()
{
    vUv=uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}