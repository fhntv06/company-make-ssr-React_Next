import ReactPlayer from 'react-player/file';
import { useIsClient } from 'usehooks-ts';
import { PlayButton } from '@/shared/ui';
import clsx from 'clsx';

interface Props {
  src: string;
  playing: boolean;
  onClick: () => void;
  onEnded?: () => void;
  isControlsShown?: boolean;
}

export default function FileVideo({ src, playing, onEnded, onClick, isControlsShown = true }: Props) {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <div className={clsx('size-full', playing && 'relative z-[25]')}>
      <ReactPlayer
        width='100%'
        height='100%'
        url={src}
        playing={playing}
        controls={playing && isControlsShown}
        playsinline
        onEnded={onEnded}
      />
      <div className={'absolute bottom-i24 left-i24 z-[16]'}>
        {isControlsShown && <PlayButton onClickButton={onClick} />}
      </div>
    </div>
  );
}
