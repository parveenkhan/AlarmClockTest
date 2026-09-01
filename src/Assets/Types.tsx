import { MissionId } from './Missions';

export type RepeatPreset = 'once' | 'weekdays' | 'weekends' | 'daily' | 'custom';

export interface Alarm {
  id: string;
  label: string;
  hour: number;
  minute: number;
  enabled: boolean;
  repeat: RepeatPreset;
  days: number[];
  missionId: MissionId;
  soundCategory: string;
  soundId: string;
  soundName: string;
}

export interface GroupMember {
  id: string;
  name: string;
  hour: number;
  minute: number;
  accessory: 'flower' | 'crown' | 'chef' | 'plain' | 'glasses';
}

export interface AlarmGroup {
  id: string;
  name: string;
  memberCount: number;
  streak: number;
  icon: 'alarm' | 'rooster';
  iconTint: string;
  members: GroupMember[];
}

export interface WakePoint {
  label: string;
  hour: number;
  minute: number;
  dateLabel: string;
}

export interface DailyReport {
  id: string;
  date: string;
  wake: string;
  sleep: string;
  mission: string;
  onTime: boolean;
}
