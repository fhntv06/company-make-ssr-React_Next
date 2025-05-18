uniform sampler2D lightMapDark;
uniform sampler2D lightMapLight;
uniform float lightMapMixFactor;

varying vec2 vUv;

#ifdef USE_MATCAP
uniform sampler2D matcapLight;
uniform sampler2D matcapDark;
uniform sampler2D matcapMask;

varying vec3 vViewPosition;
varying vec3 vNormal;
#endif

#ifdef USE_ALPHA
uniform sampler2D alphaMap;
#endif

void main() {
    vec4 c1 = texture2D(lightMapLight, vUv);
    vec4 c2 = texture2D(lightMapDark, vUv);
    vec4 color = mix(c1, c2, lightMapMixFactor);

    #ifdef USE_MATCAP
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x));
        vec3 y = cross(viewDir, x);
        vec2 uv = vec2(dot(x, normal), dot(y, normal)) * 0.495 + 0.5;
        vec4 m1 = texture2D(matcapLight, uv);
        vec4 m2 = texture2D(matcapDark, uv);
        vec4 matcapColor = mix(m1, m2, lightMapMixFactor);
        #ifdef USE_MATCAPMASK
            float matcapMixFactor = texture2D(matcapMask, vUv).r;
            color = mix(color, matcapColor, matcapMixFactor);
        #else
            color = matcapColor;
        #endif
    #endif

    #ifdef USE_ALPHA
        float alpha = texture2D(alphaMap, vUv).r;
        color.a = alpha;
    #endif

    gl_FragColor = LinearTosRGB(color);
}
