'use client';

import { useState, useId, useEffect, useCallback } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { create } from 'zustand';

interface Options {
  forceClose?: boolean;
}

const useModalStore = create<{ activeModal: string | null; setActiveModal: (id: string | null) => void }>((set) => ({
  activeModal: null,
  setActiveModal(id: string | null) {
    set((state) => ({
      ...state,
      activeModal: id,
    }));
  },
}));

export default function useModal({ forceClose }: Options = { forceClose: false }) {
  const [opened, setOpened] = useState<boolean>(false);
  const id = useId();
  const { activeModal, setActiveModal } = useModalStore();

  const openModal = () => {
    disableBodyScroll(document.body, { reserveScrollBarGap: true });
    setOpened(true);
    setActiveModal(id);
  };

  const closeModal = useCallback(() => {
    enableBodyScroll(document.body);
    setOpened(false);
  }, []);

  useEffect(() => {
    if (activeModal !== id && forceClose) setOpened(false);

    if (activeModal === id && !opened) setActiveModal(null);
  }, [activeModal, id, forceClose, closeModal, setActiveModal, opened]);

  return { opened, openModal, closeModal, id };
}
