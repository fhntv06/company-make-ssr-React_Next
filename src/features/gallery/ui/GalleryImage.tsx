import React, { PropsWithChildren, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
  src: string;
  alt?: string;
  className?: string;
}

export default function GalleryImage({ src, alt = '', children, className }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  const handleImageDimensions = useCallback(() => {
    if (!ref.current) return;

    const image = ref.current;
    const { naturalWidth, naturalHeight } = image;
    setImageDimensions({ width: naturalWidth, height: naturalHeight });
  }, []);

  return (
    <div
      className={clsx('relative', className)}
      style={{
        aspectRatio: imageDimensions ? imageDimensions.width / imageDimensions.height : undefined,
        height: '100%',
      }}
    >
      <Image ref={ref} src={src} alt={alt} layout='fill' objectFit='cover' onLoad={handleImageDimensions} />
      {children}
    </div>
  );
}
