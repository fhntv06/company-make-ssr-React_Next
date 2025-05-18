import { IStories } from '@/entities/stories';
import { create } from 'zustand';
import { Media } from '@/shared/lib/types';

interface IStoriesState extends Media {
  viewed: boolean;
}

interface State {
  stories: Record<number, IStoriesState[]>;
}

interface Actions {
  addStories: (stories: IStories) => void;
  viewStories: (id: number, index: number) => void;
}

export const useStoriesStore = create<State & Actions>()((set, get) => ({
  stories: {},
  addStories: (stories: IStories) => {
    if (get().stories[stories.id]) {
      console.log(get().stories);
      return;
    }

    set((state) => ({
      ...state,
      stories: {
        ...state.stories,
        [stories.id]: stories.content.map((item) => ({ ...item, viewed: false })),
      },
    }));
  },
  viewStories: (id: number, index: number) =>
    set((state) => ({
      ...state,
      stories: {
        ...state.stories,
        [id]: state.stories[id].map((item, i) => ({ ...item, viewed: i === index })),
      },
    })),
}));
