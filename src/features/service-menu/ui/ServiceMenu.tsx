'use client';

import { Link, Modal, ElementsList } from '@/shared/ui';
import clsx from 'clsx';
import { useContrastHeader } from '@/features/header-contrast';
import { SiteLink } from '@/shared/lib/types';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { isLinkActive } from '../../../../config';

interface Props {
  serviceMenu: SiteLink[];
  opened: boolean;
  openModal: () => void;
  closeModal: () => void;
  className?: string;
  pathname: string;
}

export default function ServiceMenu({ className = '', serviceMenu, opened, openModal, closeModal, pathname }: Props) {
  const { setIsContrast } = useContrastHeader();

  const [currentSubmenu, setCurrentSubmenu] = useState<SiteLink[]>(
    serviceMenu[0].children?.filter((item) => !item.special) ?? [],
  );
  const [specialLink, setSpecialLink] = useState<SiteLink | null>(
    serviceMenu[0].children?.find((item) => item.special) ?? null,
  );
  const [activeService, setActiveService] = useState<number>(serviceMenu[0].id);

  const onMouseEnter = (link: SiteLink) => {
    setCurrentSubmenu(link.children?.filter((item) => !item.special) ?? []);
    setSpecialLink(link.children?.find((item) => item.special) ?? null);
    setActiveService(link.id);
  };

  useEffect(() => {
    setIsContrast(opened);

    if (!opened) {
      setActiveService(1);
      const special = serviceMenu[0].children?.find((item) => item.special) ?? null;
      const childMenu = serviceMenu[0].children?.filter((item) => !item.special) ?? [];
      setCurrentSubmenu(childMenu);
      setSpecialLink(special);
    }
  }, [opened, setIsContrast, serviceMenu]);

  return (
    <>
      <Link
        to='/services'
        underline={isLinkActive('/services', pathname)}
        className={clsx('h4 relative size-fit cursor-pointer', className)}
        onMouseEnter={openModal}
      >
        услуги и решения
      </Link>
      <Modal
        mode='top'
        open={opened}
        onClose={closeModal}
        className='z-40'
        contentClassName='h-[50vh]'
        wrapperClassName='pt-i80 pb-i32 text-white grid-subcontainer h-full'
        withoutCloseButton
        closeByMouseLeave
      >
        {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
        <div className='col-span-full col-start-3 grid grid-cols-subgrid border-t border-t-white border-opacity-16 pt-i24'>
          <ul className='col-span-2 gap-y-2'>
            {serviceMenu.map((item) => (
              <li
                key={item.id}
                onMouseEnter={() => onMouseEnter(item)}
                className={clsx(
                  'h3 base-link w-fit cursor-pointer text-white transition-[background-size,opacity]',
                  activeService === item.id ? 'bg-[length:100%_1px] opacity-100' : 'opacity-64',
                )}
              >
                {item.title}
              </li>
            ))}
          </ul>
          <AnimatePresence>
            {!!currentSubmenu.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: {} }}
                transition={{ duration: 0.15, delay: 0.3 }}
                className='col-span-2'
              >
                <ElementsList className='flex h-full flex-col gap-y-2' itemClassName='w-fit has-[.special]:mt-auto'>
                  {currentSubmenu.map((item) => (
                    <Link key={item.id} to={item.href} className='h4 !transition-[background-size,opacity]'>
                      {item.title}
                    </Link>
                  ))}
                  {specialLink && (
                    // eslint-disable-next-line tailwindcss/no-custom-classname
                    <Link to={specialLink.href} className='h4 special text-white !transition-[background-size,opacity]'>
                      {specialLink.title}
                    </Link>
                  )}
                </ElementsList>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>
    </>
  );
}
