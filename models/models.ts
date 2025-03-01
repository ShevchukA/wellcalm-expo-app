export type Habit = {
  id: string;
  name: string;
  dates: Dates;
};

export type Dates = {
  [year: string]: { [month: string]: { [day: string]: boolean } };
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
