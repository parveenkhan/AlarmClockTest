import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HUNT_OBJECTS, QuizId } from '../../constants/Onboarding';
import { MissionId } from '../../constants/Missions';

interface OnboardingState {
  completed: boolean;
  answers: Partial<Record<QuizId, string>>;
  language: string;
  usualHour: number;
  usualMinute: number;
  idealHour: number;
  idealMinute: number;
  onboardingMission: MissionId;
  huntIds: string[];
  signature: string;
  wakeGoal: string;
  snoozeHabit: string;
  morningGoal: string;
  days: number[];
  soundCategory: string;
  soundId: string;
  soundName: string;
  playDuringMission: boolean | null;
  heardFrom: string;
}

const initialState: OnboardingState = {
  completed: false,
  answers: {},
  language: 'en',
  usualHour: 7,
  usualMinute: 30,
  idealHour: 7,
  idealMinute: 30,
  onboardingMission: 'objectHunt',
  huntIds: HUNT_OBJECTS.map((item) => item.id),
  signature: '',
  wakeGoal: '7:30 AM',
  snoozeHabit: '',
  morningGoal: '',
  days: [],
  soundCategory: 'classic',
  soundId: 'classic-0',
  soundName: 'Default',
  playDuringMission: null,
  heardFrom: '',
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setAnswer(state, action: PayloadAction<{ id: QuizId; value: string }>) {
      state.answers[action.payload.id] = action.payload.value;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setUsualTime(state, action: PayloadAction<{ hour: number; minute: number }>) {
      state.usualHour = action.payload.hour;
      state.usualMinute = action.payload.minute;
    },
    setIdealTime(state, action: PayloadAction<{ hour: number; minute: number }>) {
      state.idealHour = action.payload.hour;
      state.idealMinute = action.payload.minute;
    },
    setOnboardingMission(state, action: PayloadAction<MissionId>) {
      state.onboardingMission = action.payload;
    },
    toggleHunt(state, action: PayloadAction<string>) {
      if (state.huntIds.includes(action.payload)) {
        state.huntIds = state.huntIds.filter((id) => id !== action.payload);
      } else {
        state.huntIds.push(action.payload);
      }
    },
    setSignature(state, action: PayloadAction<string>) {
      state.signature = action.payload;
    },
    setWakeGoal(state, action: PayloadAction<string>) {
      state.wakeGoal = action.payload;
    },
    setSnoozeHabit(state, action: PayloadAction<string>) {
      state.snoozeHabit = action.payload;
    },
    setMorningGoal(state, action: PayloadAction<string>) {
      state.morningGoal = action.payload;
    },
    toggleOnboardingDay(state, action: PayloadAction<number>) {
      if (state.days.includes(action.payload)) {
        state.days = state.days.filter((day) => day !== action.payload);
      } else {
        state.days = [...state.days, action.payload].sort((a, b) => a - b);
      }
    },
    setOnboardingSound(
      state,
      action: PayloadAction<{ category: string; id: string; name: string }>,
    ) {
      state.soundCategory = action.payload.category;
      state.soundId = action.payload.id;
      state.soundName = action.payload.name;
    },
    setPlayDuringMission(state, action: PayloadAction<boolean>) {
      state.playDuringMission = action.payload;
    },
    setHeardFrom(state, action: PayloadAction<string>) {
      state.heardFrom = action.payload;
    },
    completeOnboarding(state) {
      state.completed = true;
    },
    resetOnboarding() {
      return initialState;
    },
  },
});

export const {
  setAnswer,
  setLanguage,
  setUsualTime,
  setIdealTime,
  setOnboardingMission,
  toggleHunt,
  setSignature,
  setWakeGoal,
  setSnoozeHabit,
  setMorningGoal,
  toggleOnboardingDay,
  setOnboardingSound,
  setPlayDuringMission,
  setHeardFrom,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
