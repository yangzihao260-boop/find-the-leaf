import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, BookOpen } from 'lucide-react';
import { CORE_VOCABULARY } from '../data/locations';
import { soundManager, speakText } from '../utils/audio';

interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VocabularyModal: React.FC<VocabularyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleWordSpeak = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop();
    speakText(word);
  };

  const handleExampleSpeak = (sentence: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop();
    speakText(sentence);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-4 px-6 flex items-center justify-between text-amber-950">
            <div className="flex items-center gap-2 font-bold text-xl font-['Fredoka',sans-serif]">
              <BookOpen className="w-6 h-6 text-amber-900" />
              <span>本课核心词汇表 Core Vocabulary</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[75vh] overflow-y-auto">
            {CORE_VOCABULARY.map((item) => (
              <div
                key={item.word}
                className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/50 hover:bg-amber-50 hover:border-amber-300 transition-all flex flex-col justify-between shadow-sm group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl select-none">{item.emoji}</span>
                    <div>
                      <div className="text-2xl font-extrabold font-['Fredoka',sans-serif] text-slate-800 flex items-center gap-2">
                        {item.word}
                        <button
                          type="button"
                          onClick={(e) => handleWordSpeak(item.word, e)}
                          title="点击发音"
                          className="p-1 rounded-full text-amber-600 hover:text-amber-800 hover:bg-amber-200/60 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs font-mono text-emerald-700 font-bold">{item.phonetic}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2.5 border-t border-amber-200/70 text-sm">
                  <div className="font-bold text-slate-700">{item.chinese}</div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                    <span className="italic">例句: {item.example}</span>
                    <button
                      type="button"
                      onClick={(e) => handleExampleSpeak(item.example, e)}
                      title="朗读例句"
                      className="text-amber-600 hover:text-amber-800 p-0.5 ml-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
            <span>💡 提示：点击喇叭可播放标准英文发音，方便全班领读与跟读</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow cursor-pointer active:scale-95"
            >
              关闭并返回游戏
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
