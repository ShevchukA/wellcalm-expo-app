export type Habit = {
  id: string;
  name: string;
  color: string;
  dates: Dates;
};

export type Dates = {
  [date: string]: boolean;
};

export type CalendarArray = (string | null)[][][];

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
