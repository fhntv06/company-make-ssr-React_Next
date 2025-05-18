import { useId } from 'react';
import clsx from 'clsx';

interface Props {
  label: string;
  className?: string;
}
export default function Checkbox({ label, className = '' }: Props) {
  const id = useId();

  return (
    <label htmlFor={id} className={clsx('flex cursor-pointer gap-i12', className)}>
      <input className='peer hidden' type='checkbox' id={id} />
      <div className='relative size-6 rounded-md border border-black peer-checked:border-accent-red peer-checked:bg-accent-red'></div>
      {label}
    </label>
  );
}
