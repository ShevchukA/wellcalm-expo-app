import { TutorialState } from '@/models/models';
import { create } from 'zustand';
import { getAsyncStorageData } from '@/utils/getAsyncStorageData';
import { setAsyncStorageData } from '@/utils/setAsyncStorageData';

interface TutorStore {
  tutorial: TutorialState;
  nextStep: () => void;
  setStep: (step: number) => void;
  updateStep: (key: keyof TutorialState['steps'], value: boolean) => void;
  loadTutorialFromAsyncStore: () => Promise<void>;
}

export const useTutorStore = create<TutorStore>((set) => ({
  tutorial: {
    step: 0,
    steps: {
      cellMarked: false,
      calendarOpened: false,
      cardDeleted: false,
      cardAdded: false,
    },
  },

  nextStep: () =>
    set((state) => {
      const newTutorial = {
        ...state.tutorial,
        step: state.tutorial.step + 1,
      };
      setAsyncStorageData('tutorial', newTutorial);
      return { tutorial: newTutorial };
    }),

  setStep: (step) =>
    set((state) => {
      const newTutorial = {
        ...state.tutorial,
        step: step,
      };
      setAsyncStorageData('tutorial', newTutorial);
      return { tutorial: newTutorial };
    }),

  updateStep: (key, value) =>
    set((state) => {
      const newTutorial = {
        ...state.tutorial,
        steps: { ...state.tutorial.steps, [key]: value },
      };
      setAsyncStorageData('tutorial', newTutorial);
      return { tutorial: newTutorial };
    }),

  loadTutorialFromAsyncStore: async () => {
    const tutorial = await getAsyncStorageData<TutorialState>('tutorial');
    if (tutorial) {
      set(() => ({ tutorial }));
    }
  },
}));
