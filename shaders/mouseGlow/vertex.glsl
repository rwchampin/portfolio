uniform float uTime;
uniform float uProgress;
uniform sampler2D uTexture1;
uniform vec4 uResolution;
varying vec2 vUv;
uniform vec3 uLight;
varying vec3 vPosition;
varying vec3 vNormal;
 
varying vec3 v_worldPosition;
float PI = 3.141592653589793238;

void main() {
    vUv=uv; 
    vPosition = position;
    gl_Position =  projectionMatrix*modelViewMatrix*vec4(position,1.);
}   
