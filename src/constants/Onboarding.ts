export const ONBOARDING_TOTAL = 22;

export type QuizId =
  | 'morningPerson'
  | 'age'
  | 'gender'
  | 'keepsInBed'
  | 'firstThought'
  | 'alarmCount'
  | 'oneAlarm'
  | 'backToSleep'
  | 'feelNight'
  | 'feelWake'
  | 'timeUntilAwake';

export interface QuizDef {
  id: QuizId;
  title: string;
  options: string[];
  step: number;
  showLang?: boolean;
}

export const QUIZZES: Record<QuizId, QuizDef> = {
  morningPerson: {
    id: 'morningPerson',
    title: 'Do you feel like a morning person?',
    options: ['Yes', 'Not yet'],
    step: 1,
    showLang: true,
  },
  age: {
    id: 'age',
    title: "What's your age range?",
    options: ['13-17', '18-24', '25-34', '35-44', '45-54', '55+'],
    step: 2,
  },
  gender: {
    id: 'gender',
    title: 'What best describes you?',
    options: ['Male', 'Female', 'Other'],
    step: 3,
  },
  keepsInBed: {
    id: 'keepsInBed',
    title: 'What keeps you in bed after the alarm?',
    options: ['Phone scrolling', 'Snooze loop', 'Sleep through alarms', 'I wake up but stay in bed'],
    step: 4,
  },
  firstThought: {
    id: 'firstThought',
    title: 'First thought when the alarm goes off?',
    options: ["I'm up", 'Just 5 more minutes', "I'll set another alarm", 'Why did I do this?'],
    step: 5,
  },
  alarmCount: {
    id: 'alarmCount',
    title: 'How many alarms do you set?',
    options: ['One', '2-3', '4+'],
    step: 7,
  },
  oneAlarm: {
    id: 'oneAlarm',
    title: 'If you set one alarm, would you wake up?',
    options: ['Yes', 'Sometimes', 'No'],
    step: 8,
  },
  backToSleep: {
    id: 'backToSleep',
    title: 'Do you ever turn off the alarm and go back to sleep?',
    options: ['Often', 'Sometimes', 'Rarely', 'Never'],
    step: 9,
  },
  feelNight: {
    id: 'feelNight',
    title: 'How do you feel setting your alarm at night?',
    options: ['Motivated', 'Anxious about sleep', 'Defeated', 'Neutral'],
    step: 11,
  },
  feelWake: {
    id: 'feelWake',
    title: 'How do you feel right after waking up?',
    options: ['Ready to go', 'Groggy', 'Anxious or stressed', 'Neutral'],
    step: 12,
  },
  timeUntilAwake: {
    id: 'timeUntilAwake',
    title: 'How long until you feel fully awake?',
    options: ['Instantly', '10-15 minutes', '30 minutes or more'],
    step: 13,
  },
};

export const HUNT_OBJECTS = [
  { id: 'toothbrush', label: 'Toothbrush', emoji: '🪥' },
  { id: 'faucet', label: 'Running Faucet', emoji: '🚰' },
  { id: 'shoes', label: 'Shoes', emoji: '👟' },
  { id: 'fridge', label: 'Fridge', emoji: '🧊' },
  { id: 'keys', label: 'Keys', emoji: '🔑' },
  { id: 'mug', label: 'Coffee Mug', emoji: '☕' },
  { id: 'mirror', label: 'Mirror', emoji: '🪞' },
  { id: 'bottle', label: 'Water Bottle', emoji: '💧' },
  { id: 'dustpan', label: 'Dustpan', emoji: '🧹' },
  { id: 'toilet', label: 'Toilet', emoji: '🚽' },
  { id: 'book', label: 'Book', emoji: '📕' },
  { id: 'lamp', label: 'Lamp', emoji: '💡' },
  { id: 'remote', label: 'Remote', emoji: '📺' },
  { id: 'door', label: 'Door', emoji: '🚪' },
  { id: 'stove', label: 'Stove', emoji: '🔥' },
  { id: 'plant', label: 'Plant', emoji: '🪴' },
  { id: 'sink', label: 'Sink', emoji: '🧼' },
  { id: 'window', label: 'Window', emoji: '🪟' },
  { id: 'chair', label: 'Chair', emoji: '🪑' },
  { id: 'bag', label: 'Bag', emoji: '👜' },
  { id: 'clock', label: 'Clock', emoji: '⏰' },
  { id: 'towel', label: 'Towel', emoji: '🧺' },
  { id: 'socket', label: 'Outlet', emoji: '🔌' },
  { id: 'pillow', label: 'Pillow', emoji: '🛏️' },
];

export const LANGUAGES = [
  { id: 'en', flag: '🇺🇸', label: 'English' },
  { id: 'fr', flag: '🇫🇷', label: 'Français' },
  { id: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { id: 'es', flag: '🇪🇸', label: 'Español' },
  { id: 'it', flag: '🇮🇹', label: 'Italiano' },
  { id: 'ja', flag: '🇯🇵', label: '日本語' },
];
