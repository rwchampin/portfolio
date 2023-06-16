
uniform sampler2D map;

uniform float width;
uniform float height;

uniform float pointSize;

varying vec2 vUv;
varying vec4 vPosition;

// Pseudo random number generator
float rand(vec2 co)
{
    return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);
}

void main()
{
    
    vUv=position.xy+vec2(.5/width,.5/height);
    
    vec3 position=(texture2D(map,vUv).rgb);
    
    gl_PointSize=2.;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
    
}
