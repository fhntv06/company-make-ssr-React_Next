import { VideoPublication } from '@/entities/publication';
import { IReview } from '@/shared/lib/types';
import { Avatar, Link } from '@/shared/ui';
import clsx from 'clsx';
import React from 'react';

interface Props {
  data: IReview;
  className?: string;
}

export default function ReviewBigCard({ data, className }: Props) {
  const renderAuthor = () => (
    <>
      {data.person && (
        <div className='mb-i64 flex gap-i24'>
          <Avatar src={data.person.photo.url} alt={data.person.name} />
          <p className='flex flex-col justify-between'>
            <span className='typo-h4'>
              {data.person.surname} {data.person.name}
            </span>
            <span className='text-dark typo-p'>{data.person.description}</span>
          </p>
        </div>
      )}
    </>
  );

  const renderLinks = () => (
    <>
      {data.pdf && (
        <p className='flex flex-col gap-y-2 typo-h4'>
          <Link to={data.pdf}>скачать pdf</Link>
          <Link to={`/reviews/${data.id}`}>весь отзыв</Link>
        </p>
      )}
    </>
  );

  return (
    <div
      className={clsx(
        'gradient-border gradient-border-bottom border-y border-black bg-bg-grey py-i32 grid-subcontainer',
        className,
      )}
    >
      <div className='col-span-full lg:col-span-2'>
        {renderAuthor()}
        <div className='hidden lg:block'>{renderLinks()}</div>
      </div>
      <div className='col-span-full lg:col-span-6'>
        <p className='h2 mb-i64'>{data.description}</p>
        {data.media && <>{data.media.type === 'video' && <VideoPublication data={data} withoutTitle />}</>}
      </div>
      <div className='col-span-full mt-i80 lg:hidden'>{renderLinks()}</div>
    </div>
  );
}
