'use client';

import { FunctionComponentElement, PropsWithChildren, useState } from 'react';
import clsx from 'clsx';
import { Link, ElementsList } from '@/shared/ui';
import { type Client as ClientType, SiteLink } from '@/shared/lib/types';
import { Client } from '@/entities/client';
import { AnimatePresence, motion } from 'framer-motion';

interface Props extends PropsWithChildren {
  title: string;
  links: SiteLink[];
  className?: string;
}

export default function LinksCard({ title, className, links }: Props): FunctionComponentElement<Props> {
  const [clients, setClients] = useState<ClientType[] | null>();

  const onMouseEnter = (data: ClientType[] | null) => {
    setClients(data);
  };

  const onMouseLeave = () => {
    setClients(null);
  };

  return (
    <div
      className={clsx(
        'group relative flex flex-col justify-between px-grid pb-i32 pt-i24 lowercase',
        'gradient-border gradient-border-bottom',
        className,
      )}
    >
      <div className='relative mb-i64 flex justify-between'>
        <p className='h4 text-dark transition group-hover:text-black'>{title}</p>
        <AnimatePresence>
          {clients && !!clients.length && (
            <motion.div
              className='absolute right-0 inline-flex'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {clients.map((client) => (
                <Client key={client.id} data={client} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div>
        <ElementsList className='h3 flex min-h-[calc(7em+(8px*6))] flex-col justify-end gap-2'>
          {links.map((child) => (
            <Link
              to='#'
              key={child.id}
              onMouseEnter={() => onMouseEnter(child.clients ?? null)}
              onMouseLeave={onMouseLeave}
            >
              {child.title}
            </Link>
          ))}
        </ElementsList>
      </div>
    </div>
  );
}
