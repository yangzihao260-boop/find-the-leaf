import { LocationData, LocationKey } from '../types';

export const LOCATIONS: Record<LocationKey, LocationData> = {
  field: {
    id: 'field',
    english: 'field',
    chinese: '田野 / 原野',
    phonetic: '/fiːld/',
    accentColor: '#16a34a', // vibrant green
    bgColor: '#fef08a', // warm sunny yellow
    borderColor: '#ca8a04',
    tagBg: 'bg-amber-100 text-amber-900 border-amber-300',
    badgeEmoji: '🌾',
    hint: 'Golden wheat, flowers & a spinning windmill!',
  },
  forest: {
    id: 'forest',
    english: 'forest',
    chinese: '森林 / 树林',
    phonetic: '/ˈfɒr.ɪst/',
    accentColor: '#15803d', // deep pine green
    bgColor: '#bbf7d0', // mint forest mist
    borderColor: '#166534',
    tagBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    badgeEmoji: '🌲',
    hint: 'Tall green pine trees, mushrooms & woodland wildlife!',
  },
  river: {
    id: 'river',
    english: 'river',
    chinese: '河流 / 江河',
    phonetic: '/ˈrɪv.ər/',
    accentColor: '#0284c7', // vibrant sky blue
    bgColor: '#bae6fd', // fresh water blue
    borderColor: '#0369a1',
    tagBg: 'bg-sky-100 text-sky-900 border-sky-300',
    badgeEmoji: '🌊',
    hint: 'Sparkling blue water, lily pads & gentle swimming ducklings!',
  },
};

export const CORE_VOCABULARY = [
  {
    word: 'leaf',
    chinese: '树叶 / 叶子',
    phonetic: '/liːf/',
    plural: 'leaves',
    emoji: '🍃',
    example: 'The green leaf falls gently.',
  },
  {
    word: 'field',
    chinese: '田野 / 草原',
    phonetic: '/fiːld/',
    plural: 'fields',
    emoji: '🌾',
    example: 'Butterflies fly over the yellow field.',
  },
  {
    word: 'forest',
    chinese: '森林 / 丛林',
    phonetic: '/ˈfɒr.ɪst/',
    plural: 'forests',
    emoji: '🌲',
    example: 'Birds sing in the deep green forest.',
  },
  {
    word: 'river',
    chinese: '河流 / 江河',
    phonetic: '/ˈrɪv.ər/',
    plural: 'rivers',
    emoji: '🌊',
    example: 'Cool clear water flows in the river.',
  },
];
