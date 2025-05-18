import { MainInfographicsScreen } from '@/widgets/infographics-screen';
import React from 'react';
import { fetchTags } from '@/entities/showreel/api';

export default async function Page() {
  const tags = await fetchTags();

  return <MainInfographicsScreen tags={tags} />;
}
