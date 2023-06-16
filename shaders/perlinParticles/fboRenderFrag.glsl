
uniform sampler2D map;
uniform float effector;

varying vec2 vUv;
varying vec4 vPosition;

void main()
{
    gl_FragColor=vec4(.2,.1,.8,1.);
    gl_FragColor*=1.5;
    
}

