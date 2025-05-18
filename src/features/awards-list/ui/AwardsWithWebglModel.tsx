'use client';

/*
 * Компонент с логикой смены модели при наведение на пункт списка с наградами
 */

import { useAnimate, useMotionValue, useTransform } from 'framer-motion';
import { MouseEvent, PropsWithChildren, useEffect, useRef } from 'react';
import { AwardScene, RotatedModel } from '@/features/webgl-scene';
import { Canvas } from '@react-three/fiber';
import { useAwardSceneStore } from '@/features/webgl-scene/model/award-store';
import { Group, Object3D, Object3DEventMap } from 'three';
import { ElementsList } from '@/shared/ui';

// Список наград.
// TODO: Уточнить структуру этих пунктов у бэка и согласовать связь с модельками
const awards = [
  {
    id: 1,
    name: 'dprofile',
    model: 'DP_Best_remesh',
  },
  {
    id: 2,
    name: 'рейтинг рунета',
    model: 'RR',
  },
  {
    id: 3,
    name: 'золотой сайт',
    model: 'Goldel_Site',
  },
  {
    id: 4,
    name: 'tagline awards',
    model: 'Tagline',
  },
  {
    id: 5,
    name: 'ruward',
    model: 'RuAward',
  },
  {
    id: 6,
    name: 'другие',
    model: 'Goldel_App',
  },
];

export default function AwardsWithWebglModel({ children }: PropsWithChildren) {
  // Определение первого рендера для исполнения кода один раз
  const firstRender = useRef<boolean>(true);
  // Таймер, по которому отрабатывает овозвращение дефолтной модели
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const x = useMotionValue(0);
  const rotateFactor = useTransform(x, [0, 0.5, 1], [0.5, 10, 15]);
  // @ts-ignore
  const [scope, animate] = useAnimate<Group<Object3DEventMap>>();
  const { models, fetchModels, DEFAULT_MODEL, currentModel, setCurrentModel } = useAwardSceneStore();

  // Метод для получения модели из общего списка загруенных моделей
  // Принимает model - имя модели
  const getModels = (model: string) => {
    const s = scope.current.children;
    return s.filter((o) => o.name.includes(model));
  };

  // Функция реализующая анимацию смены модели
  const animateModel = async (model: Object3D[], direction: 'forward' | 'backward' = 'forward') => {
    const dir = direction === 'forward' ? [0, 1] : [1, 0];
    await animate(dir[0], dir[1], {
      onUpdate: (latest) => {
        x.set(latest);
        model.forEach((o) => o.scale.setScalar(latest));
      },
      duration: 0.5,
    });

    await animate(dir[1], dir[0], {
      onUpdate: (latest) => {
        x.set(latest);
      },
      duration: 1,
    });
  };

  useEffect(() => {
    if (!models.length) {
      fetchModels();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Анимация после загрузки моделей
  const onLoad = () => {
    if (!firstRender.current) return;
    const m = getModels(DEFAULT_MODEL);
    animateModel(m)
      .then(() => {
        firstRender.current = false;
      })
      .catch((e) => console.log(e));
  };

  const onMouseEnter = async (e: MouseEvent<HTMLElement>) => {
    if (!currentModel) return;

    clearTimeout(timer.current);
    const { model } = (e.target as HTMLElement).dataset;

    if (!model || model === currentModel) return;

    const found = getModels(model);
    const currentModelFound = getModels(currentModel);

    setCurrentModel(model);
    await Promise.all([animateModel(currentModelFound, 'backward'), animateModel(found)]);
  };

  const onMouseLeave = () => {
    if (!currentModel) return;

    if (currentModel === DEFAULT_MODEL) return;

    const found = getModels(currentModel);
    const defaultModel = getModels(DEFAULT_MODEL);

    timer.current = setTimeout(async () => {
      setCurrentModel(DEFAULT_MODEL);
      await Promise.all([animateModel(found, 'backward'), animateModel(defaultModel)]);
    }, 2000);
  };

  return (
    <>
      <div className='col-span-2 aspect-square'>
        <Canvas resize={{ scroll: false }} camera={{ position: [0, 0, 2] }}>
          <RotatedModel factor={rotateFactor}>
            <AwardScene models={models} ref={scope} onLoad={onLoad} />
          </RotatedModel>
        </Canvas>
      </div>
      <div className='col-span-4 grid grid-cols-4 gap-y-gap'>
        <ElementsList
          className='col-span-4 grid grid-cols-4 gap-y-gap border-t border-white/16 pt-i24'
          itemClassName='col-span-2 relative before:absolute border-b border-white/16 pb-i24'
        >
          {awards.map((award) => (
            <p
              key={award.id}
              data-model={award.model}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className='h4 base-link relative w-fit text-white !transition-[background-size,opacity]'
            >
              {award.name}
            </p>
          ))}
        </ElementsList>
        {children}
      </div>
    </>
  );
}
