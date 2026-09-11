export type LocationKey = 'field' | 'forest' | 'river';

export interface LocationData {
  id: LocationKey;
  english: string;
  chinese: string;
  phonetic: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  tagBg: string;
  badgeEmoji: string;
  hint: string;
}

export interface GameState {
  currentLocation: LocationKey;
  isLeafFound: boolean;
  hasReadSentence: boolean;
  score: number;
  streak: number;
  round: number;
  sentenceGrammar: 'in' | 'direct'; // 'in' = "The leaf is in the ...", 'direct' = "The leaf is the ..."
  isAudioMuted: boolean;
  isBgmMuted: boolean;
  showTeacherTools: boolean;
  showWordCards: boolean;
}
