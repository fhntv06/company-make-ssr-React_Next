import React from 'react';
import { Showreel } from '@/entities/showreel';
import InfographicsScreen from '@/widgets/infographics-screen/ui/InfographicsScreen';
import { BlocksHeader, Infographics } from '@/shared/ui';
import { Tag as TagType } from '@/shared/lib/types';

interface Props {
  tags: TagType[];
}

const MainInfographicsScreen = ({ tags }: Props) => (
  <>
    <Showreel
      playButton
      media={{ type: 'video', url: 'https://kinescope.io/embed/6fDTjWAubgzmt7ADqh1SXU' }}
      header={<BlocksHeader tags={tags} />}
      preview={'/images/showrel.jpg'}
      footer={
        <div className='px-grid'>
          <Infographics toNumber={50} text='специалистов' postfix='+' />
        </div>
      }
    />
    <InfographicsScreen />
  </>
);

export default MainInfographicsScreen;
