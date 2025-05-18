import { useMaterial } from '@/shared/lib/hooks';
import { ModelData } from '@/shared/lib/types';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

/*
 * Компонент модели для наград
 *
 * Пропсы:
 * config: ModelData. Описан в webgl-doc.md
 */

interface Props {
  config: ModelData;
}

export default function AwardModel({ config }: Props) {
  const { nodes } = useGLTF(config.sceneFile);
  const materials = useMaterial(config);

  return (
    <>
      {Object.keys(nodes).map(
        (key) =>
          (nodes[key] as Mesh).isMesh && (
            <mesh
              scale={0}
              name={nodes[key].name}
              key={key}
              geometry={(nodes[key] as Mesh).geometry}
              material={materials[config.objects[key].material]}
            />
          ),
      )}
    </>
  );
}
