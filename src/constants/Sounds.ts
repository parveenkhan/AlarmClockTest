export interface SoundItem {
  id: string;
  name: string;
  color?: string;
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
    sounds: [
      { id: 'classic-0', name: 'Default', color: '#8E8E93' },
      { id: 'classic-1', name: 'Alarm Clock', color: '#3D4A5C' },
      { id: 'classic-2', name: 'Reveille', color: '#6B7A3A' },
      { id: 'classic-3', name: 'Sparkles', color: '#A78BFA' },
    ],
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
    sounds: [
      { id: 'viral-0', name: 'Mindful Earth', color: '#1F6F6A' },
      { id: 'viral-1', name: 'Epic Brass', color: '#E2B03A' },
      { id: 'viral-2', name: 'Neon', color: '#A855F7' },
      { id: 'viral-3', name: 'Dialed', color: '#C2410C' },
    ],
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

export const ONBOARDING_SOUNDS = {
  classic: SOUND_CATEGORIES[0].sounds.slice(0, 4),
  viral: SOUND_CATEGORIES.find((item) => item.id === 'viral')?.sounds ?? [],
};

export function getSoundCategory(id: string) {
  return SOUND_CATEGORIES.find((item) => item.id === id) ?? SOUND_CATEGORIES[0];
}

export function getSound(categoryId: string, soundId: string) {
  const category = getSoundCategory(categoryId);
  return category.sounds.find((item) => item.id === soundId) ?? category.sounds[0];
}
