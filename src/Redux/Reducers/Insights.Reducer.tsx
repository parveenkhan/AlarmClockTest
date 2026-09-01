import { createSlice } from '@reduxjs/toolkit';
import { AlarmGroup, DailyReport, WakePoint } from '../../Assets/Types';

interface InsightsState {
  range: '7D' | '30D' | 'ALL';
  avgWake: string;
  reportsWake: string;
  reportsSleep: string;
  reportRange: string;
  points: WakePoint[];
  reports: DailyReport[];
  groups: AlarmGroup[];
}

const initialState: InsightsState = {
  range: '7D',
  avgWake: '6:38 AM',
  reportsWake: '6:40 AM',
  reportsSleep: '8h 1m',
  reportRange: 'Jul 26 – Aug 1',
  points: [
    { label: 'Sun', hour: 6, minute: 48, dateLabel: 'Sun, Jul 26' },
    { label: 'Mon', hour: 6, minute: 32, dateLabel: 'Mon, Jul 27' },
    { label: 'Tue', hour: 6, minute: 40, dateLabel: 'Tue, Jul 28' },
    { label: 'Wed', hour: 6, minute: 28, dateLabel: 'Wed, Jul 29' },
    { label: 'Thu', hour: 6, minute: 45, dateLabel: 'Thu, Jul 30' },
    { label: 'Fri', hour: 6, minute: 36, dateLabel: 'Fri, Jul 31' },
    { label: 'Sat', hour: 6, minute: 41, dateLabel: 'Sat, Aug 1' },
  ],
  reports: [
    { id: 'r1', date: 'Mon, Jul 27', wake: '6:32 AM', sleep: '7h 48m', mission: 'Push Ups', onTime: true },
    { id: 'r2', date: 'Tue, Jul 28', wake: '6:40 AM', sleep: '8h 05m', mission: 'Object Hunt', onTime: true },
    { id: 'r3', date: 'Wed, Jul 29', wake: '6:28 AM', sleep: '8h 12m', mission: 'Sky Photo', onTime: true },
    { id: 'r4', date: 'Thu, Jul 30', wake: '6:45 AM', sleep: '7h 51m', mission: 'Shake Phone', onTime: false },
    { id: 'r5', date: 'Fri, Jul 31', wake: '6:36 AM', sleep: '8h 02m', mission: 'Make Bed', onTime: true },
  ],
  groups: [
    {
      id: 'early',
      name: 'Early Risers',
      memberCount: 2,
      streak: 9,
      icon: 'alarm',
      iconTint: '#1F8A4C',
      members: [
        { id: 'lily', name: 'Lily', hour: 5, minute: 33, accessory: 'flower' },
        { id: 'you', name: 'You', hour: 6, minute: 41, accessory: 'plain' },
      ],
    },
    {
      id: 'crew',
      name: 'Morning Crew',
      memberCount: 3,
      streak: 14,
      icon: 'rooster',
      iconTint: '#E07A2F',
      members: [
        { id: 'simon', name: 'Simon', hour: 6, minute: 10, accessory: 'crown' },
        { id: 'you2', name: 'You', hour: 6, minute: 41, accessory: 'plain' },
        { id: 'maya', name: 'Maya', hour: 5, minute: 50, accessory: 'chef' },
      ],
    },
  ],
};

const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    setRange(state, action: { payload: InsightsState['range'] }) {
      state.range = action.payload;
    },
  },
});

export const { setRange } = insightsSlice.actions;
export default insightsSlice.reducer;
