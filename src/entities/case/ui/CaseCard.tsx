'use client';

import React, { useRef, useState } from 'react';
import { ContentCard, Tag } from '@/shared/ui';
import { Case as CaseType } from '@/entities/case/types';
import { AwardsList } from '@/features/awards-list';
import Image from 'next/image';
import clsx from 'clsx';
import { KinescopeRef } from '@/shared/lib/types';
import { kinescopeRe } from '@/shared/lib/constants';
import { getVideoSrc } from '@/shared/lib/helpers';
// eslint-disable-next-line import/no-cycle
import { KinescopeVideo } from '@/entities/publication';

interface Props {
  data: CaseType;
  columns: 2 | 4;
  className?: string;
}

export default function CaseCard({ data, columns, className = '' }: Props) {
  const playerRef = useRef<KinescopeRef>(null);
  const [loaded, setLoaded] = useState<boolean | 'start'>(false);

  function HeaderOutlet() {
    return (
      <div className={'hidden h-fit w-full grid-cols-2 p-i24 lg:grid'}>
        <div className={'flex flex-row flex-wrap justify-start gap-y-2'}>
          {data.tags.map((tag, index) => (
            <div key={index} className={`${index === data.tags.length - 2 && 'mr-2'}`}>
              <Tag tag={tag} />
            </div>
          ))}
        </div>
        <div className={'flex flex-row flex-wrap justify-end space-x-i16'}>{<AwardsList awards={data.awards} />}</div>
      </div>
    );
  }

  const onLoaded = () => {
    setLoaded(true);
  };

  const onMouseEnter = () => {
    if (!loaded) {
      setLoaded('start');
      playerRef.current?.onStartLoading();
    }

    if (loaded === true && playerRef.current) {
      playerRef.current.onPlay();
    }
  };

  const onMouseLeave = () => {
    if (loaded === true && playerRef.current) {
      playerRef.current.onPause();
    }
  };

  return (
    <ContentCard
      title={data.title}
      description={data.description}
      href={`/cases/${data.id}`}
      className={clsx(
        'group col-span-full md:col-span-2',
        columns === 2 ? 'lg:col-span-2 lg:even:col-start-7' : 'lg:col-span-4 lg:even:col-start-5',
        className,
      )}
      headerOutlet={<HeaderOutlet />}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={clsx('relative aspect-video', columns === 2 && 'lg:aspect-[45/56]')}>
        <Image
          src={data.media.url}
          alt={data.media.name || ''}
          fill
          className={clsx(
            'object-cover transition',
            loaded === true && data.video && Boolean(data.video.src)
              ? 'group-hover:invisible group-hover:opacity-0'
              : '',
          )}
        />
        {data.video && data.video.src && (
          <KinescopeVideo
            ref={playerRef}
            videoId={getVideoSrc(data.video.src, kinescopeRe) ?? ''}
            onLoaded={onLoaded}
          />
        )}
      </div>
    </ContentCard>
  );
}
