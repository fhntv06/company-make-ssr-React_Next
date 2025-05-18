#include <common>
#include <uv_pars_vertex>

varying vec2 vUv;

#ifdef USE_MATCAP
varying vec3 vViewPosition;
varying vec3 vNormal;
#endif

void main() {
  #include <uv_vertex>
  vUv = uv;
  #include <begin_vertex>
  #include <project_vertex>
#ifdef USE_MATCAP
  vec3 transformedNormal = normalMatrix * vec3(normal);
  vNormal = normalize(transformedNormal);
  vViewPosition = - mvPosition.xyz;
#endif
}
