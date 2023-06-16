#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec4 colorA = vec4(255.,255.,255.,.5);
vec4 colorB = vec4(0.,0.,0.,.5);

void main() {
    vec2 xy = gl_FragCoord.xy / u_resolution.xy;
    // Mix uses pct (a value from 0-1) to
    // mix the two colors
    vec4 color = mix(colorA, colorB, xy.x/0.535666);

    gl_FragColor = vec4(color);
}
