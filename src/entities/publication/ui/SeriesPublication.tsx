import React from 'react';
import clsx from 'clsx';
import { Link, Slider, Tag } from '@/shared/ui';
import Image from 'next/image';
import { ISeriesPublication, Publication } from '../model/types';

interface Props {
  data: ISeriesPublication;
  showAuthor?: boolean;
  className?: string;
}

const PublicationCard = ({
  publication,
  type,
  showAuthor,
}: {
  publication: Publication;
  type: 'slider' | 'list';
  showAuthor: boolean;
}) => {
  return (
    <div key={publication.id} className={clsx('relative ', type === 'list' && ' grow basis-full')}>
      {publication.preview && (
        <div
          className={clsx(
            'relative',
            type === 'slider' && 'aspect-[400/330] max-h-[400px] w-full',
            type === 'list' && 'aspect-[450/560] max-h-[560px] min-w-full',
          )}
        >
          <Image fill objectFit='cover' src={publication.preview.url} alt={publication.name} />
        </div>
      )}
      <h4 className='mb-i24 mt-i16'>
        <Link className='stretched-link' to={'/publication'}>
          {publication.name}
        </Link>
        {publication.description && (
          <>
            {' '}
            / <span className='text-black/64'>{publication.description}</span>
          </>
        )}
      </h4>
      <div className={clsx('flex-wrap gap-x-2', type === 'list' && 'hidden', type === 'slider' && 'flex')}>
        {showAuthor && publication.author && (
          <div className='relative hidden size-8 md:block'>
            <Image fill objectFit='cover' src={publication.author.photo.url} alt={publication.author.name}></Image>
          </div>
        )}
        {publication.tags &&
          publication.tags.length &&
          publication.tags.map((tag) => <Tag key={tag.id} tag={tag} grey />)}
      </div>
    </div>
  );
};

export default function SeriesPublication({ data, showAuthor = false, className }: Props) {
  return (
    <div>
      <Slider
        pagination
        className='col-span-full mb-i48 flex w-full gap-2 pb-i80 lg:hidden'
        slideClassName='basis-[100%]'
        align={'start'}
      >
        {data.series.map((publication) => (
          <PublicationCard publication={publication} type={'slider'} showAuthor={showAuthor} key={publication.id} />
        ))}
      </Slider>
      <div
        className={clsx(
          className,
          'hidden flex-row gap-gap border-b border-light-grey pb-[calc(theme(spacing.i16)+theme(spacing.i16))] lg:flex',
        )}
      >
        {data.series.map((publication) => (
          <PublicationCard publication={publication} type={'list'} key={publication.id} showAuthor={showAuthor} />
        ))}
      </div>
    </div>
  );
}
