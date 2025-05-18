import { create } from 'zustand';
import { Case, fetchCases } from '@/entities/case';
import { Category, Filters, Service, Stories, Tag } from '@/shared/lib/types';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { fetchStories } from '@/entities/stories/api';

interface State {
  loading: boolean;
  cases: Case[] | null;
  tags: Tag[][] | null;
  filters: Filters;
  services: Service[] | null;
  stories: Stories[] | null;
}

interface Action {
  setCurrentCategory: (category: Category, update?: boolean) => void;
  setSelectedTag: (id: number) => void;
  setSelectedTagIds: (id: number) => void;
  setSelectedServiceIds: (id: number) => void;
  updateCases: () => void;
  updateStories: (categoryId?: string) => void;
  updateTagsAndServices: (category: Category) => void;
  reset: () => void;
  setFromUrl: (params: ReadonlyURLSearchParams, category: Category) => void;
}

const initialState: State = {
  loading: false,
  cases: null,
  tags: null,
  filters: { categoryId: '1' },
  services: null,
  stories: null,
};

export const useCaseFilterStore = create<State & Action>()((set, get) => ({
  ...initialState,
  updateCases: async () => {
    try {
      set({ loading: true });
      const cases = await fetchCases(get().filters as Record<string, unknown>);

      set({ cases, loading: false });
    } catch (error) {
      console.log(error);
    }
  },
  updateStories: async (categoryId = '1') => {
    try {
      const stories = await fetchStories(categoryId);
      set({ stories });
    } catch (e) {
      console.log(e);
    }
  },
  updateTagsAndServices: (category: Category) => {
    const tagsType1: Tag[] = [];
    const tagsType2: Tag[] = [];

    category.tags.forEach((tag) => {
      const target = tag.type === 1 ? tagsType1 : tagsType2;

      target.push(tag);
    });

    set({
      tags: [tagsType1, tagsType2],
      services: category.services,
    });
  },
  setCurrentCategory: (category: Category) => {
    set({
      filters: { categoryId: String(category.id) },
    });

    get().updateTagsAndServices(category);
    get().updateStories(String(category.id));
    get().updateCases();
  },
  setSelectedTag: (id: number) => set({ filters: { ...get().filters, tagId: [String(id)] } }),
  setSelectedTagIds: (id: number) =>
    set((state) => ({
      ...state,
      filters: {
        ...state.filters,
        tagId: state.filters.tagId ? [...state.filters.tagId, String(id)] : [String(id)],
      },
    })),
  setSelectedServiceIds: (id: number) =>
    set((state) => ({
      ...state,
      filters: {
        ...state.filters,
        serviceId: state.filters.serviceId ? [...state.filters.serviceId, String(id)] : [String(id)],
      },
    })),
  reset: () => set({ ...initialState }),
  setFromUrl: (params, category) => {
    const filters = {};
    params.forEach((value, key) => {
      if (key.endsWith('[]')) {
        const normalizedKey = key.replace('[]', '');
        // @ts-ignore
        if (filters[normalizedKey]) {
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          filters[normalizedKey] = [...filters[normalizedKey], value];
        } else {
          // @ts-ignore
          filters[normalizedKey] = [value];
        }
      } else {
        // @ts-ignore
        filters[key] = value;
      }
    });

    set({ filters });
    get().updateTagsAndServices(category);
    get().updateCases();
  },
}));
