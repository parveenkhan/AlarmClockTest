import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  streak: number;
  badges: number;
  name: string;
  sleepTracking: boolean;
  pro: boolean;
}

const initialState: UserState = {
  streak: 2,
  badges: 17,
  name: 'You',
  sleepTracking: false,
  pro: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incrementStreak(state) {
      state.streak += 1;
    },
    setSleepTracking(state, action: PayloadAction<boolean>) {
      state.sleepTracking = action.payload;
    },
    setPro(state, action: PayloadAction<boolean>) {
      state.pro = action.payload;
    },
  },
});

export const { incrementStreak, setSleepTracking, setPro } = userSlice.actions;
export default userSlice.reducer;
