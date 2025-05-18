'use client';

/*
 * Компонент-обертка. Реализует постоянное вращение модели по оси Y.
 * Если необходимо вращение по нескольким осям, лучше использовать кватернионы, чтобы не случися gimbal lock
 *
 * Пропсы:
 * factor: number | MotionValue<number> - дельта влияющая на скорость вращения. Дефолт: 0.5
 * children -- непосредственно обьект, которую будет вращать
 */

import { PropsWithChildren, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Quaternion, Vector3 } from 'three';
import { MotionValue } from 'framer-motion';

interface Props extends PropsWithChildren {
  factor?: MotionValue<number> | number;
}

const yAxis = new Vector3(0, 1, 0);
// const zAxis = new Vector3(0, 0, 1);

export default function RotatedModel({ children, factor = 0.5 }: Props) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      const angle = typeof factor === 'number' ? factor : factor?.get();

      const qy = new Quaternion().setFromAxisAngle(yAxis, delta * angle);
      // const qz = new Quaternion().setFromAxisAngle(zAxis, delta * angle);

      group.current.applyQuaternion(qy);
      // group.current.applyQuaternion(qz);
    }
  });

  return (
    <group ref={group} rotation-x={Math.PI / 8}>
      {children}
    </group>
  );
}
