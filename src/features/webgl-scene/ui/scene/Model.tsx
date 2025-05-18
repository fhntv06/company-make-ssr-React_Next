'use client';

/*
 * Компонент модели для первого экрана.
 *
 * Пропсы:
 * config: ModelData. Данные по модели с бэкенда. Описаны в webgl-doc.md
 */

import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';
import { ModelData } from '@/shared/lib/types';
import { useMaterial } from '@/shared/lib/hooks';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

interface Props {
  config: ModelData;
}

function Model({ config }: Props) {
  const { set } = useThree();
  const { nodes } = useGLTF(config.sceneFile);
  const { cameras } = useGLTF('CameraOnly.glb');

  const materials = useMaterial(config);

  useEffect(() => {
    // Устанавливаем камеру из загруженой сцены в качестве основной
    if (cameras.length) {
      // @ts-ignore
      set({ camera: cameras[0] });
    }
  }, [cameras, set]);

  return (
    <group>
      {Object.keys(nodes).map(
        (node) =>
          (nodes[node] as Mesh).isMesh && (
            <mesh
              key={node}
              position={(nodes[node] as Mesh).position}
              geometry={(nodes[node] as Mesh).geometry}
              material={materials[config.objects[node].material]}
            />
          ),
      )}
    </group>
  );
}

export default Model;
