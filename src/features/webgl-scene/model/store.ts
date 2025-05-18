import { create } from 'zustand';
import type { Client, ModelData } from '@/shared/lib/types';

interface WebglModelStore {
  models: ModelData[]; // Список загруженых моделей
  currentIndex: number; // Индекс текущей показаной модели
  currentModel: ModelData | null; // Текущая модель
  currentClient: Client | null; // Текущий клиент
  setNextModel: () => void; // Смена модели на следующую
  fetchModels: () => void; // Загрузка моделей
}

export const useWebglModelStore = create<WebglModelStore>()((set) => ({
  models: [],
  // TODO: поправить на реальные данные
  currentIndex: 0,
  currentModel: null,
  currentClient: null,
  setNextModel: () =>
    set((state) => {
      const nextIndex = state.currentIndex === state.models.length - 1 ? 0 : state.currentIndex + 1;
      console.log(nextIndex);
      return {
        currentIndex: nextIndex,
        currentModel: state.models[nextIndex],
        currentClient: state.models[nextIndex].client,
      };
    }),
  fetchModels: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_JSON_API_URL}/models`, { cache: 'no-cache' });
      const data = (await res.json()) as ModelData[];

      set({ models: data, currentModel: data[0], currentClient: data[0].client });
    } catch (e) {
      console.error(e);
    }
  },
}));
