import clsx from 'clsx';
import { ReactNode, FunctionComponentElement } from 'react';

interface Props<T> {
  children: ReactNode | FunctionComponentElement<T>;
  transparent?: boolean;
}

export default function Hint<T>({ transparent = false, children }: Props<T>) {
  return (
    <div className={clsx('rounded-4xl ', transparent ? 'bg-black/0' : 'bg-black/65 px-i24 py-i16 backdrop-blur-xl')}>
      {children}
    </div>
  );
}
