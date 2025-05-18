import clsx from 'clsx';
import React, { MouseEventHandler, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: MouseEventHandler;
  style?: React.CSSProperties;
  withoutGradientBorder?: boolean;
  withoutGrid?: boolean;
  gradientTop?: boolean;
}

export default function Tr({
  className,
  withoutGradientBorder = false,
  withoutGrid = false,
  style,
  gradientTop = false,
  onClick,
  children,
}: Props) {
  return (
    <div
      className={clsx(
        {
          'items-baseline border-b border-white/16 py-grid grid-container dark:border-white md:dark:border-white/16':
            !withoutGrid,
          'gradient-border': !withoutGradientBorder,
          'gradient-border-bottom': !gradientTop && !withoutGradientBorder,
          'gradient-border-top': gradientTop && !withoutGradientBorder,
        },
        className,
      )}
      style={style}
      onClick={onClick}
      role='presentation'
    >
      {children}
    </div>
  );
}
