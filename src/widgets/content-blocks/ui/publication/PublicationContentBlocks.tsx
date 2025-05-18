/* eslint-disable consistent-return */

import React from 'react';
import Image from 'next/image';
import parser from 'html-react-parser';
import { ContentBlock, ContentBlockType, IMediaSlider } from '@/shared/lib/types';
import { Blockquote, IFrameVideo } from '@/shared/ui';
import { GallerySlider } from '@/features/gallery';
import clsx from 'clsx';
import styles from './PublicationContentBlock.module.css';

interface Props {
  data: ContentBlock[];
}

const renderContent = (contentBlock: ContentBlock) => {
  switch (contentBlock.content_block_type) {
    case ContentBlockType.IMAGE:
      if (contentBlock.images.length && contentBlock.images[0].iframe) {
        return parser(contentBlock.images[0].iframe, {
          transform: (reactNode) => {
            // @ts-ignore
            if (contentBlock.images[0].iframe && reactNode && reactNode.type === 'iframe') {
              return (
                <>
                  <IFrameVideo
                    className={clsx('col-span-full', { 'mb-i80': !contentBlock.images[0].subtext })}
                    preview='/images/publications/video.png'
                  >
                    {reactNode}
                  </IFrameVideo>
                  {contentBlock.images[0].subtext && (
                    <p className='p col-span-full mb-i80 mt-i16'>{parser(contentBlock.images[0].subtext)}</p>
                  )}
                </>
              );
            }
          },
        });
      }

      if (contentBlock.images.length && contentBlock.images[0].iframe === null) {
        return (
          <div className='col-span-full mb-i80 flex flex-col'>
            {contentBlock.images.map((image) => (
              <>
                <div className='relative mb-i24 aspect-video max-h-[788px] last-of-type:mb-0'>
                  <Image src={image.media?.url ?? ''} alt={image.subtext ?? ''} fill objectFit='cover' />
                </div>
                {image.subtext && <p className='p col-span-full  mt-i16'>{parser(image.subtext)}</p>}
              </>
            ))}
          </div>
        );
      }

      break;

    case ContentBlockType.QUOTE: {
      return <Blockquote>{contentBlock.small_content}</Blockquote>;
    }
    case ContentBlockType.AUTHOR_QUOTE: {
      return (
        <Blockquote
          author={{
            name: contentBlock.small_text,
            description: contentBlock.text,
            photo: contentBlock.images[0].media?.url ?? '',
          }}
        >
          {contentBlock.small_content}
        </Blockquote>
      );
    }
    case ContentBlockType.SLIDER: {
      return (
        <GallerySlider
          className='col-span-full mb-i80 aspect-video max-h-[520px]'
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

export default function PublicationContentBlocks({ data }: Props) {
  return <div className={styles.content}>{data.map((contentBlock) => renderContent(contentBlock))}</div>;
}
