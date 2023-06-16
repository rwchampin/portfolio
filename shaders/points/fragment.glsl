 varying vec2 vUv;
 uniform float uSize;
uniform sampler2D pointTexture;

 void main(){

      //disc
      // float strength = distance( gl_PointCoord, vec2( 0.5, 0.5 ) );
      // strength = step( 0.5, strength );
      // strength = 1.0 - strength;

      // diffuse point
      // float strength = distance( gl_PointCoord, vec2( 0.5 ) );
      // strength *= 2.0;
      // strength = 1.0 - strength;


      // light point
      // float strength = distance( gl_PointCoord, vec2( 0.5 ) );
      // strength = 1.0 - strength;
      // strength = pow( strength, 10.0 );




      // gl_FragColor = vec4(vec3(strength), 1.0);

                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
                gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
    }


 