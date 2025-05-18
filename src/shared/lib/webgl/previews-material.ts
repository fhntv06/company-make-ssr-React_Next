/* eslint-disable */
import { ShaderMaterial } from 'three';
import defaultVertex from './shaders/default-vertex.glsl';
import previewsMaterialFragment from './shaders/previews-material-fragment.glsl';

/*
* Материал расширяющий базовый ShaderMaterial
* сделан по большому счету для реализации темной.светлой темы. Перенесен с первой итерации нового сайта Мэйка
*/

export default class PreviewsMaterial extends ShaderMaterial {
  constructor({
    lightMapDark = null,
    lightMapLight = null,
    lightMapMixFactor = 0.0,
    matcapLight = null,
    matcapDark = null,
    // matcapMask = null,
    alphaMap = null,
  }) {
    const defines = {
      USE_MATCAP: !!matcapLight && !!matcapDark,
      USE_ALPHA: !!alphaMap,
    };

    const uniforms: any = {
      lightMapDark: { value: lightMapDark },
      lightMapLight: { value: lightMapLight },
      lightMapMixFactor: { value: lightMapMixFactor },
    };

    if (defines.USE_MATCAP) {
      Object.assign(uniforms, {
        matcapLight: { value: matcapLight },
        matcapDark: { value: matcapDark },
      });
    }

    if (defines.USE_ALPHA) {
      uniforms.alphaMap = { value: alphaMap };
    }

    super({
      vertexShader: defaultVertex,
      fragmentShader: previewsMaterialFragment,
      uniforms,
      defines,
    });
  }

  setLightMapMixFactor(lightMapMixFactor: any) {
    this.uniforms.lightMapMixFactor.value = lightMapMixFactor;
  }

  getLightMapMixFactor() {
    return this.uniforms.lightMapMixFactor.value;
  }
}
