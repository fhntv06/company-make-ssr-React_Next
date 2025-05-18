import { Publication } from '@/entities/publication/model/types';
import { Link, Tag } from '@/shared/ui';
import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  data: Publication;
  showAuthor?: boolean;
  className?: string;
}

export default function MainPublication({ data, showAuthor = false, className }: Props) {
  return (
    <div className={clsx('relative -mx-grid border-t border-light-grey px-grid', className)}>
      {data.preview && (
        <div className='relative mb-i16 aspect-video max-h-[560px]'>
          <Image fill objectFit='cover' src={data.preview.url} alt={data.name} />
        </div>
      )}
      <h3 className='inline font-medium lowercase'>
        <Link className='stretched-link' to={'/publication'}>
          {data.name}
        </Link>
        <span className='font-normal text-dark'> {data.description}</span>
      </h3>
      <div className='mt-i24 hidden flex-wrap gap-x-2 md:flex'>
        {showAuthor && data.author && (
          <div className='relative hidden size-8 md:block'>
            <Image fill objectFit='cover' src={data.author.photo.url} alt={data.author.name}></Image>
          </div>
        )}
        {data.tags && data.tags.length && data.tags.map((tag, index) => <Tag tag={tag} key={index} grey />)}
      </div>
    </div>
  );
}
