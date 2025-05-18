'use client';

import { Publication } from '@/entities/publication/model/types';
import { VideoData, VideoType, IReview } from '@/shared/lib/types';
import { ContentCard, Tag } from '@/shared/ui';
import React, { useState, useMemo } from 'react';
import { YoutubeVideo, RutubeVideo, FileVideo, KinescopeVideo } from '@/entities/publication/ui/Video';

interface Props {
  data: Publication | IReview;
  withoutTitle?: boolean;
  className?: string;
  contrast?: boolean;
}

export const youtubeRe =
  /(?:https?:\/\/)?(?:(?:www\.)?(youtube(?:-nocookie)?|youtube.googleapis|youtu)\.[combe].*(?:v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|(?:youtu\.be\/))([_0-9a-z-]+)/im;

export const rutubeRe =
  /(?:https:?\/\/)?(?:www\.)?(rutube)\.ru.*(?:v\/|v=|vi=|vi\/|e\/|embed\/|video\/.*\/u\/\d+\/)([_0-9a-z-]+)/im;

export const kinescopeRe = /(?:https:?\/\/)?(?:www\.)?(kinescope)\.io\/(?:embed\/)?([_0-9a-z-]+)/im;

function checkVideoData(url: string): VideoData {
  const matches = url.match(youtubeRe) ?? url.match(rutubeRe) ?? url.match(kinescopeRe);

  if (!matches) {
    return {
      url,
      type: 'file',
    };
  }

  return {
    url: matches[0],
    videoId: matches[2],
    type: matches[1].includes('youtu') ? 'youtube' : (matches[1] as VideoType),
  };
}

export default function VideoPublication({ data, contrast = false, withoutTitle, className }: Props) {
  const [playing, setPlaying] = useState<boolean>(false);

  const onClick = () => {
    setPlaying(true);
  };

  const onEnded = () => {
    setPlaying(false);
  };

  const video = useMemo(
    () => checkVideoData(data.media ? data.media.url : ''),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.media],
  );

  let content = null;

  if (data.media) {
    switch (video.type) {
      case 'youtube':
        content = <YoutubeVideo src={video.url} onEnded={onEnded} onClick={onClick} playing={playing} />;
        break;
      case 'rutube':
        content = (
          <RutubeVideo
            src={data.media.url}
            videoId={video.videoId ?? ''}
            onClick={onClick}
            onEnded={onEnded}
            playing={playing}
          />
        );
        break;
      case 'kinescope':
        content = <KinescopeVideo videoId={video.videoId ?? ''} playing={playing} onClick={onClick} />;
        break;
      case 'file':
        content = <FileVideo src={data.media.url} onEnded={onEnded} playing={playing} onClick={onClick} />;
        break;
    }
  }

  function HeaderOutlet() {
    return (
      <div className={'grid h-fit w-full grid-cols-2 p-i24'}>
        <div className={'hidden flex-row flex-wrap justify-start gap-y-2 md:flex '}>
          {data.tags &&
            data.tags.map((tag, index) => (
              <div key={index} className={`${data.tags && index === data.tags.length - 2 && 'mr-2'}`}>
                <Tag tag={tag} />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <ContentCard
        withoutTitle={withoutTitle}
        title={data.name}
        description={data.description ?? ''}
        headerOutlet={<HeaderOutlet />}
        href={''}
        isVideo
        contrast={contrast}
      >
        <figure>
          <div className={'relative aspect-video overflow-hidden'}>{content}</div>
        </figure>
      </ContentCard>
    </div>
  );
}
