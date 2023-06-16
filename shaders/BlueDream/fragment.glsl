// uniform vec3      resolution;           // viewport resolution (in pixels)
// uniform float     time;                 // shader playback time (in seconds)
// uniform float     timeDelta;            // render time (in seconds)
// uniform int       frame;                // shader playback frame
// uniform float     iChannelTime[4];       // channel playback time (in seconds)
// uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
// uniform vec4      mouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
// uniform sampler2D sampler         // input channel. XX = 2D/Cube
// uniform vec4      date;                 // (year, month, day, time in seconds)
// uniform float     sampleRate;           // sound sample rate (i.e., 44100)


const int NUM_SAMPLES = 35;

void main(){
    
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 buffer = texture(iChannel0,uv);
    float decay=0.96815;
    float exposure=0.21;
    float density=0.926;
    float weight=0.58767;
    
    vec2 tc = uv;
    vec2 lightPos = mouse.xy;
    vec2 deltaTexCoord = tc;
    
    deltaTexCoord =  uv+vec2(sin(time*.7)*.3,-cos(time*.2)*.3)-.5;
    deltaTexCoord *= 1.0 / float(NUM_SAMPLES)  * density;
    
    float illuminationDecay = 1.0;
    vec4 color =texture(iChannel0, tc.xy)*0.305104;
    
    tc += deltaTexCoord * fract( sin(dot(uv.xy+fract(time), 
                                         vec2(12.9898, 78.233)))* 43758.5453 );
    
    for(int i=0; i < NUM_SAMPLES; i++)
    {
        tc -= deltaTexCoord;
        vec4 sampleTex = texture(iChannel0, tc)*0.305104;
        sampleTex *= illuminationDecay * weight;
        color += sampleTex;
        illuminationDecay *= decay;
    }
   gl_FragColor = color*exposure;
}
