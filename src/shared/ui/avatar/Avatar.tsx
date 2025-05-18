import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

export default function Avatar({ src, alt, className }: Props) {
  return (
    <div className={clsx('relative size-12 rounded-2xl lg:size-16 lg:rounded-3xl', className)}>
      <Image className='rounded-[inherit]' src={src} alt={alt ?? ''} fill objectPosition='top' objectFit='cover' />
    </div>
  );
}
