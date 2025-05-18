'use client';

import clsx from 'clsx';
import KinescopePlayer from '@kinescope/react-kinescope-player';
import { useIsClient } from 'usehooks-ts';
import { Ref, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { KinescopeRef } from '@/shared/lib/types';

interface Props {
  videoId: string | string[];
  playing?: boolean;
  onClick?: () => void;
  onEnded?: () => void;
  onLoaded?: () => void;
}

function YoutubeVideo({ videoId, playing, onEnded, onClick, onLoaded }: Props, ref: Ref<KinescopeRef>) {
  const [startLoading, setStartLoading] = useState<boolean>(false);

  const player = useRef<KinescopePlayer>(null);
  const isClient = useIsClient();

  const toggleState = async () => {
    if (playing) {
      await player.current?.pause();
    } else {
      await player.current?.play();
    }
  };

  const onPlay = async () => {
    await player.current?.play();
    if (onClick) {
      onClick();
    }
  };

  const onPause = async () => {
    await player.current?.pause();
    await player.current?.seekTo(0);
  };

  const onStartLoading = async () => {
    if (startLoading) return;

    await player.current?.seekTo(0);
    setStartLoading(true);
  };

  useImperativeHandle(ref, () => ({
    onStartLoading,
    onPlay,
    onPause,
  }));

  if (!isClient) {
    return null;
  }

  return (
    <div onMouseEnter={onStartLoading} onClick={toggleState} className={clsx('size-full')}>
      <KinescopePlayer
        ref={player}
        autoPlay={false}
        videoId={videoId}
        controls={false}
        onReady={onLoaded}
        onEnded={onEnded}
        muted
        preload
      />
    </div>
  );
}

export default forwardRef(YoutubeVideo);
