'use client';

/*
 * Обертка для базовой сцены на первом экране
 */

import { Canvas } from '@react-three/fiber';
import Model from '@/features/webgl-scene/ui/scene/Model';
import { useEffect } from 'react';
import RotatedOnMouseModel from '@/features/webgl-scene/ui/RotatedOnMouseModel';
import { useWebglModelStore } from '../../model/store';

export default function Scene() {
  const { models, fetchModels, currentModel } = useWebglModelStore();

  useEffect(
    () => {
      if (!models.length) {
        fetchModels();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    currentModel && (
      <Canvas resize={{ scroll: false }}>
        <RotatedOnMouseModel>
          <Model config={currentModel} />
        </RotatedOnMouseModel>
      </Canvas>
    )
  );
}
