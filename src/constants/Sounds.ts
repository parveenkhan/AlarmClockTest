export interface SoundItem {
  id: string;
  name: string;
}

export interface SoundCategory {
  id: string;
  name: string;
  count: number;
  sounds: SoundItem[];
}

function makeSounds(prefix: string, names: string[]): SoundItem[] {
  return names.map((name, index) => ({ id: `${prefix}-${index}`, name }));
}

export const SOUND_CATEGORIES: SoundCategory[] = [
  {
    id: 'classic',
    name: 'Classic',
    count: 24,
    sounds: makeSounds('classic', [
      'Beacon',
      'Radar',
      'Summit',
      'Chime',
      'Pulse',
      'Alarm Classic',
    ]),
  },
  {
    id: 'aggressive',
    name: 'Aggressive',
    count: 24,
    sounds: makeSounds('aggressive', [
      'Air Horn',
      'Siren',
      'Drill',
      'Klaxon',
      'Wake Now',
      'Red Alert',
    ]),
  },
  {
    id: 'motivation',
    name: 'Motivation',
    count: 17,
    sounds: makeSounds('motivation', ['Rise Up', 'Let’s Go', 'Champion', 'Lock In']),
  },
  {
    id: 'viral',
    name: 'Viral',
    count: 26,
    sounds: makeSounds('viral', ['Trending 1', 'Trending 2', 'Meme Horn', 'Get Up Bro']),
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    count: 15,
    sounds: makeSounds('cinematic', ['Dawn', 'Horizon', 'Overture', 'Credits']),
  },
  {
    id: 'peaceful',
    name: 'Peaceful',
    count: 16,
    sounds: makeSounds('peaceful', ['Birds', 'Soft Bell', 'Wind Chime', 'Lake']),
  },
  {
    id: 'faith',
    name: 'Faith',
    count: 12,
    sounds: makeSounds('faith', ['Morning Hymn', 'Bells', 'Amen', 'Sunrise Prayer']),
  },
];

export function getSoundCategory(id: string) {
  return SOUND_CATEGORIES.find((item) => item.id === id) ?? SOUND_CATEGORIES[0];
}
