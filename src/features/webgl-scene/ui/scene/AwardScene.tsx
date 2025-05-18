'use client';

/*
 * Компонент сцены наград
 *
 * Пропсы:
 * models: ModelData[], Описана в webgl-doc.md
 * onLoad: () => void. Коллбэк отрабатывающий по загрузке модели
 */

import { useProgress } from '@react-three/drei';
import { Group, Object3DEventMap } from 'three';
import { ModelData } from '@/shared/lib/types';
import { Ref, forwardRef, useEffect } from 'react';
import AwardModel from './AwardModel';

interface Props {
  models: ModelData[];
  onLoad: () => void;
}

function AwardScene({ models, onLoad }: Props, ref: Ref<Group<Object3DEventMap>>) {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      onLoad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <group ref={ref}>
      {models.map((config) => (
        <AwardModel key={config.sceneFile} config={config} />
      ))}
    </group>
  );
}

export default forwardRef(AwardScene);
