uniform float time;
uniform float progress;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vEye;
 
uniform float distortion;
uniform vec3 axis;
// uniform vec3 axis2;
uniform float speed;
float PI=3.141592653589793238;
mat4 rotationMatrix(vec3 axis,float angle){
  axis=normalize(axis);
  float s=sin(angle);
  float c=cos(angle);
  float oc=1.-c;
  
  return mat4(oc*axis.x*axis.x+c,oc*axis.x*axis.y-axis.z*s,oc*axis.z*axis.x+axis.y*s,0.,
    oc*axis.x*axis.y+axis.z*s,oc*axis.y*axis.y+c,oc*axis.y*axis.z-axis.x*s,0.,
    oc*axis.z*axis.x-axis.y*s,oc*axis.y*axis.z+axis.x*s,oc*axis.z*axis.z+c,0.,
  0.,0.,0.,1.);
}

vec3 rotate(vec3 v,vec3 axis,float angle){
  mat4 m=rotationMatrix(axis,angle);
  return(m*vec4(v,1.)).xyz;
}
float qinticInOut(float t){
  return t<.5
  ?+16.*pow(t,5.)
  :-.5*abs(pow(2.*t-2.,5.))+1.;
}
void main(){
  vUv=uv;
  float norm=4.;
  norm=.5;
  vec3 newpos=position;
  // float offset=(dot(axis2,position)+norm/2.)/norm;
  float offset = ( dot(vec3(1.,0.,0.),position) +norm/2.)/norm;
  
  float localprogress = clamp( (progress - 0.01*distortion*offset)/(1. - 0.01*distortion),0.,1.);
  // float localprogress=clamp((fract(time*speed)-.01*distortion*offset)/(1.-.01*distortion),0.,1.);
  
  localprogress=qinticInOut(localprogress)*PI;
  
  newpos=rotate(newpos,axis,localprogress);
  vec3 newnormal=rotate(normal,axis,localprogress);
  
  vNormal=normalMatrix*newnormal;
  vec4 worldPosition=modelMatrix*vec4(newpos,1.);
  vEye=normalize(worldPosition.xyz-cameraPosition);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(newpos,1.);
  vPosition=newpos;
}