import { Tag as TagType } from '@/shared/lib/types';
import React, { useMemo } from 'react';
import { Tag, Link, ElementsList } from '..';

interface Props {
  tags: TagType[];
  className?: string;
}

export default function BlocksHeader({ tags, className }: Props) {
  const firstTwoTags = useMemo(() => [tags[0], tags[1]], [tags]);
  const remainingTags = useMemo(() => tags.slice(2), [tags]);

  return (
    <div className={`col-span-full grid-cols-8 grid-container ${className}`}>
      <div className='col-span-4 grid grid-cols-4 gap-x-6'>
        <div className='col-span-full flex flex-col'>
          <p className='h3 col-span-full mb-i64 flex auto-rows-max text-white'>
            12 лет создаём, продвигаем и поддерживаем цифровые продукты любого масштаба: сайты, приложения, сервисы,
            игры. основные юниты — продуктовый и рекламный
          </p>
          <div className='col-span-full flex flex-col text-white'>
            <ElementsList itemClassName='w-fit'>
              <Link to='#' className='mb-2'>
                как мы работаем
              </Link>
              <Link to='#'>презентация</Link>
            </ElementsList>
          </div>
        </div>
      </div>
      <div className='col-span-4  hidden grid-cols-4 lg:grid'>
        <div className='col-span-2 col-start-3 flex flex-col justify-self-end'>
          <p className='pb-i16 text-white'>особые отраслевые экспертизы </p>
          <div className='mb-i24 flex flex-wrap gap-2'>
            {firstTwoTags.map((item: TagType) => (
              <Tag key={item.id} tag={item} />
            ))}
          </div>
          <div className='flex flex-wrap gap-2'>
            {remainingTags.map((item: TagType) => (
              <Tag key={item.id} tag={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
