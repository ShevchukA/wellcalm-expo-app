import { useUiStore } from '@/store/uiStore';

const setToastTitle = useUiStore.getState().setToastTitle;

export const checkForAchievement = () => {
  setToastTitle('TEST');
};
