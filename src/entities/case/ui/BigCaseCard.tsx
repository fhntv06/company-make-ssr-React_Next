'use client';

/* eslint-disable tailwindcss/no-custom-classname */

import React, { useRef, useState } from 'react';
import { BigContentCard, Link, Tag } from '@/shared/ui';
import { AwardsList } from '@/features/awards-list';
import Image from 'next/image';
import clsx from 'clsx';
import { Client } from '@/entities/client';
import { type Case } from '@/entities/case';
// eslint-disable-next-line import/no-cycle
import { KinescopeVideo } from '@/entities/publication';
import { KinescopeRef } from '@/shared/lib/types';
import { getVideoSrc } from '@/shared/lib/helpers';
import { kinescopeRe } from '@/shared/lib/constants';

interface Props {
  data: Case;
}

export default function BigCaseCard({ data }: Props) {
  const playerRef = useRef<KinescopeRef>(null);
  const [loaded, setLoaded] = useState<boolean | 'start'>(false);

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

  function HeaderOutlet() {
    return (
      <div className={'grid h-fit w-full grid-cols-2 p-i24'}>
        <div className={'hidden flex-row flex-wrap justify-start gap-y-2 lg:flex'}>
          {data.tags.map((tag, index) => (
            <div key={index} className={`${index === data.tags.length - 2 && 'mr-2'}`}>
              <Tag tag={tag} />
            </div>
          ))}
        </div>
        <div className={'z-30 hidden flex-row flex-wrap justify-end space-x-i16 lg:flex'}>
          {<AwardsList awards={data.awards} />}
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'gradient-border gradient-border-bottom relative gap-i24 border-b border-dark/15 p-grid grid-subcontainer',
      )}
    >
      <div className={'col-span-4'}>
        <BigContentCard
          href='#'
          headerOutlet={<HeaderOutlet />}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className={'aspect-video w-full'}>
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
        </BigContentCard>
      </div>
      <div className={'col-span-4 flex flex-col justify-between lg:order-first'}>
        <div className={'mb-0 sm:mb-2 lg:grid lg:grid-cols-4 lg:gap-x-gap'}>
          <h3 className={clsx('relative col-span-full mb-1 w-fit pb-[2px] font-medium lg:mb-2')}>
            <Link to='#'>{data.title}</Link>
          </h3>
          <p className={'col-span-2 font-normal'}>{data.description}</p>
        </div>
        <div className={'relative hidden flex-row items-end justify-between gap-i12 pt-i24 lg:flex'}>
          {data.client && (
            <div className={'relative left-0 top-i48 inline-flex md:absolute'}>
              {data.client.map((client, index) => (
                <Client
                  key={index}
                  data={{
                    id: index,
                    name: client.name,
                    icon: client.icon,
                    bg: client.bg,
                  }}
                  size='medium'
                />
              ))}
            </div>
          )}
          <div className={'flex w-full flex-col items-end'}>
            {data.achievements &&
              data.achievements.map((achievement, index) => (
                <div
                  className='last:after:content-* flex w-full justify-end last:relative last:pt-i16 last:after:absolute last:after:right-0 last:after:top-0 last:after:block last:after:h-px last:after:w-full last:after:bg-black/15'
                  key={index}
                >
                  <div
                    key={index}
                    className={clsx('w-fit pr-i200 text-right', {
                      'first:mb-i16': data.achievements && data.achievements?.length > 1,
                    })}
                  >
                    <p className={'text-left font-medium typo-h2'}>{achievement.title}</p>
                    <p className='text-black/65'>{achievement.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
