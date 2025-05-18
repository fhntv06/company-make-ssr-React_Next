import { Infographics, Breaker, ClientHeader, Table, Tr, Td } from '@/shared/ui';
import MajorClientsSections from '@/entities/major-clients/ui/MajorClientsSections';
import { AwardsWithWebglModel } from '@/features/awards-list';
import AwardListMobile from '@/features/awards-list/ui/AwardListMobile';

interface IAwardTableOptions {
  mobile?: boolean;
}

const SectionTop = () => {
  const renderAwardTable = ({ mobile }: IAwardTableOptions = { mobile: false }) => {
    return (
      <>
        {!mobile ? (
          <>
            <div className='col-span-full grid grid-cols-4 pt-i64'>
              <div
                className='relative col-span-full mb-i16 grid grid-cols-4 items-center py-i24
          after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-white after:opacity-16'
              >
                <p className='col-span-2 flex self-center text-white'>рейтинг рунета</p>
                <p className='col-span-2 flex self-center text-white'>tagline</p>
              </div>
              <Infographics toNumber={25} text='в&nbsp;рейтинге подрядчиков для<br/>государства' small={true} />
              <Infographics toNumber={89} text='в рейтинге дизайн-студий' small={true} />
            </div>
            <div className='col-span-full grid grid-cols-4 pt-i64'>
              <div
                className='relative col-span-full mb-i16 grid grid-cols-4 items-center py-i24
          after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-white after:opacity-16'
              >
                <p className='col-span-2 flex self-center text-white'>рейтинг рунета</p>
                <p className='col-span-2 flex self-center text-white'>tagline</p>
              </div>
              <Infographics toNumber={25} text='в&nbsp;рейтинге подрядчиков для<br/>государства' small={true} />
              <Infographics toNumber={89} text='в рейтинге дизайн-студий' small={true} />
            </div>
          </>
        ) : (
          <Table className='col-span-full md:hidden'>
            <Tr className='border-t'>
              <Td className='col-span-full'>
                <Infographics toNumber={25} text='в&nbsp;рейтинге подрядчиков для<br/>государства' small={true}>
                  <p className='col-span-2 flex self-center text-white/64'>рейтинг рунета</p>
                </Infographics>
              </Td>
            </Tr>
            <Tr>
              <Td className='col-span-full'>
                <Infographics toNumber={89} text='в рейтинге дизайн-студий' small={true}>
                  <p className='col-span-2 flex self-center text-white/64'>tagline</p>
                </Infographics>
              </Td>
            </Tr>
            <Tr>
              <Td className='col-span-full'>
                <Infographics toNumber={9} text='в&nbsp;рейтинге подрядчиков для<br/>государства' small={true}>
                  <p className='col-span-2 flex self-center text-white/64'>рейтинг рунета</p>
                </Infographics>
              </Td>
            </Tr>
            <Tr>
              <Td className='col-span-full'>
                <Infographics toNumber={17} text='в рейтинге веб-студий' small={true}>
                  <p className='col-span-2 flex self-center text-white/64'>рейтинг рунета</p>
                </Infographics>
              </Td>
            </Tr>
          </Table>
        )}
      </>
    );
  };

  return (
    <div className='relative col-span-full gap-y-i80 pb-[calc(theme(spacing.i16)+theme(spacing.i16))] grid-container md:pb-i32'>
      <Infographics toNumber={200} text='успешных проектов и созданных продуктов' postfix='+' />
      <div className='col-span-2 grid grid-cols-2 md:col-start-5'>
        <Infographics toNumber={30} text='наград' postfix='+' />
      </div>
      <div className='col-span-2 grid grid-cols-2 md:col-start-1'>
        <Infographics toNumber={12} text='на рынке' postfix='&nbsp;лет' />
      </div>
      <div className='col-span-6 hidden grid-cols-6 gap-y-gap md:grid'>
        <AwardsWithWebglModel>{renderAwardTable()}</AwardsWithWebglModel>
      </div>
      {renderAwardTable({ mobile: true })}
      <div className='col-span-full block md:hidden'>
        <h3 className='mb-i16 text-white'>награды</h3>
        <AwardListMobile />
      </div>
      <div className='col-span-full md:block'>
        <h3 className='text-white'>компетенции</h3>
      </div>
    </div>
  );
};

const InfographicsScreen = () => (
  <div className='col-span-full bg-dark pt-i80'>
    <SectionTop />
    <Breaker />
    <MajorClientsSections>
      <ClientHeader />
    </MajorClientsSections>
  </div>
);

export default InfographicsScreen;
