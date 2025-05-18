'use client';

import { CompanyGroup as ICompanyGroup } from '@/shared/lib/types';
import { Showreel } from '@/entities/showreel';
import React, { useState } from 'react';
import clsx from 'clsx';
import { ExpandableContainer, Icon, Link, ElementsList } from '@/shared/ui';
import { Client } from '@/entities/client';

interface Props {
  companyGroups: ICompanyGroup[];
}

export default function CompanyGroup({ companyGroups }: Props) {
  const [selectedShowreel, setSelectedShowreel] = useState<number | null>(0);
  const [isShowreelHovered, setIsShowreelHovered] = useState<boolean>(false);
  const [showreelKey, setShowreelKey] = useState(0);

  const transformUrl = (url: string) => {
    let withoutProtocol = url.replace(/(^\w+:|^)\/\//, '');

    const slashIndex = withoutProtocol.indexOf('/');
    if (slashIndex !== -1) {
      withoutProtocol = withoutProtocol.substring(0, slashIndex);
    }

    return withoutProtocol;
  };

  const Header = () => {
    return (
      <div className='col-span-full grid-container'>
        <div className='col-span-4'>
          <ElementsList className='gap-y-2'>
            {companyGroups.map(
              (company, index) =>
                company.type === 1 && (
                  <p
                    onClick={() => {
                      setSelectedShowreel(index);
                      setShowreelKey((prevState) => prevState + 1);
                    }}
                    onMouseEnter={() => setIsShowreelHovered(true)}
                    onMouseLeave={() => setIsShowreelHovered(false)}
                    key={company.id}
                    className={clsx(
                      'h3 font-medium',
                      selectedShowreel === index ? 'text-white' : 'text-white/64',
                      isShowreelHovered && 'text-white',
                    )}
                  >
                    {company.title}
                  </p>
                ),
            )}
          </ElementsList>
          <ElementsList className='mt-i64 gap-y-2'>
            {companyGroups.map(
              (company) =>
                company.type === 2 && (
                  <div key={company.id}>
                    <Link to='/' className={clsx('h4 text-white')}>
                      {company.title}
                    </Link>
                  </div>
                ),
            )}
          </ElementsList>
        </div>
        <div className='col-span-4'>
          <p className='h3 text-white'>{companyGroups[selectedShowreel ?? 0].description}</p>
          {companyGroups[selectedShowreel ?? 0].link && (
            <Link to={companyGroups[selectedShowreel ?? 0].link ?? ''} className='h4 mt-i64 block text-white'>
              {transformUrl(companyGroups[selectedShowreel ?? 0].link ?? '')}
            </Link>
          )}
        </div>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className='col-span-full px-grid'>
        <div className='relative -mx-grid mb-i24 px-i24 pb-i24 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-white'>
          <p className='h4 font-medium text-white'>предложить идею для бизнеса</p>
        </div>
        <div className={'col-span-full mb-i120 grid-subcontainer'}>
          <div className='col-span-2'>
            <Client
              data={{
                id: 0,
                name: 'Андрей Титаев',
                icon: '/images/employees/make4.png',
              }}
              size={'large'}
            />
          </div>
          <div className='col-span-4'>
            <p className='h3 text-white'>
              мы всегда ищем свежих идеи и направления — наращиваем арсенал инструментов и услуг для решения задач наших
              клиентов
            </p>
          </div>
          <div className='col-span-2'>
            <div className='flex flex-col space-y-2'>
              <Link to={'mailto:start@make.st'} external={false} className='h4 text-white'>
                start@make.st
              </Link>
              <Link to={''} external={false} className='h4 text-white'>
                написать в телеграм
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='bg-dark lg:hidden'>
        {companyGroups.map(
          (company, index) =>
            company.type === 1 && (
              <div key={index} className='bg-dark'>
                {selectedShowreel !== index && (
                  <div className='p-i16 grid-container'>
                    <button
                      onClick={() => setSelectedShowreel(index)}
                      className='h3 col-span-full flex w-full items-center justify-between font-medium text-white'
                    >
                      {company.title}
                      <Icon name='plus' className='ml-2 size-6 fill-white' />
                    </button>
                  </div>
                )}

                <ExpandableContainer open={index === selectedShowreel} className={''}>
                  <Showreel
                    withoutButton
                    className='px-grid'
                    key={showreelKey}
                    media={{
                      type: companyGroups[selectedShowreel ?? 0].media.type,
                      url: companyGroups[selectedShowreel ?? 0].media.url,
                    }}
                    header={
                      <div className='col-span-full'>
                        <button
                          onClick={() => setSelectedShowreel(null)}
                          className='h3 mb-i16 flex w-full items-center justify-between font-medium text-white'
                        >
                          {company.title}
                          <Icon name='cross' className='ml-2 size-6 fill-white' />
                        </button>
                        <p className='mb-i24 text-white'>{company.description}</p>
                        <Link
                          to={companyGroups[selectedShowreel ?? 0].link ?? ''}
                          className='h4 mt-i64 block text-white'
                        >
                          {transformUrl(companyGroups[selectedShowreel ?? 0].link ?? '')}
                        </Link>
                      </div>
                    }
                    preview={'/images/showrel.jpg'}
                  />
                </ExpandableContainer>
              </div>
            ),
        )}
        <div className='mt-i24 pb-i48 grid-container '>
          {companyGroups.map(
            (company, index) =>
              company.type === 2 && (
                <Link to={companyGroups[index].link ?? ''} className='h4 col-span-full block text-white' key={index}>
                  {transformUrl(companyGroups[index].link ?? '')}
                </Link>
              ),
          )}
        </div>
        <div className='bg-dark pb-i168 grid-container'>
          <div className='relative col-span-full mb-i32'>
            <p className='h4 font-medium text-white'>предложить идею для бизнеса</p>
            <div className='relative -mx-grid mt-i16 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-white' />
          </div>
          <p className='h3 col-span-full mb-i24 text-white'>
            мы всегда ищем свежих идеи и направления — наращиваем арсенал инструментов и услуг для решения задач наших
            клиентов
          </p>
          <div className='col-span-full flex flex-col space-y-2'>
            <Link to={'mailto:start@make.st'} external={false} className='h4 text-white'>
              start@make.st
            </Link>
            <Link to={''} external={false} className='h4 text-white'>
              написать в телеграм
            </Link>
          </div>
        </div>
      </div>
      <Showreel
        className='!hidden lg:!grid'
        withoutButton
        key={showreelKey}
        media={{
          type: companyGroups[selectedShowreel ?? 0].media.type,
          url: companyGroups[selectedShowreel ?? 0].media.url,
        }}
        header={<Header />}
        footer={<Footer />}
        preview={'/images/showrel.jpg'}
      />
    </>
  );
}
