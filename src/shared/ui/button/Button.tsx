'use client';

/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */

import clsx from 'clsx';
import Icon from '@/shared/ui/icon/Icon';
import Link from 'next/link';
import { IconNames } from '@/shared/ui/icon/type';
import { PropsWithChildren } from 'react';
import MagneticElement from '../magnetic-element/MagneticElement';

interface Props extends PropsWithChildren {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  iconLeft?: IconNames;
  iconRight?: IconNames;
  className?: string;
  wrapperClassName?: string;
  href?: string;
  type?: 'submit' | 'button' | 'reset';
  theme?: 'black' | 'gray' | 'white' | 'mobileDark';
  size?: 'big' | 'small';
  withoutMagnet?: boolean;
}

const distThemes = {
  black: {
    colorBg: 'bg-black bg-opacity-64',
    pseudoColorBg: 'bg-black bg-opacity-64 backdrop-blur-xl',
    colorText: 'white',
  },
  mobileDark: {
    colorBg: 'bg-[#11101C52] backdrop-blur-xl',
    pseudoColorBg: 'bg-[#11101C52] backdrop-blur-xl',
    colorText: 'white',
  },
  gray: {
    colorBg: 'bg-bg-grey',
    pseudoColorBg: 'bg-bg-grey',
    colorText: 'black',
  },
  white: {
    colorBg: 'bg-white',
    pseudoColorBg: 'bg-white',
    colorText: 'black',
  },
};

const WrapperIcon = ({ size, theme = 'white', withoutMagnet, children }: Props) => {
  const content = (
    <div
      className={clsx('relative', {
        'size-12 rounded-2xl lg:size-16 lg:rounded-3xl': size === 'big',
        'size-12 rounded-2xl': size === 'small',
      })}
    >
      <div className='relative z-10 flex size-[inherit] scale-95 items-center justify-center rounded-[inherit] group-hover:bg-white'>
        <span className='relative z-20 transition group-hover:animate-slide'>{children}</span>
      </div>
      <div
        className={clsx(
          'absolute inset-0 -z-10 size-[inherit] rounded-[inherit] group-hover:bg-main-gradient-2',
          `${distThemes[theme].pseudoColorBg}`,
        )}
      />
    </div>
  );

  return (
    <>
      {!withoutMagnet ? (
        <>
          <MagneticElement className='hidden md:block'>{content}</MagneticElement>
          <div className='block md:hidden'>{content}</div>
        </>
      ) : (
        <div>{content}</div>
      )}
    </>
  );
};

const Wrapper = ({
  href,
  iconLeft,
  iconRight,
  children,
  theme = 'white',
  size,
  withoutMagnet,
  type,
  ...props
}: Props) => {
  const child = (
    <>
      {iconLeft && (
        <WrapperIcon theme={theme} size={size} withoutMagnet={withoutMagnet}>
          <Icon
            name={iconLeft}
            className={clsx(
              `fill-${distThemes[theme].colorText} group-hover:fill-black`,
              size === 'big' ? 'size-6' : 'size-4',
            )}
          />
        </WrapperIcon>
      )}
      {children}
      {iconRight && (
        <WrapperIcon theme={theme} size={size} withoutMagnet={withoutMagnet}>
          <Icon
            name={iconRight}
            className={clsx(
              `fill-${distThemes[theme].colorText} group-hover:fill-black`,
              size === 'big' ? 'size-6' : 'size-4',
            )}
          />
        </WrapperIcon>
      )}
    </>
  );

  return href ? (
    <Link href={href} {...props}>
      {child}
    </Link>
  ) : (
    <button type={type} {...props}>
      {child}
    </button>
  );
};

const Button = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  iconLeft,
  iconRight,
  className = '',
  theme = 'white',
  size = 'big',
  type = 'button',
  children,
  wrapperClassName,
  withoutMagnet = false,
  ...props
}: Props) => (
  <Wrapper
    className={clsx('group relative z-[1] flex', { '!pl-i12': iconLeft && children }, className)}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    iconLeft={iconLeft}
    iconRight={iconRight}
    theme={theme}
    type={type}
    size={size}
    withoutMagnet={withoutMagnet}
    {...props}
  >
    {children && (
      <span
        className={clsx(
          'relative flex w-full items-center pr-i80 font-medium lowercase md:w-auto',
          'transition-spacing',
          `${distThemes[theme].colorBg}`,
          wrapperClassName,
          {
            'backdrop-blur-xl': theme === 'black',
            'pl-i48': theme === 'mobileDark',
            'h4 h-12 rounded-xl pl-i24 lg:h-16 lg:rounded-3xl': size === 'big',
            'h-12 rounded-2xl pl-i24': size === 'small',
          },
        )}
      >
        <span className={`text-${distThemes[theme].colorText} relative leading-10`}>{children}</span>
      </span>
    )}
  </Wrapper>
);

export default Button;
