import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, Mic, MicOff, CheckCircle2, Award, RotateCcw } from 'lucide-react';
import { LocationKey } from '../types';
import { LOCATIONS } from '../data/locations';
import { soundManager, speakText } from '../utils/audio';

interface SentenceBannerProps {
  currentLocation: LocationKey;
  grammarMode: 'in' | 'direct';
  isLeafFound: boolean;
  hasReadSentence: boolean;
  onSentenceScored: () => void;
  onNextRound: () => void;
  streak: number;
}

export const SentenceBanner: React.FC<SentenceBannerProps> = ({
  currentLocation,
  grammarMode,
  isLeafFound,
  hasReadSentence,
  onSentenceScored,
  onNextRound,
  streak,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechResult, setSpeechResult] = useState<string | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const loc = LOCATIONS[currentLocation];

  // Construct words according to grammar mode
  const sentenceWords = grammarMode === 'in'
    ? ['The', 'leaf', 'is in', 'the', loc.english]
    : ['The', 'leaf', 'is', 'the', loc.english];

  const fullSentenceText = grammarMode === 'in'
    ? `The leaf is in the ${loc.english}.`
    : `The leaf is the ${loc.english}.`;

  // Read the full sentence aloud
  const handleReadAloud = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.playPop();
    setIsPlayingAudio(true);

    // Simulate word highlight step
    sentenceWords.forEach((_, idx) => {
      setTimeout(() => {
        setHighlightedWordIndex(idx);
      }, idx * 450);
    });

    speakText(fullSentenceText, () => {
      setIsPlayingAudio(false);
      setHighlightedWordIndex(null);
    });
  };

  // Click individual word for targeted learning
  const handleWordClick = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop();
    speakText(word);
  };

  // Speech Recognition using Web Speech API
  const handleToggleListening = () => {
    soundManager.playPop();
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError('您的浏览器未开启麦克风语音识别，请直接点击“老师打分/已读对”加分哦！');
      setTimeout(() => setSpeechError(null), 4000);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognition as any)();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;

      setIsListening(true);
      setSpeechResult('正在倾听... 请大声读出句子！');
      setSpeechError(null);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        setIsListening(false);
        const transcript = event.results[0][0].transcript.toLowerCase();
        setSpeechResult(`听到: "${transcript}"`);

        // Check if student included leaf and location word
        const matchedLeaf = transcript.includes('leaf') || transcript.includes('leave');
        const matchedLoc = transcript.includes(loc.english);
        const matchedSentence = transcript.includes('the leaf') || (matchedLeaf && matchedLoc);

        if (matchedSentence || matchedLoc) {
          soundManager.playSuccessFanfare();
          onSentenceScored();
        } else {
          setSpeechError(`再试一次哦！要包含单词 "${loc.english}"`);
          setTimeout(() => setSpeechError(null), 3000);
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError('请在浏览器允许麦克风权限，或点击“读对啦”直接加分！');
        } else {
          setSpeechError('没有听清，请再试一次，或者点击“读对啦”！');
        }
        setTimeout(() => setSpeechError(null), 3500);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      setSpeechError('语音识别未就绪，请使用快速评分按钮');
    }
  };

  const handleTeacherPass = () => {
    soundManager.playSuccessFanfare();
    onSentenceScored();
  };

  return (
    <div
      id="top-sentence-banner"
      className="w-full max-w-5xl mx-auto mb-4 p-4 md:p-5 rounded-3xl bg-white/95 backdrop-blur-md shadow-xl border-4 border-amber-300 relative overflow-hidden transition-all duration-300"
    >
      {/* Decorative cute corner stickers */}
      <div className="absolute -top-3 -right-3 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-xl shadow-sm select-none">
        ⭐
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Sentence prompt with playful highlighted word chips */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              本轮目标句型 Target Sentence
            </span>

            {/* Streak indicator */}
            {streak > 1 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-300 animate-pulse">
                🔥 {streak} 连胜 Combo!
              </span>
            )}
          </div>

          {/* Large Kid-Friendly Interactive Sentence Display */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 md:gap-2 text-2xl md:text-3xl lg:text-4xl font-extrabold font-['Fredoka',sans-serif] tracking-wide">
            {sentenceWords.map((word, idx) => {
              const isLeaf = word.toLowerCase().includes('leaf');
              const isLocation = word.toLowerCase().includes(loc.english);
              const isHighlighted = highlightedWordIndex === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleWordClick(word, e)}
                  title="点击发音 Click to pronounce"
                  className={`relative px-2.5 py-1 rounded-2xl transition-all duration-200 cursor-pointer active:scale-95 select-none ${
                    isHighlighted
                      ? 'bg-amber-300 text-amber-950 scale-110 shadow-md ring-2 ring-amber-500'
                      : isLeaf
                      ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300 hover:bg-emerald-200'
                      : isLocation
                      ? `${loc.tagBg} border-2 border-current hover:opacity-90 shadow-sm`
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {word}
                    {isLeaf && <span className="text-lg md:text-xl">🍃</span>}
                    {isLocation && <span className="text-lg md:text-xl">{loc.badgeEmoji}</span>}
                  </span>
                </button>
              );
            })}
            <span className="text-slate-400 font-bold">.</span>
          </div>

          {/* Chinese Translation & Guidance */}
          <div className="mt-1 text-sm md:text-base font-semibold text-slate-600 flex items-center justify-center md:justify-start gap-2">
            <span>中文意义：</span>
            <span className="text-emerald-700 font-bold">树叶</span>
            <span>在</span>
            <span className="font-bold text-slate-900 underline decoration-amber-400 decoration-2">
              {loc.chinese.split('/')[0]}
            </span>
            <span>里/上。</span>
            <span className="text-xs text-slate-600 hidden lg:inline">
              (点击单词可单独听发音哦)
            </span>
          </div>
        </div>

        {/* Right Side: Action Controls (Read Aloud, Voice Mic, Teacher Score Check) */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Read Aloud Button */}
          <button
            type="button"
            onClick={handleReadAloud}
            disabled={isPlayingAudio}
            className={`px-3.5 py-2.5 rounded-2xl font-bold text-sm shadow-md border-2 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              isPlayingAudio
                ? 'bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-300 animate-pulse'
                : 'bg-white hover:bg-amber-50 text-amber-900 border-amber-300 hover:border-amber-400'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlayingAudio ? '播放中...' : '听示范音'}</span>
          </button>

          {/* Voice Input Mic */}
          <button
            type="button"
            onClick={handleToggleListening}
            className={`px-3.5 py-2.5 rounded-2xl font-bold text-sm shadow-md border-2 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              isListening
                ? 'bg-rose-500 text-white border-rose-600 ring-4 ring-rose-300 animate-pulse'
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isListening ? '倾听中...' : '语音跟读'}</span>
          </button>

          {/* Quick Teacher Check / Self-Check scoring button */}
          {!hasReadSentence ? (
            <button
              type="button"
              id="btn-teacher-pass"
              onClick={handleTeacherPass}
              className={`px-4 py-2.5 rounded-2xl font-extrabold text-sm shadow-lg border-2 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                isLeafFound
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600 ring-4 ring-emerald-200 animate-bounce'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isLeafFound ? '读对得分! (+100)' : '读对啦 (+100)'}</span>
            </button>
          ) : (
            <button
              type="button"
              id="btn-next-round-banner"
              onClick={onNextRound}
              className="px-5 py-2.5 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg border-2 border-amber-600 ring-4 ring-amber-200 transition-all flex items-center gap-2 cursor-pointer active:scale-95 animate-pulse"
            >
              <RotateCcw className="w-4 h-4" />
              <span>继续游戏 Next Round</span>
            </button>
          )}
        </div>
      </div>

      {/* Voice feedback banner / errors */}
      <AnimatePresence>
        {(speechResult || speechError) && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`mt-2.5 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
              speechError
                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
          >
            <span>{speechError || speechResult}</span>
            {hasReadSentence && (
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <Award className="w-3.5 h-3.5" /> 读得真棒！
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
