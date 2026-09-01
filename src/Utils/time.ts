import { RepeatPreset } from '../Assets/Types';

export function pad2(value: number) {
  return String(value).padStart(2, '0');
}

export function toMinutes(hour: number, minute: number) {
  return hour * 60 + minute;
}

export function formatTime(hour: number, minute: number) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${pad2(minute)} ${period}`;
}

export function formatHourMinute(hour: number, minute: number) {
  const period = hour >= 12 ? 'AM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${pad2(minute)} ${hour >= 12 ? 'PM' : period}`;
}

export function repeatLabel(repeat: string, days: number[]) {
  if (repeat === 'weekdays') return 'Weekdays';
  if (repeat === 'weekends') return 'Weekends';
  if (repeat === 'daily') return 'Every day';
  if (repeat === 'once') return 'Once';
  const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days.map((day) => names[day]).join(', ');
}

export function daysForRepeat(repeat: string, days: number[]) {
  if (repeat === 'weekdays') return [1, 2, 3, 4, 5];
  if (repeat === 'weekends') return [0, 6];
  if (repeat === 'daily') return [0, 1, 2, 3, 4, 5, 6];
  if (repeat === 'once') return [];
  return days;
}

export function nextAlarmDate(hour: number, minute: number, days: number[], enabled: boolean) {
  if (!enabled) return null;
  const now = new Date();
  const candidate = new Date(now);
  candidate.setHours(hour, minute, 0, 0);

  const allowed = days.length ? days : [0, 1, 2, 3, 4, 5, 6];

  for (let offset = 0; offset < 8; offset += 1) {
    const next = new Date(now);
    next.setDate(now.getDate() + offset);
    next.setHours(hour, minute, 0, 0);
    const weekday = next.getDay();
    const isFuture = next.getTime() > now.getTime() + 5000;
    if (allowed.includes(weekday) && isFuture) {
      return next;
    }
  }

  if (candidate.getTime() > now.getTime()) return candidate;
  candidate.setDate(candidate.getDate() + 1);
  return candidate;
}

export function formatCountdown(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalMinutes = Math.floor(diff / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours <= 0) return `${minutes} min`;
  return `${hours} hr ${minutes} min`;
}

export function formatCountdownHMS(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
}

export function weekdayShort(date: Date) {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
}

export function monthDayUpper(date = new Date()) {
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
}

export function repeatFromDays(days: number[]): RepeatPreset {
  const sorted = [...days].sort((a, b) => a - b).join(',');
  if (sorted === '1,2,3,4,5') return 'weekdays';
  if (sorted === '0,6') return 'weekends';
  if (sorted === '0,1,2,3,4,5,6') return 'daily';
  if (!days.length) return 'weekdays';
  return 'custom';
}

export function ringsInLabel(repeat: string) {
  if (repeat === 'weekends') return 'Weekends Rings In';
  if (repeat === 'weekdays') return 'Weekdays Rings In';
  if (repeat === 'once') return 'Rings In';
  return 'Next Alarm Rings In';
}

export function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
