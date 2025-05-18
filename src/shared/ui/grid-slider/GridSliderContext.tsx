import { createContext } from 'react';

export interface GridSliderContextType {
  columnWidth: number;
  gap: number;
}

const GridSliderContext = createContext<GridSliderContextType>({ columnWidth: 0, gap: 0 });

export default GridSliderContext;
