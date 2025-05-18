import { create } from 'zustand';
import { IClientAccordion } from '@/features/client-accordion/model/types';
import { ISelectedTags } from './types';

interface IFilteredClients {
  [key: string]: IClientAccordion[];
}

interface IClientFilterState {
  data: {
    clients: IClientAccordion[];
    filteredClients: IFilteredClients | null;
  };
  selectedTags: ISelectedTags;
  setClients: (clients: IClientAccordion[]) => void;
}

interface IClientFilterAction {
  resetFilters: () => void;
  selectTag: (key: 'industryIds' | 'serviceIds', tagId: number) => void;
  filterClients: () => void;
  setFromUrl: (selectedTags: ISelectedTags) => void;
}

const initialState = {
  data: {
    clients: [],
    filteredClients: null,
  },
  selectedTags: {
    industryIds: [],
    serviceIds: [],
  },
};

export const useClientFilterStore = create<IClientFilterState & IClientFilterAction>((set, get) => ({
  ...initialState,
  resetFilters: () => {
    set((state) => ({
      ...initialState,
      data: state.data,
    }));
  },
  selectTag: (key, tagId) => {
    set((state) => ({
      ...state,
      selectedTags: {
        ...state.selectedTags,
        [key]: state.selectedTags[key].includes(tagId)
          ? state.selectedTags[key].filter((id) => id !== tagId)
          : [...state.selectedTags[key], tagId],
      },
    }));
  },

  filterClients: () => {
    const {
      data: { clients },
      selectedTags,
    } = get();

    const filteredByIndustry = selectedTags.industryIds.length
      ? clients.filter((c) => selectedTags.industryIds.includes(c.industryId))
      : clients;
    const filteredByService = selectedTags.serviceIds.length
      ? filteredByIndustry.reduce((acc: IClientAccordion[], c) => {
          let flag = false;

          c.tags.forEach((service) => {
            if (selectedTags.serviceIds.includes(service.id)) {
              flag = true;
            }
          });

          if (flag) {
            acc.push(c);
          }

          return acc;
        }, [])
      : filteredByIndustry;

    const filteredClients: IFilteredClients = {};

    filteredByService.forEach((c) => {
      if (!filteredClients[c.industryId]) {
        filteredClients[c.industryId] = [];
      }

      filteredClients[c.industryId].push(c);
    });

    set((state) => ({
      ...state,
      data: {
        ...state.data,
        filteredClients,
      },
    }));
  },

  setClients: (clients) => {
    set((state) => ({
      ...state,
      data: {
        ...state.data,
        clients,
      },
    }));

    get().filterClients();
  },

  setFromUrl: (selectedTags) => {
    set((state) => ({
      ...state,
      selectedTags,
    }));

    get().filterClients();
  },
}));
