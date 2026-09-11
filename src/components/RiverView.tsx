import React from 'react';
import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';
import { soundManager, speakText } from '../utils/audio';

interface RiverViewProps {
  hasLeaf: boolean;
  isFound: boolean;
}

export const RiverView: React.FC<RiverViewProps> = ({ hasLeaf, isFound }) => {
  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop();
    speakText('river');
  };

  return (
    <div
      id="scene-river"
      className={`relative w-full h-full rounded-3xl overflow-hidden border-4 transition-all duration-500 shadow-lg flex flex-col justify-between ${
        hasLeaf && !isFound
          ? 'border-sky-500 ring-4 ring-sky-300/40 shadow-sky-200/50'
          : 'border-sky-200/80 hover:border-sky-300'
      }`}
      style={{
        background: 'linear-gradient(180deg, #bae6fd 0%, #7dd3fc 30%, #38bdf8 65%, #0284c7 100%)',
      }}
    >
      {/* Sky & River Bridge / Distant Hills */}
      <div className="absolute top-4 left-0 right-0 px-4 flex justify-between items-center opacity-80">
        {/* Cute Flying Dragonflies */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-sm select-none"
        >
          🪰
        </motion.div>
        {/* Soft Distant Hills */}
        <div className="w-28 h-10 bg-teal-200/60 rounded-t-full" />
      </div>

      {/* River Banks (Green riverbanks on both sides) */}
      <div className="absolute top-16 left-0 w-8 h-48 bg-gradient-to-r from-emerald-500 to-lime-400 rounded-r-3xl shadow-sm" />
      <div className="absolute top-12 right-0 w-9 h-52 bg-gradient-to-l from-emerald-500 to-emerald-400 rounded-l-3xl shadow-sm" />

      {/* Animated Flowing Water Waves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Layer 1 Waves */}
        <motion.div
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 left-4 right-4 flex justify-around opacity-40"
        >
          <div className="w-14 h-1.5 bg-white rounded-full blur-[0.5px]" />
          <div className="w-20 h-1.5 bg-cyan-100 rounded-full blur-[0.5px]" />
        </motion.div>

        {/* Layer 2 Waves */}
        <motion.div
          animate={{ x: [15, -15, 15] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-44 left-6 right-6 flex justify-around opacity-50"
        >
          <div className="w-24 h-2 bg-white/90 rounded-full blur-[0.5px]" />
          <div className="w-16 h-1.5 bg-cyan-50 rounded-full" />
        </motion.div>

        {/* Water Ripples */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-36 left-1/3 w-16 h-8 rounded-full border border-white/60"
        />
      </div>

      {/* Cute Swimming Yellow Duckling */}
      <motion.div
        animate={{
          x: [10, 45, 10],
          y: [0, -3, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 left-12 flex items-center select-none"
      >
        <span className="text-2xl drop-shadow">🦆</span>
        <div className="w-3 h-1 bg-white/50 rounded-full ml-1" />
      </motion.div>

      {/* Jumping Little Fish */}
      <motion.div
        animate={{
          y: [0, -22, 0],
          rotate: [15, -25, 15],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeOut', repeatDelay: 1.5 }}
        className="absolute top-48 right-12 text-xl select-none"
      >
        🐟
      </motion.div>

      {/* Water Lilies & River Bank Reeds */}
      <div className="relative mt-auto w-full h-36 pointer-events-none">
        {/* River bottom & stepping stones */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-sky-900/60 via-sky-700/40 to-transparent" />

        {/* Lily Pads with Pink Lotus */}
        <div className="absolute bottom-10 left-6 flex items-center">
          <motion.div
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center"
          >
            {/* Lily Pad */}
            <div className="w-10 h-7 bg-emerald-600 rounded-full border-2 border-emerald-400 relative flex items-center justify-center shadow-md">
              <div className="w-2.5 h-2.5 bg-sky-500 rounded-full -ml-3" />
              {/* Pink Lotus */}
              <div className="text-sm -mt-2">🪷</div>
            </div>
          </motion.div>
        </div>

        {/* River Reeds / Cattails on Bank */}
        <div className="absolute bottom-6 right-4 flex items-end gap-1.5">
          <motion.div
            animate={{ rotate: [3, -3, 3] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <div className="w-2 h-7 bg-amber-900 rounded-full" />
            <div className="w-1 h-10 bg-emerald-700 rounded-full -mt-2" />
          </motion.div>
          <div className="text-base select-none">🐸</div>
        </div>

        {/* River Pebbles */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-4 h-2.5 bg-slate-400/80 rounded-full shadow-inner" />
          <div className="w-5 h-3 bg-slate-300/80 rounded-full shadow-inner" />
          <div className="w-3.5 h-2 bg-slate-500/80 rounded-full shadow-inner" />
        </div>
      </div>

      {/* Target landing area hint marker */}
      {hasLeaf && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-sky-300/50 animate-ping opacity-25" />
        </div>
      )}

      {/* Bottom Word Label & Pronunciation Button */}
      <div className="relative z-10 p-3 bg-gradient-to-t from-sky-950/60 via-sky-900/20 to-transparent">
        <button
          type="button"
          onClick={handlePronounce}
          className="w-full py-2.5 px-3 bg-white/95 hover:bg-white text-slate-800 rounded-2xl shadow-md border-2 border-sky-300 hover:border-sky-400 active:scale-95 transition-all flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌊</span>
            <div className="text-left leading-tight">
              <div className="text-xl font-bold font-['Fredoka',sans-serif] text-sky-900 group-hover:text-sky-700 tracking-wide">
                river
              </div>
              <div className="text-[11px] font-semibold text-sky-600">河流 / 江河</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 group-hover:bg-sky-100 transition-colors">
            <Volume2 className="w-3.5 h-3.5" />
            <span>/ˈrɪv.ər/</span>
          </div>
        </button>
      </div>
    </div>
  );
};
