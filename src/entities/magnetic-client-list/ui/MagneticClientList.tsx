'use client';

import React, { RefObject, useEffect, useRef } from 'react';
import Matter from 'matter-js';
import Image from 'next/image';
import clsx from 'clsx';
import { useMediaQuery } from 'usehooks-ts';

interface Props {
  wallThickness?: number;
  outsideContainerRef: RefObject<HTMLDivElement | null>;
  className?: string;
}

const sizeMap = {
  large: 120,
  medium: 80,
  small: 48,
};

// размеры логотипов должны быть прописаны внутри svg
const data: {
  id: number;
  src: string;
  name: string;
  size: 'large' | 'medium' | 'small';
}[] = [
  {
    id: 1,
    src: 'images/clients_magnetic/roskosmos.svg',
    name: 'roskosmos',
    size: 'large',
  },
  {
    id: 2,
    src: 'images/clients_magnetic/gbs.svg',
    name: 'gbs',
    size: 'medium',
  },
  {
    id: 3,
    src: 'images/clients_magnetic/ami.svg',
    name: 'ami',
    size: 'small',
  },
  {
    id: 4,
    src: 'images/clients_magnetic/kuzbas-gov.svg',
    name: 'kuzbas-gov',
    size: 'medium',
  },
  {
    id: 5,
    src: 'images/clients_magnetic/vector.svg',
    name: 'vector',
    size: 'large',
  },
  {
    id: 6,
    src: 'images/clients_magnetic/zhns.svg',
    name: 'zhns',
    size: 'medium',
  },
  {
    id: 7,
    src: 'images/clients_magnetic/savoy.svg',
    name: 'savoy',
    size: 'medium',
  },
  {
    id: 8,
    src: 'images/clients_magnetic/gosveb.svg',
    name: 'gosveb',
    size: 'large',
  },
  {
    id: 9,
    src: 'images/clients_magnetic/yanao.svg',
    name: 'yanao',
    size: 'medium',
  },
  {
    id: 10,
    src: 'images/clients_magnetic/rostelekom.svg',
    name: 'rostelekom',
    size: 'large',
  },
  {
    id: 11,
    src: 'images/clients_magnetic/optitech.svg',
    name: 'optitech',
    size: 'medium',
  },
];

export default function MagneticClientList({ wallThickness = 5, outsideContainerRef, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    if (!containerRef.current || !outsideContainerRef.current || isMobile) return () => {};

    let magnetOn = false;
    const element = outsideContainerRef.current;
    const container = containerRef.current;

    if (!element) return () => {};

    const containerRect = element.getBoundingClientRect();

    let engine: Matter.Engine;
    let render: Matter.Render;
    let world: Matter.World;
    let runner: Matter.Runner;
    let magnet: Matter.Body;
    let boundaries: Matter.Body[];

    const createBoundaries = () => {
      const options: Matter.IChamferableBodyDefinition = {
        isStatic: true,
        density: 10,
        render: { visible: false },
      };

      const leftWall = Matter.Bodies.rectangle(0, element.clientHeight / 2, wallThickness, 10000, options);

      const rightWall = Matter.Bodies.rectangle(
        element.clientWidth,
        element.clientHeight / 2,
        wallThickness,
        10000,
        options,
      );

      const ceiling = Matter.Bodies.rectangle(element.clientWidth / 2, 0, 10000, wallThickness, options);

      const floor = Matter.Bodies.rectangle(
        element.clientWidth / 2,
        element.clientHeight,
        10000,
        wallThickness,
        options,
      );

      boundaries = [leftWall, rightWall, ceiling, floor];
    };

    const setupWorld = () => {
      const items = Array.from(container.children) as HTMLImageElement[];

      if (!items.length) return;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const { left, top } = rect;

        const x = left - containerRect.left;
        const y = top - containerRect.top;

        const size = sizeMap[data[index].size];

        const box = Matter.Bodies.rectangle(x, y, size, size, {
          density: 0.003, // плотность
          restitution: 0.5, // упругость
          render: {
            sprite: {
              texture: item.src,
              xScale: 1,
              yScale: 1,
            },
          },
        });

        Matter.World.add(world, box);
      });

      createBoundaries();
      Matter.World.add(world, boundaries);

      magnet = Matter.Bodies.circle(0, 0, 0, { isStatic: true, render: { visible: false } });
      Matter.World.add(world, magnet);
    };

    const init = () => {
      engine = Matter.Engine.create();
      render = Matter.Render.create({
        element,
        engine,
        options: {
          width: element.clientWidth,
          height: element.clientHeight,
          wireframes: false,
          background: 'transparent',
        },
      });

      render.canvas.setAttribute('style', 'pointer-events: none; position: absolute; top: 0; left: 0; z-index: 10');

      world = engine.world;

      setupWorld();

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);
    };

    init();

    const applyMagneticForce = () => {
      if (!magnetOn) return;

      const magnetRadius = element.clientWidth; // радиус магнитного поля
      const forceMagnitude = 0.06; // сила магнитного притяжения

      world.bodies.forEach((body) => {
        if (body.isStatic) return;

        const distance = Matter.Vector.magnitude(Matter.Vector.sub(magnet.position, body.position)); // расстояние между положениями магнита и текущего объекта

        if (distance < magnetRadius) {
          const forceDirection = Matter.Vector.normalise(Matter.Vector.sub(magnet.position, body.position)); // Эта строка вычисляет направление магнитной силы. Она вычитает положение текущего объекта из положения магнита, чтобы получить вектор, направленный от объекта к магниту. Затем этот вектор нормализуется для получения единичного вектора, представляющего направление силы.
          const force = Matter.Vector.mult(forceDirection, forceMagnitude); // вектор силы, который будет применен к объекту
          Matter.Body.applyForce(body, body.position, force);
        }
      });
    };

    const updateMagnetPosition = (event: PointerEvent) => {
      Matter.Body.setPosition(magnet, {
        x: event.clientX,
        y: event.clientY,
      });
      applyMagneticForce();
    };

    const pointerMoveHandler = (event: PointerEvent) => {
      updateMagnetPosition(event);
    };

    const pointerDownHandler = (event: PointerEvent) => {
      magnetOn = true;
      updateMagnetPosition(event);
    };

    const turnOffMagnetHandler = () => {
      magnetOn = false;
      magnet.position.x = -10000;
      magnet.position.y = -10000;
    };

    const resizeHandler = () => {
      render.canvas.width = element.clientWidth;
      render.canvas.height = element.clientHeight;

      const [leftWall, rightWall, ceiling, floor] = boundaries;

      Matter.Body.setPosition(leftWall, Matter.Vector.create(0, element.clientHeight / 2));
      Matter.Body.setPosition(rightWall, Matter.Vector.create(element.clientWidth, element.clientHeight / 2));
      Matter.Body.setPosition(ceiling, Matter.Vector.create(element.clientWidth / 2, 0));
      Matter.Body.setPosition(floor, Matter.Vector.create(element.clientWidth / 2, element.clientHeight));
    };

    element.addEventListener('pointerdown', pointerDownHandler);
    window.addEventListener('pointermove', pointerMoveHandler);
    window.addEventListener('pointerup', turnOffMagnetHandler);
    window.addEventListener('resize', resizeHandler);

    return () => {
      element.removeEventListener('pointerdown', pointerDownHandler);
      window.removeEventListener('pointermove', pointerMoveHandler);
      window.removeEventListener('pointerup', turnOffMagnetHandler);
      window.removeEventListener('resize', resizeHandler);

      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);

      render.canvas.remove();
      render.textures = {};
    };
  }, [wallThickness, outsideContainerRef, isMobile]);

  return (
    <div className={clsx('pointer-events-none absolute inset-0 size-full', className)}>
      <div className={clsx('relative size-full overflow-hidden')}>
        <div
          ref={containerRef}
          className='pointer-events-none invisible absolute flex select-none flex-wrap gap-grid opacity-0'
        >
          {data.map((item) => (
            <Image
              key={item.id}
              src={item.src}
              alt={item.name}
              width={sizeMap[item.size]}
              height={sizeMap[item.size]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
