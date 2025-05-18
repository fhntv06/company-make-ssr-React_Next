import { getRawNumber } from '@/shared/lib/helpers';
import { type Contact } from '@/shared/lib/types';
import { Link } from '@/shared/ui';

interface Props {
  data: Contact;
}

export default function Contact({ data }: Props) {
  return (
    <div className='col-span-2'>
      <p className='h4 pb-2'>{data.address}</p>
      <p className='h4'>
        <Link to={getRawNumber(data.phone)}>{data.phone}</Link>
      </p>
    </div>
  );
}
