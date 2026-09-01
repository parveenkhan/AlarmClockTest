import { combineReducers } from '@reduxjs/toolkit';
import alarms from './Alarm.Reducer';
import onboarding from './Onboarding.Reducer';
import user from './User.Reducer';
import insights from './Insights.Reducer';
import settings from './Settings.Reducer';

const rootReducer = combineReducers({
  alarms,
  onboarding,
  user,
  insights,
  settings,
});

export default rootReducer;
