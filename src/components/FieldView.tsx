import React from 'react';
import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';
import { soundManager, speakText } from '../utils/audio';

interface FieldViewProps {
  hasLeaf: boolean;
  isFound: boolean;
}

export const FieldView: React.FC<FieldViewProps> = ({ hasLeaf, isFound }) => {
  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop();
    speakText('field');
  };

  return (
    <div
      id="scene-field"
      className={`relative w-full h-full rounded-3xl overflow-hidden border-4 transition-all duration-500 shadow-lg flex flex-col justify-between ${
        hasLeaf && !isFound
          ? 'border-amber-400 ring-4 ring-amber-300/40 shadow-amber-200/50'
          : 'border-amber-200/80 hover:border-amber-300'
      }`}
      style={{
        background: 'linear-gradient(180deg, #dbeafe 0%, #fef3c7 40%, #86efac 75%, #4ade80 100%)',
      }}
    >
      {/* Sky & Sun */}
      <div className="absolute top-3 left-4 flex items-center gap-1">
        {/* Cute Warm Sun */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-md shadow-amber-300/60 flex items-center justify-center relative"
        >
          {/* Sun rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <div
              key={deg}
              className="absolute w-1.5 h-3 bg-amber-400 rounded-full -top-1"
              style={{ transformOrigin: '50% 24px', transform: `rotate(${deg}deg)` }}
            />
          ))}
          <div className="text-amber-900 text-[10px] font-bold">☀️</div>
        </motion.div>
      </div>

      {/* Fluffy Clouds */}
      <motion.div
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-4 right-6 w-16 h-6 bg-white/80 rounded-full shadow-sm"
      >
        <div className="absolute -top-3 left-2 w-7 h-7 bg-white/80 rounded-full" />
        <div className="absolute -top-2 left-6 w-6 h-6 bg-white/80 rounded-full" />
      </motion.div>

      {/* Cute Windmill */}
      <div className="absolute top-12 right-5 flex flex-col items-center">
        {/* Windmill Rotor */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute w-12 h-12 flex items-center justify-center"
          >
            {/* 4 Blades */}
            <div className="absolute w-1 h-12 bg-amber-800/80 rounded-full" />
            <div className="absolute w-12 h-1 bg-amber-800/80 rounded-full" />
            <div className="absolute -top-0.5 w-3 h-5 bg-amber-100 border border-amber-700/60 rounded" />
            <div className="absolute -bottom-0.5 w-3 h-5 bg-amber-100 border border-amber-700/60 rounded" />
            <div className="absolute -left-0.5 w-5 h-3 bg-amber-100 border border-amber-700/60 rounded" />
            <div className="absolute -right-0.5 w-5 h-3 bg-amber-100 border border-amber-700/60 rounded" />
          </motion.div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-900 z-10" />
        </div>
        {/* Windmill Body */}
        <div
          className="w-8 h-12 bg-amber-200 border-2 border-amber-700/50 rounded-b-md shadow-sm relative overflow-hidden"
          style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }}
        >
          <div className="w-2 h-3 bg-amber-800/70 rounded-t-full mx-auto mt-2" />
        </div>
      </div>

      {/* Butterfly fluttering */}
      <motion.div
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -12, 6, 0],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-24 left-10 text-base select-none pointer-events-none"
      >
        🦋
      </motion.div>

      {/* Rolling Hills & Wheat Fields */}
      <div className="relative mt-auto w-full h-44 pointer-events-none">
        {/* Back Hill */}
        <div className="absolute bottom-16 left-0 right-0 h-28 bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 rounded-t-[100px] opacity-90" />

        {/* Foreground Meadow */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-lime-400 via-emerald-400 to-emerald-500 rounded-t-[70px] shadow-inner" />

        {/* Wheat Stalks & Sunflowers */}
        <div className="absolute bottom-6 left-3 flex items-end gap-2">
          {/* Sunflowers */}
          <motion.div
            animate={{ rotate: [-2, 3, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <div className="text-xl">🌻</div>
            <div className="w-1 h-6 bg-green-600 rounded-full" />
          </motion.div>
          {/* Wheat Stalks */}
          <motion.div
            animate={{ rotate: [2, -3, 2] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-lg text-amber-600"
          >
            🌾
          </motion.div>
          <div className="text-sm">🌼</div>
        </div>

        {/* Right side flowers */}
        <div className="absolute bottom-6 right-4 flex items-end gap-1.5">
          <motion.div
            animate={{ rotate: [3, -2, 3] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-lg"
          >
            🌻
          </motion.div>
          <div className="text-base">🌷</div>
          <div className="text-sm">🌾</div>
        </div>

        {/* Little Fence */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-1.5 h-6 bg-amber-100 border border-amber-600/40 rounded-t-sm" />
          ))}
          <div className="absolute top-2 left-0 right-0 h-1 bg-amber-200/90 border-t border-b border-amber-600/40" />
        </div>
      </div>

      {/* Target landing area hint marker */}
      {hasLeaf && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-amber-400/40 animate-ping opacity-25" />
        </div>
      )}

      {/* Bottom Word Label & Pronunciation Button */}
      <div className="relative z-10 p-3 bg-gradient-to-t from-emerald-900/40 via-emerald-800/10 to-transparent">
        <button
          type="button"
          onClick={handlePronounce}
          className="w-full py-2.5 px-3 bg-white/95 hover:bg-white text-slate-800 rounded-2xl shadow-md border-2 border-amber-300 hover:border-amber-400 active:scale-95 transition-all flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <div className="text-left leading-tight">
              <div className="text-xl font-bold font-['Fredoka',sans-serif] text-amber-900 group-hover:text-amber-600 tracking-wide">
                field
              </div>
              <div className="text-[11px] font-semibold text-emerald-700">田野 / 原野</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 group-hover:bg-amber-100 transition-colors">
            <Volume2 className="w-3.5 h-3.5" />
            <span>/fiːld/</span>
          </div>
        </button>
      </div>
    </div>
  );
};
