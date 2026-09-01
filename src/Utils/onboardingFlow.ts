import { QuizId } from '../constants/Onboarding';
import { RootStackParamList } from '../Navigation/types';

type Dest = { name: keyof RootStackParamList; params?: object };

export function nextQuiz(id: QuizId): Dest {
  const map: Record<QuizId, Dest> = {
    morningPerson: { name: 'Quiz', params: { id: 'age' } },
    age: { name: 'Quiz', params: { id: 'gender' } },
    gender: { name: 'Quiz', params: { id: 'keepsInBed' } },
    keepsInBed: { name: 'Quiz', params: { id: 'firstThought' } },
    firstThought: { name: 'EnergyGraph' },
    alarmCount: { name: 'Quiz', params: { id: 'oneAlarm' } },
    oneAlarm: { name: 'Quiz', params: { id: 'backToSleep' } },
    backToSleep: { name: 'Comparison' },
    feelNight: { name: 'Quiz', params: { id: 'feelWake' } },
    feelWake: { name: 'Quiz', params: { id: 'timeUntilAwake' } },
    timeUntilAwake: { name: 'UsualTime' },
  };
  return map[id];
}
