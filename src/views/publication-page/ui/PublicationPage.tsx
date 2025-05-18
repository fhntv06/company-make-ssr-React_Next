import { Publication } from '@/entities/publication/model/types';
import { Cord, PageHeader, Tag, ToTopButton, SeeMore } from '@/shared/ui';
import React from 'react';
import htmlParser from 'html-react-parser';
import Image from 'next/image';
import { SocialNetworksIconList } from '@/widgets/social-networks';
import { PublicationContentBlocks } from '@/widgets/content-blocks';
import PageTransition from '@/shared/ui/page-transition/PageTransition';

interface Props {
  data: Publication;
}

export default function PublicationPage({ data }: Props) {
  return (
    <PageTransition>
      <main className='grid-container' id='page-start'>
        <PageHeader
          withBackLink
          title={htmlParser(data.name) as string}
          titleClassName='h2 !text-left !mb-[calc(theme(spacing.i16)+theme(spacing.i16))]'
        />
        <Cord className='col-span-full -mx-grid mb-[calc(theme(spacing.i16)+theme(spacing.i16))]' />
        <div className='col-span-full grid-subcontainer'>
          <div className='col-span-full lg:col-span-2'>
            <div className='flex h-full flex-col'>
              <div className='h-full'>
                <div className='sticky top-40 mb-[calc(theme(spacing.i16)+theme(spacing.i16))] grid-subcontainer lg:mb-0 lg:block'>
                  <div className='col-span-full mb-i120 flex flex-wrap'>
                    {data.tags && data.tags.map((tag) => <Tag key={tag.id} grey tag={tag} />)}
                  </div>
                  {data.author && (
                    <div className='col-span-3 flex gap-i16 lg:flex-col'>
                      <div className='relative size-12 lg:size-16'>
                        <Image src={data.author.photo.url} fill objectFit='cover' alt={data.author.description} />
                      </div>
                      <div className='flex flex-col justify-between lg:mb-i120 lg:justify-stretch'>
                        <span className='h4'>
                          {data.author.name} {data.author.surname}
                        </span>
                        <span className='p text-dark'>{data.author.description}</span>
                      </div>
                    </div>
                  )}
                  {data.social_networks && data.social_networks.length && (
                    <SocialNetworksIconList
                      className='flex-wrap justify-end lg:justify-stretch'
                      data={data.social_networks}
                    />
                  )}
                </div>
              </div>
              <ToTopButton className='sticky bottom-grid mt-auto hidden w-fit lg:block' />
            </div>
          </div>
          <div className='col-span-full lg:col-span-6'>
            <PublicationContentBlocks data={data.content_blocks} />
          </div>
        </div>
        <SeeMore className='mt-i200' title='читайте также' />
      </main>
    </PageTransition>
  );
}
