import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { LocationKey } from './types';
import { LOCATIONS } from './data/locations';
import { FieldView } from './components/FieldView';
import { ForestView } from './components/ForestView';
import { RiverView } from './components/RiverView';
import { LeafActor } from './components/LeafActor';
import { SentenceBanner } from './components/SentenceBanner';
import { TeacherToolbar } from './components/TeacherToolbar';
import { VocabularyModal } from './components/VocabularyModal';
import { HelpModal } from './components/HelpModal';
import { soundManager, speakText } from './utils/audio';
import { fireLeafConfetti, fireVictoryConfetti } from './utils/confetti';

const ALL_LOCATIONS: LocationKey[] = ['field', 'forest', 'river'];

export default function App() {
  // Core Game State
  const [currentLocation, setCurrentLocation] = useState<LocationKey>('forest');
  const [isLeafFound, setIsLeafFound] = useState<boolean>(false);
  const [hasReadSentence, setHasReadSentence] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [grammarMode, setGrammarMode] = useState<'in' | 'direct'>('in');

  // Animation & Floating State
  const [isFloating, setIsFloating] = useState<boolean>(false);

  // Audio & Settings State
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(false);
  const [isSfxMuted, setIsSfxMuted] = useState<boolean>(false);
  const [isVocabModalOpen, setIsVocabModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  // Initial setup: start BGM on first user interaction if allowed, or provide toggle
  useEffect(() => {
    // Pick initial random location
    const initialLoc = ALL_LOCATIONS[Math.floor(Math.random() * ALL_LOCATIONS.length)];
    setCurrentLocation(initialLoc);
  }, []);

  // Handle BGM Toggle
  const handleToggleBgm = useCallback(() => {
    if (isBgmPlaying) {
      soundManager.stopBGM();
      setIsBgmPlaying(false);
    } else {
      soundManager.startBGM();
      setIsBgmPlaying(true);
    }
  }, [isBgmPlaying]);

  // Handle SFX Toggle
  const handleToggleSfx = useCallback(() => {
    const nextMuted = !isSfxMuted;
    setIsSfxMuted(nextMuted);
    soundManager.setSfxMute(nextMuted);
  }, [isSfxMuted]);

  // Toggle Grammar mode: "The leaf is in the..." vs "The leaf is the..."
  const handleToggleGrammar = useCallback(() => {
    setGrammarMode((prev) => (prev === 'in' ? 'direct' : 'in'));
  }, []);

  // Start Next Round: Leaf floats across the screen and lands in a new random place
  const handleNextRound = useCallback(() => {
    soundManager.playBreeze();
    setIsFloating(true);
    setIsLeafFound(false);
    setHasReadSentence(false);

    // Pick a new location (prefer a different one for excitement)
    const available = ALL_LOCATIONS.filter((l) => l !== currentLocation);
    const nextLoc = available[Math.floor(Math.random() * available.length)];

    setTimeout(() => {
      setCurrentLocation(nextLoc);
      setRound((r) => r + 1);
      setIsFloating(false);
      soundManager.playPop();

      // Automatically speak the new sentence cue
      const sentenceToSpeak = grammarMode === 'in'
        ? `The leaf is in the ${LOCATIONS[nextLoc].english}.`
        : `The leaf is the ${LOCATIONS[nextLoc].english}.`;

      setTimeout(() => {
        speakText(sentenceToSpeak);
      }, 500);
    }, 900);
  }, [currentLocation, grammarMode]);

  // Leaf Click Handler
  const handleFoundLeaf = useCallback(() => {
    if (isLeafFound) return;
    setIsLeafFound(true);
    fireLeafConfetti();

    // Congratulate student & prompt to read sentence
    const locName = LOCATIONS[currentLocation].english;
    const feedbackSentence = grammarMode === 'in'
      ? `Great job! The leaf is in the ${locName}. Now read the sentence!`
      : `Great job! The leaf is the ${locName}. Now read the sentence!`;

    speakText(feedbackSentence);
  }, [isLeafFound, currentLocation, grammarMode]);

  // Sentence Spoken & Scored
  const handleSentenceScored = useCallback(() => {
    if (hasReadSentence) return;
    setHasReadSentence(true);
    setScore((s) => s + 100);
    setStreak((st) => st + 1);
    fireVictoryConfetti();
    soundManager.playSuccessFanfare();
  }, [hasReadSentence]);

  // Reset Game
  const handleResetGame = useCallback(() => {
    setScore(0);
    setStreak(0);
    setRound(1);
    setIsLeafFound(false);
    setHasReadSentence(false);
    handleNextRound();
  }, [handleNextRound]);

  return (
    <div
      id="app-root"
      className="min-h-screen w-full bg-gradient-to-b from-amber-50/60 via-lime-50/40 to-emerald-50/70 p-3 sm:p-4 md:p-6 flex flex-col justify-between"
    >
      {/* Top Header & Classroom Toolbar */}
      <TeacherToolbar
        score={score}
        streak={streak}
        round={round}
        grammarMode={grammarMode}
        onToggleGrammar={handleToggleGrammar}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={handleToggleBgm}
        isSfxMuted={isSfxMuted}
        onToggleSfx={handleToggleSfx}
        onOpenVocabulary={() => setIsVocabModalOpen(true)}
        onResetGame={handleResetGame}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />

      {/* Target Sentence Display Banner */}
      <SentenceBanner
        currentLocation={currentLocation}
        grammarMode={grammarMode}
        isLeafFound={isLeafFound}
        hasReadSentence={hasReadSentence}
        onSentenceScored={handleSentenceScored}
        onNextRound={handleNextRound}
        streak={streak}
      />

      {/* Main Interactive Stage: 3 Parallel Locations (Field, Forest, River) */}
      <main className="w-full max-w-5xl mx-auto flex-1 my-2">
        <div className="relative w-full">
          {/* 3 Places Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 min-h-[460px] md:h-[480px] lg:h-[510px]">
            {/* 1. Field (田野) */}
            <div
              className="relative min-h-[320px] md:min-h-0 md:h-full cursor-pointer"
              onClick={() => {
                if (currentLocation === 'field') {
                  handleFoundLeaf();
                } else if (!isLeafFound) {
                  soundManager.playPop();
                  speakText('Not here! Try another place!');
                }
              }}
            >
              <FieldView
                hasLeaf={currentLocation === 'field'}
                isFound={isLeafFound && currentLocation === 'field'}
              />
              {/* Leaf Actor when in Field */}
              <AnimatePresence>
                {currentLocation === 'field' && !isFloating && (
                  <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-20">
                    <LeafActor
                      isFound={isLeafFound}
                      onFound={handleFoundLeaf}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Forest (森林) */}
            <div
              className="relative min-h-[320px] md:min-h-0 md:h-full cursor-pointer"
              onClick={() => {
                if (currentLocation === 'forest') {
                  handleFoundLeaf();
                } else if (!isLeafFound) {
                  soundManager.playPop();
                  speakText('Not here! Try another place!');
                }
              }}
            >
              <ForestView
                hasLeaf={currentLocation === 'forest'}
                isFound={isLeafFound && currentLocation === 'forest'}
              />
              {/* Leaf Actor when in Forest */}
              <AnimatePresence>
                {currentLocation === 'forest' && !isFloating && (
                  <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-20">
                    <LeafActor
                      isFound={isLeafFound}
                      onFound={handleFoundLeaf}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. River (河流) */}
            <div
              className="relative min-h-[320px] md:min-h-0 md:h-full cursor-pointer"
              onClick={() => {
                if (currentLocation === 'river') {
                  handleFoundLeaf();
                } else if (!isLeafFound) {
                  soundManager.playPop();
                  speakText('Not here! Try another place!');
                }
              }}
            >
              <RiverView
                hasLeaf={currentLocation === 'river'}
                isFound={isLeafFound && currentLocation === 'river'}
              />
              {/* Leaf Actor when in River */}
              <AnimatePresence>
                {currentLocation === 'river' && !isFloating && (
                  <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-20">
                    <LeafActor
                      isFound={isLeafFound}
                      onFound={handleFoundLeaf}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Flying Leaf in Transition Animation across the sky */}
          <AnimatePresence>
            {isFloating && (
              <motion.div
                initial={{ x: '-20%', y: '10%', rotate: -40, scale: 0.8 }}
                animate={{
                  x: ['0%', '40%', '80%', '110%'],
                  y: ['10%', '60%', '20%', '50%'],
                  rotate: [0, 90, 180, 270],
                  scale: [0.8, 1.2, 0.9, 1],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="absolute top-1/4 left-0 z-40 pointer-events-none"
              >
                <div className="flex items-center gap-2">
                  <span className="text-5xl md:text-6xl drop-shadow-2xl">🍃</span>
                  <div className="bg-amber-300/90 text-amber-950 font-extrabold text-xs px-2.5 py-1 rounded-full shadow-lg border border-amber-400">
                    飘呀飘... Floating!
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Floating Guidance & Action Footer */}
      <footer className="w-full max-w-5xl mx-auto mt-2 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-amber-200">
        {/* Left Status & Encouragement */}
        <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
          {!isLeafFound ? (
            <div className="flex items-center gap-2 text-amber-800">
              <span className="text-xl animate-bounce">👀</span>
              <span>
                找一找：树叶现在飘到了哪里？点击画面中的
                <span className="text-emerald-700 font-extrabold mx-1 underline decoration-emerald-400">
                  树叶 (leaf)
                </span>
                吧！
              </span>
            </div>
          ) : !hasReadSentence ? (
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-pulse" />
              <span>
                太棒了找到了！大声朗读上方句子：
                <span className="font-extrabold font-['Fredoka',sans-serif] text-slate-900 mx-1">
                  "{grammarMode === 'in' ? `The leaf is in the ${LOCATIONS[currentLocation].english}` : `The leaf is the ${LOCATIONS[currentLocation].english}`}"
                </span>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-700">
              <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
              <span>
                回答正确！获得 100 分！点击右侧“继续游戏”开始下一轮吧！
              </span>
            </div>
          )}
        </div>

        {/* Right Primary Continue / Next Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            id="btn-continue-bottom"
            onClick={handleNextRound}
            disabled={isFloating}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
              hasReadSentence
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white ring-4 ring-emerald-200 animate-pulse'
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            }`}
          >
            <span>{isFloating ? '树叶飘动中...' : '继续 (Next Round)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Vocabulary Flashcards Modal */}
      <VocabularyModal
        isOpen={isVocabModalOpen}
        onClose={() => setIsVocabModalOpen(false)}
      />

      {/* Teacher Classroom Guide Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}
