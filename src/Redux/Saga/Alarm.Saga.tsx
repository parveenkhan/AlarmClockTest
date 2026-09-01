import { takeLatest } from 'redux-saga/effects';

function* syncAlarms() {
  return;
}

export function* alarmSaga() {
  yield takeLatest('alarms/upsertAlarm', syncAlarms);
}
