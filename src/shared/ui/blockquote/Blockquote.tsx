import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import { Avatar, Icon } from '..';

interface Props extends PropsWithChildren {
  author?: {
    name: string;
    description: string;
    photo: string;
  };
  className?: string;
}

export default function Blockquote({ author, className, children }: Props) {
  return (
    <blockquote
      className={clsx(
        'col-span-full -mx-grid mb-i80 mt-i24 grid grid-cols-4 gap-x-gap bg-bg-grey px-grid lg:mx-0 lg:mb-i64 lg:grid-cols-6 lg:px-0',
        { 'pb-i64 pt-i64 lg:pt-i48': !author, 'py-i64 lg:py-i24': author },
        className,
      )}
    >
      {author && (
        <div className='col-span-full flex pb-i48 lg:col-span-1 lg:pb-0 lg:pl-i24'>
          <Avatar src={author.photo} alt={author.name} />
          <div className='relative flex size-12 items-center justify-center rounded-2xl bg-white lg:size-16 lg:rounded-3xl'>
            <Icon className=' size-4 text-black lg:size-6' name='quote' />
          </div>
        </div>
      )}
      <p
        className={clsx('h3 col-span-4 lg:col-start-2', {
          'pb-i64 lg:pb-i80': author,
        })}
      >
        {children}
      </p>
      {author && (
        <footer className='col-span-full flex flex-col gap-1 lg:col-span-2 lg:col-start-1 lg:pl-i24'>
          <cite className='h4 not-italic'>{author.name}</cite>
          <span className='p text-dark'>{author.description}</span>
        </footer>
      )}
    </blockquote>
  );
}
