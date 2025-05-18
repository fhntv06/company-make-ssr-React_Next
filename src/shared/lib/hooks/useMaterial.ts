'use client';

/*
 * Хук для создания материала и текстуры к модели
 *
 * Принимает:
 * config: ModelData.
 *
 * Возвращает объект, где ключ имя меша значение материал
 */

import { useTexture } from '@react-three/drei';
import { createMaterials, createTextures } from '@/shared/lib/webgl';
import { ModelData } from '@/shared/lib/types';
import { Material } from 'three';

export default function useMaterial(config: ModelData): Record<string, Material> {
  // Загрузка всех текстур прописаных для модели
  const textures = useTexture(createTextures(config.textures));
  // Переобпределяем цветовую гамму
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, prettier/prettier
  Object.keys(textures).forEach((key) => { textures[key].colorSpace = 'srgb' });

  return createMaterials(config.materials, textures);
}
