import { Publication } from '@/entities/publication/model/types';
import { Link, Tag } from '@/shared/ui';
import clsx from 'clsx';

interface Props {
  data: Publication;
  className?: string;
}

export default function SmallPublication({ data, className }: Props) {
  return (
    <div
      className={clsx(
        'relative grid grid-cols-4 gap-x-i24 border-b border-b-light-grey p-grid last:mb-0 lg:pl-0 lg:pr-0' +
          ' hover:gradient-border hover:gradient-border-bottom hover:w-[calc(100%-theme(spacing.i24))]',
        className,
      )}
    >
      <div className='col-span-full mb-i24 lg:col-span-3 lg:mb-0'>
        <Link to={`/publications/${data.slug}`}>
          <h4 className='inline'>{data.name}</h4>
        </Link>
      </div>
      <div className='col-span-full flex lg:col-span-1 lg:justify-end'>
        {data.tags && !!data.tags.length && <Tag tag={data.tags[0]} grey />}
      </div>
    </div>
  );
}
