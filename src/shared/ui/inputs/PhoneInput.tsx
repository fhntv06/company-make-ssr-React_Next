'use client';

import clsx from 'clsx';
import { FunctionComponentElement } from 'react';
import { FieldError, FieldValues, UseFormRegister, Path, Controller, Control, UseFormWatch } from 'react-hook-form';
import InputMask from 'react-input-mask';

interface Props<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  label?: string;
  register?: UseFormRegister<T>;
  watch?: UseFormWatch<T>;
  error?: FieldError;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<T, any>;
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
  watch,
  register,
  control,
  error,
  required,
  requiredMark = false,
  touched,
  pattern,
  className,
}: Props<T>): FunctionComponentElement<Props<T>> {
  return (
    <div className={clsx('relative', className)}>
      <Controller
        name={name}
        control={control}
        render={() => {
          return (
            <InputMask
              className={clsx(
                'h4 w-full resize-none border-b border-white/16 bg-transparent pb-i32 outline-none focus:border-white  lg:pb-i24',
              )}
              placeholder={placeholder}
              type='tel'
              mask='+7 (999) 999-99-99'
              {...(register && register(name, { required, pattern }))}
            />
          );
        }}
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
