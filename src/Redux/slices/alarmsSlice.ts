import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alarm } from '../../constants/Types';
import { MissionId } from '../../constants/Missions';
import { uid } from '../../Utils/time';

interface AlarmsState {
  items: Alarm[];
  ringingAlarmId: string | null;
}

const initialState: AlarmsState = {
  ringingAlarmId: null,
  items: [
    {
      id: 'alarm_weekdays',
      label: 'Work',
      hour: 7,
      minute: 5,
      enabled: true,
      repeat: 'weekdays',
      days: [1, 2, 3, 4, 5],
      missionId: 'objectHunt',
      soundCategory: 'aggressive',
      soundId: 'aggressive-0',
      soundName: 'Air Horn',
    },
    {
      id: 'alarm_weekends',
      label: 'Weekends',
      hour: 9,
      minute: 0,
      enabled: true,
      repeat: 'weekends',
      days: [0, 6],
      missionId: 'pushups',
      soundCategory: 'aggressive',
      soundId: 'aggressive-1',
      soundName: 'Siren',
    },
    {
      id: 'alarm_nap',
      label: 'Nap',
      hour: 12,
      minute: 30,
      enabled: false,
      repeat: 'once',
      days: [],
      missionId: 'shake',
      soundCategory: 'classic',
      soundId: 'classic-0',
      soundName: 'Beacon',
    },
  ],
};

const alarmsSlice = createSlice({
  name: 'alarms',
  initialState,
  reducers: {
    upsertAlarm(state, action: PayloadAction<Alarm>) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },
    toggleAlarm(state, action: PayloadAction<string>) {
      const alarm = state.items.find((item) => item.id === action.payload);
      if (alarm) alarm.enabled = !alarm.enabled;
    },
    deleteAlarm(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setMission(state, action: PayloadAction<{ alarmId: string; missionId: MissionId }>) {
      const alarm = state.items.find((item) => item.id === action.payload.alarmId);
      if (alarm) alarm.missionId = action.payload.missionId;
    },
    setSound(
      state,
      action: PayloadAction<{ alarmId: string; soundCategory: string; soundId: string; soundName: string }>,
    ) {
      const alarm = state.items.find((item) => item.id === action.payload.alarmId);
      if (!alarm) return;
      alarm.soundCategory = action.payload.soundCategory;
      alarm.soundId = action.payload.soundId;
      alarm.soundName = action.payload.soundName;
    },
    setRingingAlarm(state, action: PayloadAction<string | null>) {
      state.ringingAlarmId = action.payload;
    },
    createBlankAlarm: {
      reducer(state, action: PayloadAction<Alarm>) {
        state.items.unshift(action.payload);
      },
      prepare() {
        const now = new Date();
        const alarm: Alarm = {
          id: uid('alarm'),
          label: 'Alarm',
          hour: now.getHours(),
          minute: now.getMinutes(),
          enabled: true,
          repeat: 'weekdays',
          days: [1, 2, 3, 4, 5],
          missionId: 'objectHunt',
          soundCategory: 'aggressive',
          soundId: 'aggressive-0',
          soundName: 'Air Horn',
        };
        return { payload: alarm };
      },
    },
  },
});

export const {
  upsertAlarm,
  toggleAlarm,
  deleteAlarm,
  setMission,
  setSound,
  setRingingAlarm,
  createBlankAlarm,
} = alarmsSlice.actions;

export default alarmsSlice.reducer;
