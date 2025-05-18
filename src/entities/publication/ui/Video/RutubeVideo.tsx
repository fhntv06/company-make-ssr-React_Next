import React, { useRef } from 'react';
import parse from 'html-react-parser';
import { useEventListener } from 'usehooks-ts';
import { PlayButton } from '@/shared/ui';
import clsx from 'clsx';

/* eslint-disable tailwindcss/no-custom-classname */

interface Props {
  src: string;
  videoId: string;
  playing: boolean;
  onClick: () => void;
  onEnded: () => void;
}

export default function RutubeVideo({ src, videoId, onClick, onEnded, playing }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onClickHandler = () => {
    const child = ref.current?.childNodes[0] as HTMLIFrameElement | undefined;
    if (child && child.contentWindow) {
      child.contentWindow.postMessage(JSON.stringify({ type: 'player:play', data: {} }), '*');
      child.style.zIndex = '25';
      child.style.position = 'relative';
    }
    onClick();
  };

  const onEndVideo = (e: MessageEvent) => {
    if (typeof e.data !== 'string') return;
    const data = JSON.parse(e.data) as { type: string }; // Type assertion
    if (data.type === 'player:playComplete') {
      onEnded();
    }
  };

  useEventListener('message', onEndVideo);

  return (
    <div
      ref={ref}
      className={clsx(
        'relative h-full w-full ' +
          'before:content[""] before:absolute before:left-0 before:top-0 before:h-full before:w-full ' +
          'before:bg-cover before:bg-no-repeat ' +
          '*:h-full *:w-full ' +
          `before:bg-[url(https://rutube.ru/api/video/${videoId}/thumbnail?redirect=1)]`,
        playing && ' before:bg-none before:hidden ',
      )}
      style={{ backgroundImage: `url(https://rutube.ru/api/video/${videoId}/thumbnail?redirect=1)` }}
    >
      {parse(src)}
      <div
        className={clsx(
          'absolute left-0 top-0 z-[16] flex size-full items-end justify-start p-i24',
          playing && 'hidden opacity-0',
        )}
      >
        <PlayButton
          onClickButton={() => {
            onClickHandler();
          }}
          className={
            'before:absolute before:left-0 before:top-0 before:z-10 before:block before:size-full before:cursor-pointer before:content-[""]'
          }
        />
      </div>
    </div>
  );
}
