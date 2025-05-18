import { Person } from '@/shared/lib/types';
import { Avatar } from '@/shared/ui';
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title: string;
  people: Person[];
  linkSlot: React.ReactNode;
  white?: boolean;
  className?: string;
}

export default function ContactCard({ title, people, linkSlot, white = false, children, className }: Props) {
  return (
    <div
      className={clsx(
        'gradient-border gradient-border-bottom h-full border-b border-black p-grid transition-colors first:border-t last:border-r-0 lg:border-y lg:border-r ',
        { 'bg-white lg:bg-bg-grey': !white, 'bg-white': white },
        className,
      )}
    >
      <div className='flex h-full flex-col justify-between gap-y-i120 lg:gap-0'>
        <div className='flex justify-between'>
          <p className='h4 text-dark transition-colors group-hover:text-black'>{title}</p>
          {people && people.length && (
            <div className='hidden lg:flex'>
              {people.map((person) => (
                <Avatar key={person.id} src={person.photo.url} alt={person.name} />
              ))}
            </div>
          )}
        </div>
        {children}
        {linkSlot}
      </div>
    </div>
  );
}
