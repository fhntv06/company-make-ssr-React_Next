'use client';

import { Client } from '@/entities/client';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useWebglModelStore } from '../../model/store';

interface Props {
  className?: string;
}

export default function SceneClient({ className }: Props) {
  const { currentClient, setNextModel } = useWebglModelStore();

  const changeModelHandler = () => {
    setNextModel();
  };

  const draw = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      transition: { duration: 0 },
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: 0.1,
          duration: 5,
          onComplete: changeModelHandler,
        },
        opacity: { duration: 0.01 },
      },
    },
  };

  return (
    currentClient && (
      <div className={clsx('relative inline-flex size-[80px] items-center justify-center', className)}>
        <motion.svg
          className='absolute rotate-90'
          width='80'
          height='80'
          viewBox='0 0 80 80'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          <motion.path
            key={currentClient.id}
            variants={draw}
            d='M1 40C1 28.7447 1.01415 23.3721 2.51515 19.0825C5.22898 11.3268 11.3268 5.22898 19.0825 2.51515C23.3721 1.01415 28.7447 1 40 1C51.2553 1 56.6279 1.01415 60.9175 2.51515C68.6732 5.22898 74.771 11.3268 77.4848 19.0825C78.9859 23.3721 79 28.7447 79 40C79 51.2553 78.9859 56.6279 77.4848 60.9175C74.771 68.6732 68.6732 74.771 60.9175 77.4848C56.6279 78.9859 51.2553 79 40 79C28.7447 79 23.3721 78.9859 19.0825 77.4848C11.3268 74.771 5.22898 68.6732 2.51515 60.9175C1.01415 56.6279 1 51.2553 1 40Z'
            stroke='url(#paint0_linear_5639_4426)'
            stroke-width='2'
          />
          <defs>
            <linearGradient
              id='paint0_linear_5639_4426'
              x1='1.82218e-05'
              y1='40.0005'
              x2='82.5484'
              y2='33.7714'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#1D00FF' />
              <stop offset='0.662671' stopColor='#FF3A62' />
              <stop offset='1' stopColor='#EAC8AF' />
            </linearGradient>
          </defs>
        </motion.svg>
        <Client data={currentClient} size='medium' />
      </div>
    )
  );
}
