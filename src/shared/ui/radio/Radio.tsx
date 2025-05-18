import { useId } from 'react';
import clsx from 'clsx';

interface Props {
  label: string;
  name: string;
  className?: string;
}
export default function Radio({ label, className = '', name }: Props) {
  const id = useId();

  return (
    <label htmlFor={id} className={clsx('flex cursor-pointer gap-i12', className)}>
      <input className='peer hidden' type='radio' name={name} id={id} />
      <div
        className={
          'relative size-6 rounded-full border border-black peer-checked:border-accent-red peer-checked:bg-accent-red'
        }
      ></div>
      {label}
    </label>
  );
}
