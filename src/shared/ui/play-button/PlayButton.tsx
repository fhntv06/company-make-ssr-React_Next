import { PropsWithChildren } from 'react';
import Button from '../button/Button';

interface Props extends PropsWithChildren {
  onClickButton: () => void;
  className?: string;
}

export default function PlayButton({ onClickButton, className, children }: Props) {
  return (
    <Button className={className} onClick={onClickButton} iconRight='play' theme='black'>
      {children}
    </Button>
  );
}
