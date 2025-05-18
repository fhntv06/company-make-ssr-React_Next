import React from 'react';
import clsx from 'clsx';
import { IReview } from '@/shared/lib/types';
import { Link } from '@/shared/ui';
import Image from 'next/image';
import { VideoPublication } from '@/entities/publication';

interface Props {
  className?: string;
  review: IReview;
}

export default function ReviewCard({ review, className }: Props) {
  return (
    <div
      key={review.id}
      className={clsx(
        'col-span-4 flex size-full max-h-[908px] flex-col p-grid transition-[background-color] hover:bg-white',
        className,
      )}
    >
      <Link className='h4 mb-i48 font-medium' to={review.slug}>
        {review.name}
      </Link>
      {review.description && <p className='h3 grow'>{review.description}</p>}
      {review.person && (
        <div className='mt-i48 flex items-center gap-i16'>
          <div>
            <Image src={review.person.photo.url} alt={review.person.description} width={64} height={64} />
          </div>
          <div className='flex flex-col'>
            <span className='h4'>
              {review.person.name} {review.person.surname}
            </span>
            <span className='text-dark typo-p'>{review.person.description}</span>
          </div>
        </div>
      )}
      {review.media && <VideoPublication data={review} withoutTitle />}
    </div>
  );
}
