export type Habit = {
  id: string;
  name: string;
  dates: string[];
};

export type LaunchCounter = {
  count: number;
};

export type TutorialState = {
  step: number;
  steps: {
    cellMarked: boolean;
    calendarOpened: boolean;
    cardDeleted: boolean;
    cardAdded: boolean;
  };
};
