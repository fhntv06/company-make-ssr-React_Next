'use client';

import { ChangeEvent, FunctionComponentElement, PropsWithChildren, useState } from 'react';
import clsx from 'clsx';
import { FieldError, FieldValues, Path, PathValue, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import Icon from '../icon/Icon';
import { checkIsFileValid, convertFileToSend } from '../../lib/file-helpers-functions';

interface FileType {
  name: string;
  file: string;
}

interface Props<T extends FieldValues> extends PropsWithChildren {
  name: Path<T>;
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  error?: FieldError;
  setError: UseFormSetError<T>;
  setValue: UseFormSetValue<T>;
  value: string;
}

export default function FileInput<T extends FieldValues>({
  name,
  className,
  wrapperClassName,
  error,
  setError,
  setValue,
  value,
}: Props<T>): FunctionComponentElement<Props<T>> {
  const [file, setFile] = useState<FileType | null>(null);
  function addFileHandler(e: ChangeEvent<HTMLInputElement>) {
    if (checkIsFileValid(e) && e.target.files) {
      convertFileToSend(e.target.files[0])
        .then((result) => {
          setFile(result);
          setValue(name, result?.file as PathValue<T, Path<T>>);
          setError(name, '' as PathValue<T, Path<T>>);
        })
        .catch((errors) => console.log(errors));
    } else {
      setError(name, {
        type: 'manual',
        message: '— pdf, не более 2 мб',
      });
      setFile(null);
      setValue(name, '' as PathValue<T, Path<T>>);
    }
  }

  return (
    <div className={clsx('flex flex-col', className)}>
      <div className={clsx('relative flex items-center has-[:focus]:before:opacity-100', wrapperClassName)}>
        {value && file?.name ? (
          <div className='relative flex cursor-pointer items-center'>
            <p className='h4 mr-i16 text-grey'>{file.name}.pdf</p>
            <button className='group' onClick={() => setFile(null)}>
              <Icon name='cross' className='size-6 fill-grey transition-colors group-hover:fill-white' />
            </button>
          </div>
        ) : (
          <div className='relative flex flex-wrap items-center'>
            <p className='h4 mr-2 text-white underline decoration-dotted underline-offset-8'>прикрепить файл</p>
            <span className='h4 text-grey'>— pdf, не более 5 мб</span>
            <input
              type='file'
              onChange={addFileHandler}
              accept='.pdf'
              className='absolute left-0 top-0 z-20 size-full cursor-pointer opacity-0 file:size-0'
            />
          </div>
        )}
      </div>
      {error && <span className='p text-grey'>{error.message}</span>}
    </div>
  );
}
