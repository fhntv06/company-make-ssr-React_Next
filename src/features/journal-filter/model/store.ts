import { Publication as IPublication, ISeriesPublication } from '@/entities/publication/model/types';
import { create } from 'zustand';

interface IJournalFilterState {
  data: {
    all: (IPublication | ISeriesPublication)[];
    filtered: (IPublication | ISeriesPublication)[];
  };
  categoryId: number;
  selected: {
    tagIds: number[];
    educationIds: number[];
    authorIds: number[];
  };
}

interface IJournalFilterAction {
  setCurrentCategory: (categoryId: number) => void;
  select: (key: 'tagIds' | 'educationIds' | 'authorIds', tagId: number) => void;
  filter: () => void;
  reset: () => void;
  setData: (data: (IPublication | ISeriesPublication)[]) => void;
}

const initialState = {
  data: {
    all: [],
    filtered: [],
  },
  categoryId: 0,
  selected: {
    tagIds: [],
    educationIds: [],
    authorIds: [],
  },
};

export const useJournalFilter = create<IJournalFilterState & IJournalFilterAction>((set) => ({
  ...initialState,
  setCurrentCategory: (categoryId) => {
    set((state) => ({
      ...state,
      categoryId,
    }));
  },
  select: (key, tagId) => {
    set((state) => ({
      ...state,
      selected: {
        ...state.selected,
        [key]: state.selected[key].includes(tagId)
          ? state.selected[key].filter((id) => id !== tagId)
          : [...state.selected[key], tagId],
      },
    }));
  },
  filter: () => {},
  reset: () => {
    set((state) => ({
      ...initialState,
      data: {
        all: state.data.all,
        filtered: state.data.all,
      },
    }));
  },
  setData: (data) => {
    set((state) => ({
      ...state,
      data: {
        all: data,
        filtered: data,
      },
    }));
  },
}));
