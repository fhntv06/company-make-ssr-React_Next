'use client';

import clsx from 'clsx';
import { FunctionComponentElement } from 'react';
import { FieldError, FieldValues, UseFormRegister, Path, UseFormWatch } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';

interface Props<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  label?: string;
  register: UseFormRegister<T>;
  watch?: UseFormWatch<T>;
  error?: FieldError;
  required?: string | boolean;
  requiredMark?: boolean;
  touched?: boolean;
  pattern?: { value: RegExp; message: string };
  className?: string;
}

export default function Textarea<T extends FieldValues>({
  name,
  placeholder = '',
  label,
  register,
  watch,
  error,
  required,
  requiredMark = false,
  touched,
  pattern,
  className,
}: Props<T>): FunctionComponentElement<Props<T>> {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className={clsx('relative', className)}>
      <textarea
        className={clsx(
          'h4 w-full resize-none border-b bg-transparent pb-i32 outline-none transition-colors focus:border-white lg:min-h-[calc(119px+1em)] lg:pb-i24',
          {
            'border-accent-red': error && touched,
            'border-white/16': !error && !touched,
          },
        )}
        rows={isMobile ? 1 : undefined}
        placeholder={placeholder}
        {...register(name, { required, pattern })}
      />
      {label && watch && !watch(name)?.length && (
        <label
          className={clsx('h4 pointer-events-none absolute left-0 top-0', {
            'flex gap-x-1 after:block after:size-2 after:rounded-full after:bg-accent-red after:content-[""]':
              requiredMark,
          })}
        >
          {label}
        </label>
      )}
      {error && <p className='pt-1 text-white/64'>{error.message}</p>}
    </div>
  );
}
