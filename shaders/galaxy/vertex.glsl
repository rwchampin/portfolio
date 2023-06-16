uniform float uTime;
uniform float uSize;
uniform sampler2D uTexture;

 
attribute vec3 aRandomness;
attribute float aScale;

varying vec3 vColor;

void main()
{

    /**
     * Position
     */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
    // Rotate
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (100.0 / 1.) * uTime;
    angle += angleOffset;
    modelPosition.x = cos(angle) * 1.;
    modelPosition.z = sin(angle) * 1.;

    // Randomness
    modelPosition.xyz += aRandomness;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    /**
     * Size
     */
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (300.0 / - viewPosition.z);

    /**
     * Color
     */
    vColor = color;
}