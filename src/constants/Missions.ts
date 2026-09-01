import { MissionTints } from './Colors';

export type MissionCategory = 'all' | 'trending' | 'photo' | 'audio' | 'move';

export type MissionId =
  | 'shake'
  | 'pushups'
  | 'objectHunt'
  | 'math'
  | 'skyPhoto'
  | 'random'
  | 'makeBed'
  | 'bible'
  | 'affirmation'
  | 'qr'
  | 'memory'
  | 'steps'
  | 'squats'
  | 'typing';

export type MissionKind = 'camera' | 'shake' | 'pushups' | 'math' | 'read' | 'random';

export interface Mission {
  id: MissionId;
  title: string;
  description: string;
  icon: string;
  tint: string;
  category: MissionCategory[];
  kind: MissionKind;
  preview: string;
  objectHint?: string;
}

export const MISSIONS: Mission[] = [
  {
    id: 'shake',
    title: 'Shake Phone',
    description: 'Shake your phone 30 times',
    icon: 'phone-portrait-outline',
    tint: MissionTints.shake,
    category: ['all', 'trending', 'move'],
    kind: 'shake',
    preview: 'Get out of bed and shake until the counter hits 30.',
  },
  {
    id: 'pushups',
    title: 'Push Ups',
    description: 'Do push-ups facing the camera',
    icon: 'barbell-outline',
    tint: MissionTints.pushups,
    category: ['all', 'trending', 'move'],
    kind: 'pushups',
    preview: 'Hold the phone and complete 10 push-ups to silence the alarm.',
  },
  {
    id: 'objectHunt',
    title: 'Object Hunt',
    description: 'Find and photograph a household object',
    icon: 'scan-outline',
    tint: MissionTints.objectHunt,
    category: ['all', 'trending', 'photo'],
    kind: 'camera',
    preview: 'Scan the room and photograph a random object to turn the alarm off.',
    objectHint: 'coffee mug',
  },
  {
    id: 'math',
    title: 'Math',
    description: 'Solve math problems to wake up',
    icon: 'calculator-outline',
    tint: MissionTints.math,
    category: ['all', 'trending'],
    kind: 'math',
    preview: 'Solve 3 problems correctly. Your groggy brain cannot cheat this.',
  },
  {
    id: 'skyPhoto',
    title: 'Sky Photo',
    description: 'Take a photo of the sky',
    icon: 'cloudy-outline',
    tint: MissionTints.skyPhoto,
    category: ['all', 'photo'],
    kind: 'camera',
    preview: 'Step outside or to a window and capture the sky.',
    objectHint: 'the sky',
  },
  {
    id: 'random',
    title: 'Random',
    description: 'Surprise mission each morning',
    icon: 'shuffle-outline',
    tint: MissionTints.random,
    category: ['all', 'trending'],
    kind: 'random',
    preview: 'A new mission is drawn from your pool every morning.',
  },
  {
    id: 'makeBed',
    title: 'Make Bed',
    description: 'Photograph your made bed',
    icon: 'bed-outline',
    tint: MissionTints.makeBed,
    category: ['all', 'photo'],
    kind: 'camera',
    preview: 'Make the bed, then take a photo to prove it.',
    objectHint: 'your made bed',
  },
  {
    id: 'bible',
    title: 'Bible Verse',
    description: 'Read a verse aloud to dismiss',
    icon: 'book-outline',
    tint: MissionTints.bible,
    category: ['all', 'audio'],
    kind: 'read',
    preview: 'Read the verse out loud. The alarm stops when you finish.',
  },
  {
    id: 'affirmation',
    title: 'Affirmation',
    description: 'Read an affirmation aloud',
    icon: 'chatbubble-ellipses-outline',
    tint: MissionTints.affirmation,
    category: ['all', 'audio'],
    kind: 'read',
    preview: 'Speak the affirmation clearly to start the day with intention.',
  },
  {
    id: 'qr',
    title: 'QR Scan',
    description: 'Scan a code across the room',
    icon: 'qr-code-outline',
    tint: MissionTints.qr,
    category: ['all', 'photo'],
    kind: 'camera',
    preview: 'Place a code on the bathroom mirror and scan it to dismiss.',
    objectHint: 'a QR code',
  },
  {
    id: 'memory',
    title: 'Memory',
    description: 'Match the sequence to wake up',
    icon: 'grid-outline',
    tint: MissionTints.memory,
    category: ['all'],
    kind: 'math',
    preview: 'Repeat a growing color sequence. Focus kills sleep inertia.',
  },
  {
    id: 'steps',
    title: 'Walk Steps',
    description: 'Take 40 steps before it stops',
    icon: 'walk-outline',
    tint: MissionTints.steps,
    category: ['all', 'move'],
    kind: 'shake',
    preview: 'Walk around until the step counter completes.',
  },
  {
    id: 'squats',
    title: 'Squats',
    description: 'Complete 15 bodyweight squats',
    icon: 'fitness-outline',
    tint: MissionTints.squats,
    category: ['all', 'move'],
    kind: 'pushups',
    preview: 'Stand up and finish 15 squats facing the camera.',
  },
  {
    id: 'typing',
    title: 'Type Phrase',
    description: 'Type a wake-up sentence exactly',
    icon: 'keypad-outline',
    tint: MissionTints.typing,
    category: ['all'],
    kind: 'math',
    preview: 'Type the phrase with no mistakes. Half-asleep thumbs fail.',
  },
];

export const MISSION_CATEGORIES: { id: MissionCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All', icon: 'apps-outline' },
  { id: 'trending', label: 'Trending', icon: 'flame' },
  { id: 'photo', label: 'Photo', icon: 'camera-outline' },
  { id: 'audio', label: 'Audio', icon: 'pulse-outline' },
];

export function getMission(id: MissionId): Mission {
  return MISSIONS.find((item) => item.id === id) ?? MISSIONS[0];
}

export const BIBLE_VERSES = [
  'This is the day that the Lord has made; let us rejoice and be glad in it. — Psalm 118:24',
  'I can do all things through him who strengthens me. — Philippians 4:13',
  'Your word is a lamp to my feet and a light to my path. — Psalm 119:105',
];

export const AFFIRMATIONS = [
  'I get up with purpose. Today I move first and think later.',
  'I am awake, I am capable, and I keep the promises I make to myself.',
  'The hardest part is done. I already won this morning.',
];
