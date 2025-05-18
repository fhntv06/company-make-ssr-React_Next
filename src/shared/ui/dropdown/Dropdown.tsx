'use client';

/* eslint-disable tailwindcss/no-custom-classname */

import { FunctionComponentElement, useState } from 'react';
import clsx from 'clsx';
import Icon from '@/shared/ui/icon/Icon';
import { DropDownItem } from '@/shared/model/dropdown/types';

interface Props {
  items: DropDownItem[];
  defaultPlaceholder?: string;
  className?: string;
  selected: DropDownItem | null;
  setSelected: (item: DropDownItem) => void;
}

export default function Dropdown({
  items,
  defaultPlaceholder,
  className = '',
  selected,
  setSelected,
}: Props): FunctionComponentElement<Props> {
  const [opened, setOpened] = useState<boolean>(false);

  const placeholder = defaultPlaceholder ?? 'Выберите вариант';

  const onClick = () => {
    setOpened((prevState) => !prevState);
  };

  const onSelectItem = (item: DropDownItem) => {
    setSelected(item);
    setOpened(false);
  };

  return (
    <div className={clsx('group relative', className)}>
      <div
        onClick={onClick}
        className={clsx(
          { '!border-black !text-black': opened || Boolean(selected) },
          'group-hover:border-gray text-gray border-light-gray flex cursor-pointer justify-between border p-i16 transition group-hover:text-black',
        )}
      >
        {selected?.label ?? placeholder}
        <Icon name='dropdown' className={clsx('size-6 transition', { 'rotate-180': opened })} />
      </div>
      <ul
        className={clsx(
          'border-light-gray absolute w-full origin-top scale-y-0 border bg-white py-i16 shadow-lg transition',
          { 'scale-y-100': opened },
        )}
      >
        {items.map((item) => (
          <li
            className={clsx(
              'mb-2 cursor-pointer px-i16 py-2 opacity-0 transition last:mb-0 hover:bg-accent-red hover:text-white',
              { 'opacity-100': opened, 'delay-500': !opened },
            )}
            key={item.value}
            onClick={() => onSelectItem(item)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
