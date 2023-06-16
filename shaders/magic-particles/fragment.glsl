precision highp float;
uniform float uTime;
varying vec4 vRandom;
void main(){
    vec2 uv=gl_PointCoord.xy;
    
    float circle=smoothstep(.5,.4,length(uv-.5))*.8;
    
    gl_FragColor.rgb=.8+.2*sin(uv.yxx+uTime+vRandom.y*6.28)+vec3(.1,0.,.3);
    gl_FragColor.a=circle;
}