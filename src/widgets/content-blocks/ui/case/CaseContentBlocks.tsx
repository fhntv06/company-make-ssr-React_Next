import React from 'react';
import { ContentBlock, ContentBlockType, IMediaSlider } from '@/shared/lib/types';
import parser from 'html-react-parser';
import Image from 'next/image';
import clsx from 'clsx';
import { GallerySlider } from '@/features/gallery';
import styles from './CaseContentBlocks.module.css';

interface Props {
  data: ContentBlock[];
  className?: string;
}

const renderContent = (contentBlock: ContentBlock) => {
  switch (contentBlock.content_block_type) {
    case ContentBlockType.IMAGE:
      return (
        <>
          {contentBlock.images.map((image, index) => (
            <>
              {image.media && (
                <div
                  className={clsx('relative col-span-full aspect-video max-h-[1080px]', {
                    'mb-i80':
                      (!image.subtext && contentBlock.images.length <= 1) ||
                      (index === contentBlock.images.length - 1 && index !== 0),
                    'mt-i12 lg:mt-i48': index === 0,
                  })}
                >
                  <Image src={image.media.url} alt='' fill objectFit='cover' />
                </div>
              )}
              {image.subtext && contentBlock.images.length <= 1 && (
                <div className='col-span-full grid-subcontainer'>
                  <p className='p col-span-3 mb-i80 mt-i16'>{parser(image.subtext)}</p>
                </div>
              )}
            </>
          ))}
        </>
      );
    case ContentBlockType.SLIDER: {
      return (
        <GallerySlider
          className='col-span-full mb-i80 mt-i16 aspect-video max-h-[788px] lg:mt-i48'
          media={contentBlock.images as unknown as IMediaSlider[]}
        />
      );
    }
    default:
      return parser(contentBlock.content ?? '', {
        transform: (reactNode) => {
          return <>{reactNode}</>;
        },
      });
  }
};

export default function PublicationContentBlocks({ data, className }: Props) {
  return (
    <div className={clsx(styles.content, className)}>{data.map((contentBlock) => renderContent(contentBlock))}</div>
  );
}
