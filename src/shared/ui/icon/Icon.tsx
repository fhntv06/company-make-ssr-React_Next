import { type IconNames } from '@/shared/ui/icon/type';

interface Props {
  name: IconNames;
  className?: string;
}

export default function Icon({ className, name }: Props) {
  return (
    <svg role='image' className={className}>
      <use xlinkHref={`/images/icons.svg#${name}`} />
    </svg>
  );
}
