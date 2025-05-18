'use client';

import clsx from 'clsx';
import { IMediaSlider } from '@/shared/lib/types';
import { createPortal } from 'react-dom';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Slider } from '@/shared/ui';
import Image from 'next/image';
import GalleryImage from './GalleryImage';

interface Props {
  className?: string;
  media: IMediaSlider[];
  open: boolean;
  onClose: () => void;
  imageIndex: number;
  setActiveIndex?: React.Dispatch<React.SetStateAction<number>>;
}

function Portal({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && createPortal(children, document.body);
}

export default function Gallery({ className, open, media, onClose, imageIndex, setActiveIndex }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === ref.current) {
      e.stopPropagation();
      onClose();
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={clsx('fixed inset-0 z-50 grid w-full grid-cols-8 items-center gap-x-i24 bg-black/16', className)}
            onClick={onOverlayClick}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.2 }}
              className={clsx('relative col-span-full h-full bg-dark ')}
            >
              <div className='absolute right-i24 top-i24'>
                <Button iconRight='cross' onClick={onClose} theme='black' />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { delay: 0, duration: 0.1 } }}
                transition={{ duration: 0.2, delay: 0.2 }}
                className='h-full'
              >
                {media.length === 1 ? (
                  <div>
                    {media[0].media.url && media[0].media.type === 'image/jpeg' && (
                      <Image src={media[0].media.url} alt={''} layout='fill' objectFit='cover' />
                    )}
                  </div>
                ) : (
                  <Slider
                    setActiveIndex={setActiveIndex}
                    slideClassName='mr-gap basis-full md:basis-auto last:mr-0 h-full'
                    align='center'
                    dragFree
                    wrapperClassName='h-full *:h-full'
                    className='h-full'
                    pagination
                    loop={false}
                    paginationType='buttons'
                    startIndex={imageIndex}
                  >
                    {media.map((item) => (
                      <>
                        {item.media.url && (
                          <GalleryImage key={item.media.url} src={item.media.url} className='h-full' />
                        )}
                      </>
                    ))}
                  </Slider>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
