import { Case } from '@/entities/case/types';
import { Link, Tag } from '@/shared/ui';
import clsx from 'clsx';
import { AwardsList } from '@/features/awards-list';
import Image from 'next/image';
import dayjs from 'dayjs';

/* eslint-disable tailwindcss/no-custom-classname */

interface Props {
  data: Case;
  className?: string;
}

export default function CaseElement({ data, className }: Props) {
  return (
    <div
      className={clsx(
        'gradient-border gradient-border-bottom group relative  border-b border-black/15 px-grid py-i24 grid-subcontainer',
        className,
      )}
    >
      <div className='col-span-2 hidden gap-x-2 lg:inline-flex'>
        {data.tags.map((t) => (
          <Tag key={t.id} tag={t} grey className='h-fit' />
        ))}
      </div>
      <div className='relative col-span-2 lg:col-span-4'>
        <h3 className='mb-2 font-medium'>
          <Link to='#'>{data.title}</Link>
        </h3>
        <p className='hidden lg:block'>{data.description}</p>
        <div className='invisible absolute right-0 top-0 z-10 hidden h-[560px] w-1/2 -translate-y-1/2 translate-x-1/2 opacity-0 transition group-hover:visible group-hover:opacity-100 lg:block'>
          <Image src={data.media.url} alt={data.title} fill objectFit='cover' />
        </div>
      </div>
      <div className='col-span-2 flex justify-end lg:col-span-1 lg:justify-stretch'>{dayjs(data.date).year()}</div>
      <div className='col-span-1 hidden justify-end lg:inline-flex'>
        <AwardsList awards={data.awards} />
      </div>
    </div>
  );
}
