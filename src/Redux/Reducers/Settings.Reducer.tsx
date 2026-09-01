import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  volumeBoost: boolean;
  vibration: boolean;
  showOnLockScreen: boolean;
  darkMode: boolean;
  silenceDuringMission: boolean;
}

const initialState: SettingsState = {
  volumeBoost: true,
  vibration: true,
  showOnLockScreen: true,
  darkMode: false,
  silenceDuringMission: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSetting(state, action: PayloadAction<keyof SettingsState>) {
      state[action.payload] = !state[action.payload];
    },
    setSilenceDuringMission(state, action: PayloadAction<boolean>) {
      state.silenceDuringMission = action.payload;
    },
  },
});

export const { toggleSetting, setSilenceDuringMission } = settingsSlice.actions;
export default settingsSlice.reducer;
