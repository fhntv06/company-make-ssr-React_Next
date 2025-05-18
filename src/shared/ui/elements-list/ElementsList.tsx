'use client';

import React, {
  Children,
  forwardRef,
  ForwardRefRenderFunction,
  FunctionComponentElement,
  PropsWithChildren,
  Ref,
  useState,
} from 'react';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
  className?: string;
  itemClassName?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

type ReturnType = FunctionComponentElement<ForwardRefRenderFunction<Props>>;

function ElementsList(
  { className, itemClassName, onMouseEnter, onMouseLeave, children }: Props,
  ref: Ref<HTMLUListElement>,
): ReturnType {
  const [hoveredItem, setHoveredItem] = useState<number | undefined>(undefined);

  return (
    <ul ref={ref} className={clsx(className)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {Children.map(children, (child, index) => (
        <li
          className={clsx(
            'cursor-pointer transition-all',
            { 'opacity-64': hoveredItem !== undefined && hoveredItem !== index },
            itemClassName,
          )}
          onMouseEnter={() => {
            setHoveredItem(index);
          }}
          onMouseLeave={() => {
            setHoveredItem(undefined);
          }}
        >
          {child}
        </li>
      ))}
    </ul>
  );
}

export default forwardRef(ElementsList);
