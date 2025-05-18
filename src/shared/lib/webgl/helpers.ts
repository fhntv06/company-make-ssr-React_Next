/* eslint-disable */
import PreviewsMaterial from '@/shared/lib/webgl/previews-material';
import { MaterialData, TextureData } from '@/features/webgl-scene/model/types';
import { Material, MeshBasicMaterial, MeshMatcapMaterial, MeshStandardMaterial } from 'three';


/*
* Создание обьекта опций для PreviewMaterial
*
* Принимает:
* configuration - обьект, содержит в себе настройки материалов. Описаны в webgl-doc.md
* assets - список текстур
*/
export function createMaterialOptions(configuration: Record<string, string>, assets: Record<string, string>) {
  const options: Record<string, string | number> = {
    // lightMapLight: assets[`${configuration.lightmap}.light`],
    // lightMapDark: assets[`${configuration.lightmap}.dark`],
    lightMapLight: assets[`${configuration.lightmap}`],
    lightMapDark: assets[`${configuration.lightmap}`],
    // lightMapMixFactor: this.getTargetLightMapMixFactorByTheme(this.theme),
    // lightMapMixFactor: 0.0,
  };

  if (configuration.matcap) {
    Object.assign(options, {
      // matcapLight: assets[`${configuration.matcap}.light`],
      // matcapDark: assets[`${configuration.matcap}.dark`],
      matcapLight: assets[`${configuration.matcap}`],
      matcapDark: assets[`${configuration.matcap}`],
    });
  }

  if (configuration.alphamap) {
    options.alphaMap = assets[configuration.alphamap];
  }

  return options;
}

/*
* Создани списка материалов для модели
*
* Возвращает обьект, где ключ имя меша, значение путь до текстуры
*/
export const createMaterials = (materials: Record<string, MaterialData>, assets: any): Record<string, Material> => {
  const m: any = {};
  for (const name in materials) {
    if (materials[name].matcap) {
      m[name] = new PreviewsMaterial(createMaterialOptions((materials as any)[name], assets));
    }
    if (materials[name].texture) {
      m[name] = new MeshBasicMaterial({
        map: assets[name]
      });
    }
  }

  return m;
};

/*
* Создани списка текстур для загрузки
*
* Возвращает обьект, где ключ имя текстуры, значение путь до текстуры
*/
export const createTextures = (textures: Record<string, TextureData>) =>
  Object.keys(textures).reduce(
    (current, key) => ({
      ...current,
      // @ts-ignore
      // [key]: `${path.scenePublicPath}/${textures[key].light}`,
      [key]: `/textures/${textures[key].light}`,
    }),
    {},
  );
