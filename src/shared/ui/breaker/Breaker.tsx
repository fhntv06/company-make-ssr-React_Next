import clsx from 'clsx';

interface Props {
  className?: string;
}

export default function Breaker({ className }: Props) {
  return (
    <div
      className={clsx(
        'relative col-span-full h-px after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-white after:content-[""]',
        className,
      )}
    />
  );
}
