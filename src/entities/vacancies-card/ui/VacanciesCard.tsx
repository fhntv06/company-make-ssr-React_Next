'use client';

import clsx from 'clsx';
import { Link, ElementsList } from '@/shared/ui';
import { VacancyLink } from '@/entities/vacancies-card/types/types';

interface Props {
  title?: string;
  links: VacancyLink[];
  className?: string;
}

export default function VacanciesCard({ title, className, links }: Props) {
  return (
    <div
      className={clsx(
        'group relative flex h-full flex-col justify-between border-black pr-i24 lowercase md:border-r',
        className,
      )}
    >
      <div className='relative flex justify-between md:mb-i120'>
        <p className='h4 text-dark transition group-hover:text-black'>{title}</p>
      </div>
      <div>
        <ElementsList className='h4 flex flex-col justify-end gap-2 md:min-h-[calc(7em+(8px*6))]'>
          {links.map((child) => (
            <p key={child.id} className='h4'>
              <Link to={child.url} className={clsx({ 'text-grey': !child.active })} external={false}>
                {child?.title}
              </Link>
            </p>
          ))}
        </ElementsList>
      </div>
    </div>
  );
}
