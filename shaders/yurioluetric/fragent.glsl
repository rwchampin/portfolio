uniform float time;
uniform float progress;
uniform Sampler2D uMap;
uniform vec4 resolution;

varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.1415926535897932384626433832795;

void main() {
    vec4 c = texture2D(uMap, vUv);
    gl_FragColor = 
}