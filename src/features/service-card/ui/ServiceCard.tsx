'use client';

import { type ServiceCard } from '@/shared/lib/types';
import React, { useState, useMemo } from 'react';
import { Link, ElementsList } from '@/shared/ui';
import { Client } from '@/entities/client';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  service: ServiceCard;
  className?: string;
}

export default function ServiceCard({ service, className = '' }: Props) {
  const [linkHoverIndex, setLinkHoverIndex] = useState<number>(-1);
  const hovered = linkHoverIndex >= 0;

  const links = useMemo(
    () => ({
      internal: service.links.filter((item) => !item.special),
      external: service.links.filter((item) => item.special),
    }),
    [service],
  );

  const mouseEnterHandler = (index: number) => {
    setLinkHoverIndex(index);
  };

  const mouseLeaveHandler = () => {
    setLinkHoverIndex(-1);
  };

  return (
    <div
      key={service.id}
      className={clsx(
        'relative col-span-full gap-y-i32 border-black/15 py-i24 grid-container lg:border-b',
        'gradient-border gradient-border-top',
        className,
      )}
      onMouseLeave={mouseLeaveHandler}
    >
      <span className='h3 col-span-2 hidden font-medium lg:block'>{service.title}</span>
      <div className='col-span-full lg:col-span-2'>
        {!!links.internal.length && (
          <ElementsList className='h4 space-y-2'>
            {links.internal.map((link, index) => (
              <Link
                key={link.id}
                to={link.href}
                onMouseEnter={() => {
                  mouseEnterHandler(index);
                }}
                className='max-[1194px]:base-link-hover'
              >
                {link.title.toLowerCase()}
              </Link>
            ))}
          </ElementsList>
        )}
        {!!links.external.length && (
          <ElementsList className='h4 mt-i32 space-y-2'>
            {links.external.map((link, index) => (
              <Link
                key={link.id}
                to={link.href}
                onMouseEnter={() => {
                  mouseEnterHandler(links.internal.length + index);
                }}
                onMouseLeave={mouseLeaveHandler}
                iconName='arrow-up-right-16'
              >
                {link.title.toLowerCase()}
              </Link>
            ))}
          </ElementsList>
        )}
      </div>

      <AnimatePresence>
        {hovered && service.links[linkHoverIndex].description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className='col-span-2 lg:col-start-5'
          >
            {service.links[linkHoverIndex].description}
          </motion.p>
        )}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className='col-span-full flex justify-end lg:col-span-2 lg:col-start-7'
        >
          {hovered &&
            !!service.links[linkHoverIndex].clients &&
            !!service.links[linkHoverIndex].clients!.length &&
            service.links[linkHoverIndex].clients!.map((client) => (
              <li key={client.id}>
                <Client data={client} />
              </li>
            ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
