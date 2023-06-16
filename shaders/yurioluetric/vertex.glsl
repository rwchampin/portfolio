uniform float time;


varying vec2 vUv;






void main() {

    vec2 uv = vUv;
    vColor = color;

vec3 newPos = position;
vec4 originPos = modelMatrix * vec4(0.,0.,0., 1.0);
vec4 axis = modelMatrix * vec4(0.,1.,0., 0.0);
    vec2 p = -1.0 + 2.0 * uv;

    p.x *= resolution.x / resolution.y;

    vec2 i = p;

    float c = 1.0;

    float inten = .0045;

    for (int n = 0; n < 10; n++) {

        float t = time * (1.0 - (3.0 / float(n+1)));

        i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));

        c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten), p.y / (cos(i.y+t)/inten)));

    }

    c /= float(10);

    c = 1.17-pow(c, 1.4);

    vec3 colour = vec3(pow(abs(c), 20.0));

    colour = clamp(colour + vec3(0.0, 0.0, 0.0), 0.0, 1.0);

    gl_FragColor = vec4(colour, 1.0);

}