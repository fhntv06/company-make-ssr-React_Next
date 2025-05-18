import { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@/shared/ui/link/Link';

interface Props {
  title?: string;
  description: string;
  href: string;
  headerOutlet: ReactNode;
  children: ReactNode;
  isVideo?: boolean;
  withoutTitle?: boolean;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  contrast?: boolean;
}

export default function ContentCard({
  title,
  description,
  href,
  withoutTitle = false,
  headerOutlet,
  children,
  isVideo,
  className = '',
  onMouseEnter,
  onMouseLeave,
  contrast = false,
}: Props) {
  return (
    <div
      className={clsx('relative flex size-full flex-col', className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={'absolute z-20 w-full'}>{headerOutlet}</div>
      {children}
      {!withoutTitle && (
        <h3 className={`mt-i16 font-medium ${contrast ? 'text-white' : 'text-black'}`}>
          <Link
            to={href}
            className={clsx(
              'inline before:absolute before:left-0 before:top-0 before:z-10 before:block before:cursor-pointer',
              !isVideo && 'before:size-full ',
            )}
          >
            {title}
          </Link>
          {description && (
            <span className={`font-normal ${contrast ? 'text-white' : 'text-dark'}`}> / {description}</span>
          )}
        </h3>
      )}
    </div>
  );
}
