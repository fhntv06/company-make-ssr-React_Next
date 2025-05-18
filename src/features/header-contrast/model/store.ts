import { create } from 'zustand';

interface State {
  isContrast: boolean;
}

interface Action {
  setIsContrast: (state: boolean) => void;
}

const initialState: State = {
  isContrast: false,
};

export const useContrastHeader = create<State & Action>()((set) => ({
  ...initialState,
  setIsContrast: (state: boolean) => set({ isContrast: state }),
}));
