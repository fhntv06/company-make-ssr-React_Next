'use client';

import { useState } from 'react';
import { Award as AwardType } from '@/entities/case/types';
import { Award } from '@/entities/award';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  awards: AwardType[];
  awardClassName?: string;
}
export default function AwardsList({ awards, awardClassName }: Props) {
  const [hoveredAwardIndex, setHoveredAwardIndex] = useState<number | undefined>();

  return (
    <div className={'flex h-fit flex-row items-center gap-2'}>
      {awards.map((award, index) => (
        <div
          key={index}
          onMouseOver={() => setHoveredAwardIndex(index)}
          onMouseLeave={() => setHoveredAwardIndex(undefined)}
        >
          <AnimatePresence key={index}>
            <motion.div
              animate={{
                scale: hoveredAwardIndex === index || hoveredAwardIndex === undefined ? 1 : 0.5,
              }}
            >
              <Award awardClassName={awardClassName} award={award} />
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
