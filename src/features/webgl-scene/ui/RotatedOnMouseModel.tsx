'use client';

/*
 * Компонент-обертка. Реализует врещение модели зависящее от координатов мыши
 *
 * Пропсы:
 * children - модель или группа, которую необходимо вращать
 */

import { PropsWithChildren, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easeOutCubic } from '@/shared/lib/easing-functions';
import { Group, Quaternion, Vector2, Vector3 } from 'three';

interface Props extends PropsWithChildren {}

/* Определение осей поворота */
// const xAxis = new Vector3(1, 0, 0);
const yAxis = new Vector3(0, 1, 0);

export default function RotatedOnMouseModel({ children }: Props) {
  const group = useRef<Group>(null);
  const mouseRef = useRef<Vector2>(new Vector2(0, 0));

  useFrame((_, delta) => {
    if (group.current) {
      const et = easeOutCubic(delta);
      const startQuaternion = group.current.quaternion.clone();
      /*
        Создание кватернионов поворота.
        targetQuaternion - умножение двух кватернионов, для выполнения поворотов по осям x и y
        Если нужно будет крутить по двум осям, то расскоментировать xRotation и targetQuaternion
        в quaternion заменить yRotation на targetQuaternion
      */
      const yRotation = new Quaternion().setFromAxisAngle(yAxis, (Math.PI * (mouseRef.current.x - 0.5) * 20) / 500);
      // const xRotation = new Quaternion().setFromAxisAngle(xAxis, (Math.PI * (mouseRef.current.y - 0.5) * 20) / 500);
      // const targetQuaternion = yRotation.multiply(xRotation);
      const quaternion = startQuaternion.clone().slerp(yRotation.clone(), et);
      group.current.quaternion.copy(quaternion);
    }
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handler);

    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return <group ref={group}>{children}</group>;
}
