import { create } from 'zustand';
import type { ModelData } from '@/shared/lib/types';

/*
 * Стор. Хранит в себе логику и данные для взаимодействия с моделями наград
 * Рекомендация: Вероятно стоит сделать какое-то кэширование. Надо определиться LocalStorage или SessionStorage
 */

interface State {
  models: ModelData[]; // Список моделей
  DEFAULT_MODEL: string; // Имя дефолтной модели
  currentModel: string; // Имя текущей модели
}

interface Action {
  fetchModels: () => void; // Загрузка моделй
  setCurrentModel: (model: string) => void; // смена текущей модели
}

const initialState: State = {
  models: [],
  currentModel: '',
  DEFAULT_MODEL: 'RuAward',
};

export const useAwardSceneStore = create<State & Action>()((set, get) => ({
  ...initialState,
  fetchModels: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_JSON_API_URL}/award-models`, { cache: 'no-cache' });
      const data = (await res.json()) as ModelData[];

      set({ models: data, currentModel: get().DEFAULT_MODEL });
    } catch (e) {
      console.error(e);
    }
  },
  setCurrentModel: (model: string) => set({ currentModel: model }),
}));
