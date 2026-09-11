import React from 'react';
import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';
import { soundManager, speakText } from '../utils/audio';

interface ForestViewProps {
  hasLeaf: boolean;
  isFound: boolean;
}

export const ForestView: React.FC<ForestViewProps> = ({ hasLeaf, isFound }) => {
  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop();
    speakText('forest');
  };

  return (
    <div
      id="scene-forest"
      className={`relative w-full h-full rounded-3xl overflow-hidden border-4 transition-all duration-500 shadow-lg flex flex-col justify-between ${
        hasLeaf && !isFound
          ? 'border-emerald-500 ring-4 ring-emerald-300/40 shadow-emerald-200/50'
          : 'border-emerald-200/80 hover:border-emerald-300'
      }`}
      style={{
        background: 'linear-gradient(180deg, #c7d2fe 0%, #a7f3d0 35%, #059669 70%, #064e3b 100%)',
      }}
    >
      {/* Sunbeams filtering through canopy */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div
          className="absolute -top-10 left-10 w-24 h-96 bg-gradient-to-b from-amber-100/50 via-emerald-100/20 to-transparent rotate-12 blur-sm"
        />
        <div
          className="absolute -top-10 right-8 w-20 h-96 bg-gradient-to-b from-amber-100/40 via-emerald-100/10 to-transparent -rotate-12 blur-sm"
        />
      </div>

      {/* Background Mountain / Deep Trees */}
      <div className="absolute top-10 left-0 right-0 flex justify-between px-2 opacity-75">
        <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[60px] border-b-emerald-800/80" />
        <div className="w-0 h-0 border-l-[35px] border-l-transparent border-r-[35px] border-r-transparent border-b-[80px] border-b-teal-900/80" />
        <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[70px] border-b-emerald-900/80" />
      </div>

      {/* Midground Pine Trees & Oak Canopy */}
      <div className="relative mt-8 px-4 flex justify-between items-end pointer-events-none">
        {/* Left Pine Tree */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-emerald-600 drop-shadow-sm" />
            <div className="-mt-3 w-0 h-0 border-l-[26px] border-l-transparent border-r-[26px] border-r-transparent border-b-[36px] border-b-emerald-700 drop-shadow-sm" />
            <div className="-mt-3 w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[42px] border-b-emerald-800 drop-shadow-sm" />
          </motion.div>
          <div className="w-3.5 h-7 bg-amber-900 rounded-b" />
        </div>

        {/* Cute Peeking Squirrel on a branch */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center -mb-2"
        >
          <div className="text-2xl select-none">🐿️</div>
          <div className="text-[10px] bg-amber-900/40 text-amber-100 px-1 rounded-full">🌰</div>
        </motion.div>

        {/* Right Oak Tree with layered round leaves */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: [1, -1, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-16 h-16"
          >
            <div className="absolute top-0 left-2 w-12 h-12 rounded-full bg-emerald-500 shadow-md" />
            <div className="absolute top-2 left-0 w-11 h-11 rounded-full bg-emerald-600" />
            <div className="absolute top-2 right-0 w-11 h-11 rounded-full bg-teal-600" />
            <div className="absolute top-1 left-3 w-10 h-10 rounded-full bg-green-400 opacity-60" />
          </motion.div>
          <div className="w-4 h-8 bg-amber-950 rounded-b" />
        </div>
      </div>

      {/* Forest Floor, Moss & Red Spotted Mushrooms */}
      <div className="relative mt-auto w-full h-36 pointer-events-none">
        {/* Mossy Hillock */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-emerald-950 via-emerald-800 to-emerald-700 rounded-t-[60px] shadow-inner" />

        {/* Mushrooms and woodland flowers */}
        <div className="absolute bottom-6 left-4 flex items-end gap-2">
          {/* Big Mushroom */}
          <div className="flex flex-col items-center">
            <div className="w-7 h-4 bg-red-500 rounded-t-full relative shadow-sm flex justify-around px-1 pt-0.5">
              <span className="w-1 h-1 bg-white rounded-full" />
              <span className="w-1 h-1 bg-white rounded-full" />
              <span className="w-1 h-1 bg-white rounded-full" />
            </div>
            <div className="w-2.5 h-3 bg-amber-100 rounded-b" />
          </div>

          {/* Small Mushroom */}
          <div className="flex flex-col items-center">
            <div className="w-5 h-3 bg-red-400 rounded-t-full relative shadow-sm flex justify-center pt-0.5">
              <span className="w-1 h-1 bg-white rounded-full" />
            </div>
            <div className="w-2 h-2.5 bg-amber-100 rounded-b" />
          </div>

          <div className="text-xs">🌿</div>
        </div>

        {/* Right side woodland elements */}
        <div className="absolute bottom-6 right-5 flex items-end gap-1.5">
          <div className="text-xs">🌱</div>
          <div className="text-base select-none">🦉</div>
          <div className="text-xs">🍄</div>
        </div>

        {/* Mossy Log */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-20 h-4 bg-amber-950 rounded-full border-b-2 border-emerald-900 overflow-hidden">
          <div className="w-10 h-1.5 bg-emerald-600 rounded-full mx-auto" />
        </div>
      </div>

      {/* Target landing area hint marker */}
      {hasLeaf && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-400/50 animate-ping opacity-25" />
        </div>
      )}

      {/* Bottom Word Label & Pronunciation Button */}
      <div className="relative z-10 p-3 bg-gradient-to-t from-emerald-950/60 via-emerald-900/20 to-transparent">
        <button
          type="button"
          onClick={handlePronounce}
          className="w-full py-2.5 px-3 bg-white/95 hover:bg-white text-slate-800 rounded-2xl shadow-md border-2 border-emerald-300 hover:border-emerald-400 active:scale-95 transition-all flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌲</span>
            <div className="text-left leading-tight">
              <div className="text-xl font-bold font-['Fredoka',sans-serif] text-emerald-900 group-hover:text-emerald-700 tracking-wide">
                forest
              </div>
              <div className="text-[11px] font-semibold text-emerald-600">森林 / 树林</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 group-hover:bg-emerald-100 transition-colors">
            <Volume2 className="w-3.5 h-3.5" />
            <span>/ˈfɒr.ɪst/</span>
          </div>
        </button>
      </div>
    </div>
  );
};
