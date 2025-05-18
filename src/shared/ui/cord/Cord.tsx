'use client';

import { useEffect, useRef } from 'react';
import { useResizeObserver } from 'usehooks-ts';
import { easeOutElastic } from '@/shared/lib/easing-functions';
import clsx from 'clsx';

interface Props {
  areaHeight?: number;
  className?: string;
  white?: boolean;
}

const BOUNCING_TIME = 1000;

export default function Cord({ areaHeight = 141, className = '', white = false }: Props) {
  const meanCoords = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastDir = useRef<number>();
  const ref = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const raf = useRef<number>(0);
  const isPulling = useRef<boolean>(false);
  const rectRef = useRef<DOMRect>();

  const redraw = () => {
    if (rectRef.current) {
      const rect = rectRef.current;
      const hh = rect.height / 2;
      pathRef.current?.setAttribute(
        'd',
        `M0,${hh} Q${meanCoords.current.x}, ${meanCoords.current.y} ${rect.width},${hh}`,
      );
    }
  };

  const onResize = () => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      meanCoords.current.x = rect.width / 2;
      meanCoords.current.y = rect.height / 2;
      svgRef.current?.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
      rectRef.current = rect;
      redraw();
    }
  };

  useResizeObserver({
    ref,
    onResize,
  });

  useEffect(() => {
    const bounce = () => {
      if (!rectRef.current) return;
      const rect = rectRef.current;

      isPulling.current = false;
      const startTime = Date.now();
      const xTarget = rect.width / 2;
      const yTarget = rect.height / 2;
      const xDelta = xTarget - meanCoords.current.x;
      const yDelta = yTarget - meanCoords.current.y;
      const rd = () => {
        const t = Math.min((Date.now() - startTime) / BOUNCING_TIME, 1);
        const et = easeOutElastic(t);
        meanCoords.current.x = xTarget + (et - 1) * xDelta;
        meanCoords.current.y = yTarget + (et - 1) * yDelta;
        redraw();
        if (t !== 1) {
          raf.current = window.requestAnimationFrame(rd);
        }
      };

      rd();
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!svgRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      rectRef.current = rect;

      const svgY = rect.top + window.scrollY;
      const svgX = rect.left + window.scrollX;
      const svgHeight = rect.height;
      const svgWidth = rect.width;

      meanCoords.current.y = event.pageY - svgY;
      meanCoords.current.x = event.pageX - svgX;
      const y = meanCoords.current.y / svgHeight;
      const x = meanCoords.current.x / svgWidth;

      if (y < 0 || y > 1 || x < 0 || x > 1) {
        if (isPulling.current) {
          bounce();
        }

        return;
      }

      window.cancelAnimationFrame(raf.current);

      const yn = Math.max(Math.min(y, 1.0), 0.0);

      const dir = yn < 0.5 ? -1 : 1;
      if (lastDir.current && lastDir.current !== dir) {
        isPulling.current = true;
      }

      lastDir.current = dir;
      if (isPulling.current) {
        raf.current = window.requestAnimationFrame(redraw);
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className={clsx('relative h-px', className)}>
      <div ref={ref} style={{ height: areaHeight }} className='pointer-events-none absolute w-full'>
        <svg
          className={clsx(
            'absolute -top-1/2 left-0 z-10 size-full overflow-visible fill-none',
            white ? 'stroke-white' : 'stroke-black',
          )}
          ref={svgRef}
          xmlns='http://www.w3.org/2000/svg'
        >
          <path ref={pathRef} strokeWidth={1} />
        </svg>
      </div>
    </div>
  );
}
