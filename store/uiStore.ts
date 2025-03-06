import { PHRASES } from '@/constants/Phrases';
import { create } from 'zustand';

interface UiStore {
  isModalOpen: boolean;
  isToastVisible: boolean;
  toastTitle: string;
  toastText: string;
  timeoutId: number | null;

  toggleModal: () => void;
  setToastTitle: (title: string) => void;
  hideToast: () => void;
}
export const useUiStore = create<UiStore>((set, get) => ({
  isModalOpen: false,
  isToastVisible: false,
  toastTitle: '',
  toastText: 'Keep going!',
  timeoutId: null,

  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),

  setToastTitle: (toastTitle) => {
    // Если предыдущий таймер существует, отменяем его
    if (get().timeoutId !== null) {
      clearTimeout(get().timeoutId!);
    }

    const id = setTimeout(() => {
      get().hideToast();
    }, 4000) as unknown as number; // Приведение типа зависит от окружения (NodeJS или браузер)

    const toastText = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    set({ toastTitle, toastText, timeoutId: id, isToastVisible: true });
  },

  hideToast: () =>
    set(() => {
      // Если предыдущий таймер существует, отменяем его
      if (get().timeoutId !== null) {
        clearTimeout(get().timeoutId!);
      }

      return { isToastVisible: false, timeoutId: null };
    }),
}));
