import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Volume2 } from 'lucide-react';
import { soundManager, speakText } from '../utils/audio';

interface LeafActorProps {
  isFound: boolean;
  onFound: () => void;
}

export const LeafActor: React.FC<LeafActorProps> = ({ isFound, onFound }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFound) {
      soundManager.playLeafClick();
      onFound();
    } else {
      soundManager.playPop();
      speakText('leaf');
    }
  };

  return (
    <motion.div
      id="floating-leaf-actor"
      initial={{ scale: 0, rotate: -20 }}
      animate={{
        scale: 1,
        y: isFound ? [0, -6, 0] : [0, -12, 0, -6, 0],
        x: isFound ? [0, 2, 0] : [0, 8, -6, 4, 0],
        rotate: isFound ? [0, 5, -5, 0] : [-8, 12, -10, 8, -8],
      }}
      transition={{
        y: { duration: isFound ? 2.5 : 4, repeat: Infinity, ease: 'easeInOut' },
        x: { duration: isFound ? 3 : 5, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: isFound ? 3 : 4.5, repeat: Infinity, ease: 'easeInOut' },
        scale: { type: 'spring', damping: 12 },
      }}
      className="relative z-30 cursor-pointer select-none group"
      onClick={handleClick}
      whileHover={{ scale: 1.15, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Found State Halo / Pulsing Glow */}
      {!isFound ? (
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute -inset-3 rounded-full bg-amber-400/30 blur-md pointer-events-none"
        />
      ) : (
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -inset-4 rounded-full bg-emerald-400/50 blur-lg pointer-events-none"
        />
      )}

      {/* Cute Floating Leaf SVG Illustration */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center drop-shadow-xl">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full filter drop-shadow-md transition-transform duration-300 group-hover:rotate-6"
        >
          <defs>
            {/* Natural Leaf Gradient */}
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="40%" stopColor="#22c55e" />
              <stop offset="70%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            <linearGradient id="leafGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#86efac" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Leaf Body - Cute stylized organic leaf */}
          <path
            d="M 50,10 
               C 65,18 85,30 82,55 
               C 80,75 62,86 50,92 
               C 38,86 20,75 18,55 
               C 15,30 35,18 50,10 Z"
            fill="url(#leafGrad)"
            stroke="#166534"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Gentle Highlight */}
          <path
            d="M 50,15 
               C 62,22 75,32 72,50 
               C 70,64 58,74 50,82 Z"
            fill="url(#leafGlow)"
            opacity="0.4"
          />

          {/* Leaf Stem & Main Vein */}
          <path
            d="M 50,12 Q 49,52 50,92 L 50,99"
            fill="none"
            stroke="#14532d"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Side Veins */}
          <path
            d="M 50,28 Q 62,24 68,26
               M 50,42 Q 66,38 72,43
               M 50,56 Q 64,54 68,61
               M 50,70 Q 60,69 62,75
               M 50,28 Q 38,24 32,26
               M 50,42 Q 34,38 28,43
               M 50,56 Q 36,54 32,61
               M 50,70 Q 40,69 38,75"
            fill="none"
            stroke="#14532d"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Cute Friendly Cartoon Face on Leaf */}
          <g>
            {/* Eyes */}
            <circle cx="43" cy="46" r="3" fill="#0f391b" />
            <circle cx="57" cy="46" r="3" fill="#0f391b" />
            {/* Eye sparkle highlights */}
            <circle cx="44" cy="45" r="1" fill="#ffffff" />
            <circle cx="58" cy="45" r="1" fill="#ffffff" />
            {/* Rosy Cheeks */}
            <circle cx="38" cy="50" r="2.5" fill="#f472b6" opacity="0.6" />
            <circle cx="62" cy="50" r="2.5" fill="#f472b6" opacity="0.6" />
            {/* Smiling Mouth */}
            <path
              d="M 46,51 Q 50,56 54,51"
              fill="none"
              stroke="#0f391b"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* Click Me! or Found! Badge */}
        {!isFound ? (
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 font-bold text-xs px-2.5 py-0.5 rounded-full shadow border border-amber-500 whitespace-nowrap flex items-center gap-1"
          >
            <span>点我! Click me</span>
            <Sparkles className="w-3 h-3 text-amber-900 animate-spin" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg border border-emerald-300 whitespace-nowrap flex items-center gap-1"
          >
            <span>找到了! Found leaf!</span>
            <Volume2 className="w-3.5 h-3.5" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
