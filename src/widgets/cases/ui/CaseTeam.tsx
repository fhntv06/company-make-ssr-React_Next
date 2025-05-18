'use client';

import React, { useState } from 'react';
import { ICaseTeam } from '@/entities/case';
import { Avatar, ElementsList, Link } from '@/shared/ui';
import clsx from 'clsx';

interface Props {
  data: ICaseTeam[];
  className?: string;
}

export default function CaseTeam({ data, className }: Props) {
  const [hoveredPerson, setHoveredPerson] = useState<null | number>(null);

  return (
    <div className={clsx(className)}>
      <ElementsList
        className='flex flex-row  flex-wrap gap-y-i64 lg:block lg:space-y-i24'
        itemClassName='cursor-default basis-1/2 shrink-0'
      >
        {data.map((item, index) => (
          <div key={index} className='group typo-h4 lg:grid lg:grid-cols-4 lg:gap-x-gap'>
            <span className='col-span-2 mb-[calc(theme(spacing.i16)+theme(spacing.i16))] block font-medium lg:mb-0'>
              {item.department}
            </span>
            <ElementsList className='col-span-2' itemClassName='cursor-default'>
              {item.members.map((member, mIndex) => (
                <div key={member.id} className='flex justify-between gap-x-gap'>
                  <span>
                    <Link
                      className='col-span-1'
                      to={`/employees/${member.id}`}
                      onMouseEnter={() => {
                        setHoveredPerson(mIndex);
                      }}
                      onMouseLeave={() => {
                        setHoveredPerson(null);
                      }}
                    >
                      {member.name} {member.surname}
                    </Link>
                  </span>

                  {member.photo && (
                    <div
                      className={clsx('invisible relative hidden transition-opacity group-hover:visible lg:block', {
                        'opacity-0': hoveredPerson !== mIndex,
                        'opacity-100': hoveredPerson === mIndex && hoveredPerson !== null,
                      })}
                    >
                      <Avatar className='!absolute right-0' src={member.photo.url} alt={member.name} />
                    </div>
                  )}
                </div>
              ))}
            </ElementsList>
          </div>
        ))}
      </ElementsList>
    </div>
  );
}
