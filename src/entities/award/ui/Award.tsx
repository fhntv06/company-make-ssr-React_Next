'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { Award as AwardType } from '@/entities/case/types';
import { ShowHint } from '@/features/show-hint';

interface Props {
  award: AwardType;
  mask?: boolean;
  className?: string;
  awardClassName?: string;
}

export default function Award({ award, mask, className, awardClassName }: Props) {
  return (
    <ShowHint
      className={className}
      hintDescription={
        <div className={'whitespace-nowrap text-center text-white'}>
          <p className={'font-medium'}>{award.title}</p>
          <p>{award.description}</p>
        </div>
      }
    >
      {award.svg ? (
        <div className={clsx('size-full', awardClassName)}>
          <Image
            src={award.svg.url}
            alt={award.svg.name || ''}
            width={award.svg.size}
            height={award.svg.size}
            style={{ fill: award.color }}
          />
        </div>
      ) : (
        <div
          className={clsx('size-4 rounded-[50%] lg:size-8', { 'lg:dprofile-clip-path': mask }, awardClassName)}
          style={{ backgroundColor: award.color }}
        />
      )}
    </ShowHint>
  );
}
