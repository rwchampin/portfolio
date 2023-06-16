uniform float time;
uniform vec2 vUv;
uniform vec2 resolution;
uniform float vAalpha;
uniform vec2 pixels;
attribute vec3 translate;

float PI=3.1415926535897932384626433832795;

vec3 rotate(vec3 v,vec3 axis,float angle){
    mat4 m=rotationMatrix(axis,angle);
    return(m*vec4(v,1.)).xyz;
}
void main(){
    float depth=5.;
    vUv=uv;
    
    vec3 newpos=position+translate;
    newpos.z+=-mod(newpos.z-time*.05,5.);
    vAlpha=smoothstep(-5.,-4.,newpos.z);
    gl_Position=projectionMatrix*modelViewMatrix*vec4(newpos,1.);
}

