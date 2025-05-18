import { ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  href: string;
  headerOutlet: ReactNode;
  children: ReactNode;
  isVideo?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function BigContentCard({ href, headerOutlet, children, isVideo, onMouseEnter, onMouseLeave }: Props) {
  return (
    <div className={'relative flex size-full flex-col'} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className={'absolute z-20 w-full'}>{headerOutlet}</div>
      {children}
      <a
        href={href}
        target={'_blank'}
        className={clsx(
          'mt-i16 flex flex-col before:absolute before:left-0 before:top-0 before:z-10 before:block before:cursor-pointer',
          !isVideo && 'before:size-full ',
        )}
      />
    </div>
  );
}
