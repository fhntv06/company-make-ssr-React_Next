'use client';

import ReactPlayer from 'react-player/youtube';
import { useIsClient } from 'usehooks-ts';
import { PlayButton } from '@/shared/ui';
import clsx from 'clsx';

interface Props {
  src: string;
  playing: boolean;
  onClick: () => void;
  onEnded?: () => void;
}

const config = {
  playerVars: {
    playsinline: 1,
    controls: 1,
    showinfo: 1,
  },
};

export default function YoutubeVideo({ src, onClick, playing, onEnded }: Props) {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <div className={clsx('size-full', playing && 'relative z-[25]')}>
      <ReactPlayer
        url={src}
        width='100%'
        height='100%'
        onEnded={onEnded}
        playing={playing}
        onClickPreview={onClick}
        config={config}
        light={true}
        playsinline
        playIcon={
          <div className={'absolute bottom-i24 left-i24 z-[16]'}>
            <PlayButton onClickButton={onClick} />
          </div>
        }
      />
    </div>
  );
}
