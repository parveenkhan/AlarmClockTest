import { all } from 'redux-saga/effects';
import { alarmSaga } from './Alarm.Saga';

export default function* rootSaga() {
  yield all([alarmSaga()]);
}
