'use client';

import clsx from 'clsx';
import { FunctionComponentElement } from 'react';
import { FieldError, FieldValues, UseFormRegister, UseFormWatch, Path } from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  label?: string;
  type?: string;
  register?: UseFormRegister<T>;
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
  type = 'text',
  register,
  watch,
  error,
  required,
  requiredMark,
  touched,
  pattern,
  className,
}: Props<T>): FunctionComponentElement<Props<T>> {
  return (
    <div className={clsx('relative', className)}>
      <input
        className={clsx(
          'h4 w-full resize-none border-b bg-transparent pb-i32 outline-none transition-colors focus:border-white  lg:pb-i24',
          {
            'border-accent-red': error && touched,
            'border-white/16': !error && !touched,
          },
        )}
        placeholder={placeholder}
        type={type}
        {...(register && register(name, { required, pattern }))}
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
      {error && touched && <p className='pt-1 text-white/64'>{error.message}</p>}
    </div>
  );
}
