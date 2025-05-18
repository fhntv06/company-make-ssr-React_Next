import { useEffect } from 'react';
import { Icon, Modal } from '@/shared/ui';
import clsx from 'clsx';
import DesktopBurgerMenu from './DesktopBurgerMenu';
import { CommonProps } from '../model/types';
import MobileBurgerMenu from './MobileBurgerMenu';

interface Props extends CommonProps {
  opened: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export default function BurgerMenu({
  menus,
  isContrast,
  contacts,
  socialNetworks,
  contactPersons,
  additionalMenu,
  opened,
  openModal,
  closeModal,
  pathname,
}: Props) {
  useEffect(() => {
    if (opened) {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <button onClick={openModal} className='h4 relative order-last col-span-1 size-fit justify-self-end lg:order-none'>
        <Icon
          name='burger'
          className={clsx('size-8 dark:fill-white', isContrast ? 'fill-white opacity-64' : 'fill-black')}
        />
      </button>
      <Modal
        mode='top'
        open={opened}
        onClose={closeModal}
        className='z-[70]  text-white'
        wrapperClassName='py-grid text-white grid-subcontainer h-full'
        withoutSpacing
      >
        <DesktopBurgerMenu
          menus={menus}
          isContrast={isContrast}
          contacts={contacts}
          socialNetworks={socialNetworks}
          contactPersons={contactPersons}
          additionalMenu={additionalMenu}
          pathname={pathname}
        />
        <MobileBurgerMenu
          menus={menus}
          isContrast={isContrast}
          contacts={contacts}
          socialNetworks={socialNetworks}
          contactPersons={contactPersons}
          additionalMenu={additionalMenu}
          pathname={pathname}
        />
      </Modal>
    </>
  );
}
