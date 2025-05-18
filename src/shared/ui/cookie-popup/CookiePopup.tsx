import React from 'react';
import { Button } from '@/shared/ui';
import clsx from 'clsx';

interface Props {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  theme?: 'white' | 'black';
  className?: string;
}

export default function CookiePopup({ theme = 'white', className }: Props) {
  return (
    <div className='pointer-events-none grid-subcontainer'>
      <div className='pointer-events-auto col-span-4 flex-col md:col-span-2'>
        <div className='mb-2'>
          <div
            className={clsx(
              'rounded-2xl px-i24 pb-i64 pt-i16',
              {
                'bg-white text-black': theme === 'white',
                'bg-black/64 text-white': theme === 'black',
              },
              className,
            )}
          >
            <span className='typo-p'>
              мы используем cookies и собираем технические данные, без этого никуда - так устроен интернет
            </span>
          </div>
        </div>
        <Button iconRight='cookie' wrapperClassName='md:w-full' className={clsx('w-full')} theme={theme} size='small'>
          <h4>хорошо</h4>
        </Button>
      </div>
    </div>
  );
}
