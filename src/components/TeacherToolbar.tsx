import React from 'react';
import { Volume2, VolumeX, Music, Music2, BookOpen, Star, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TeacherToolbarProps {
  score: number;
  streak: number;
  round: number;
  grammarMode: 'in' | 'direct';
  onToggleGrammar: () => void;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
  isSfxMuted: boolean;
  onToggleSfx: () => void;
  onOpenVocabulary: () => void;
  onResetGame: () => void;
  onOpenHelp: () => void;
}

export const TeacherToolbar: React.FC<TeacherToolbarProps> = ({
  score,
  streak,
  round,
  grammarMode,
  onToggleGrammar,
  isBgmPlaying,
  onToggleBgm,
  isSfxMuted,
  onToggleSfx,
  onOpenVocabulary,
  onResetGame,
  onOpenHelp,
}) => {
  return (
    <header className="w-full max-w-5xl mx-auto mb-3 flex flex-wrap items-center justify-between gap-3 px-3 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border border-amber-200">
      {/* App Brand & Round info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-xl shadow-md border border-emerald-300">
          🍃
        </div>
        <div>
          <div className="font-extrabold text-base md:text-lg font-['Fredoka',sans-serif] text-slate-800 leading-tight flex items-center gap-1.5">
            <span>Where is the Leaf?</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              第 {round} 轮
            </span>
          </div>
          <div className="text-[11px] font-semibold text-slate-500 hidden sm:block">
            小学英语课堂单词句型互动游戏 · leaf · field · forest · river
          </div>
        </div>
      </div>

      {/* Score & Stars Display */}
      <div className="flex items-center gap-2 bg-amber-50 px-3.5 py-1.5 rounded-2xl border border-amber-200 shadow-sm">
        <div className="flex items-center text-amber-500">
          <Star className="w-5 h-5 fill-amber-400 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <div className="text-left">
          <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">得分 Score</div>
          <div className="text-xl font-black font-['Fredoka',sans-serif] text-amber-900 leading-none">
            {score}
          </div>
        </div>
        {streak > 1 && (
          <div className="ml-1 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-lg border border-orange-200">
            🔥 x{streak}
          </div>
        )}
      </div>

      {/* Controls & Quick Toggles */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Grammar Mode Switcher */}
        <button
          type="button"
          onClick={() => {
            soundManager.playPop();
            onToggleGrammar();
          }}
          title="切换句型语法模式"
          className="px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 cursor-pointer bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>句型: {grammarMode === 'in' ? 'The leaf is in...' : 'The leaf is the...'}</span>
        </button>

        {/* Vocabulary Flashcards Modal button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playPop();
            onOpenVocabulary();
          }}
          title="词汇卡片 Core Vocabulary"
          className="p-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span className="hidden md:inline">词汇卡</span>
        </button>

        {/* BGM Toggle */}
        <button
          type="button"
          onClick={() => {
            soundManager.playPop();
            onToggleBgm();
          }}
          title={isBgmPlaying ? '静音背景音乐' : '开启背景音乐'}
          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
            isBgmPlaying
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : 'bg-slate-100 text-slate-400 border-slate-200'
          }`}
        >
          {isBgmPlaying ? <Music className="w-4 h-4 text-emerald-700 animate-bounce" /> : <Music2 className="w-4 h-4 text-slate-400" />}
        </button>

        {/* SFX Toggle */}
        <button
          type="button"
          onClick={() => {
            soundManager.playPop();
            onToggleSfx();
          }}
          title={isSfxMuted ? '开启音效' : '静音音效'}
          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
            !isSfxMuted
              ? 'bg-amber-100 text-amber-800 border-amber-300'
              : 'bg-slate-100 text-slate-400 border-slate-200'
          }`}
        >
          {!isSfxMuted ? <Volume2 className="w-4 h-4 text-amber-700" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
        </button>

        {/* Help Info Button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playPop();
            onOpenHelp();
          }}
          title="课堂教学玩法指引"
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Reset Game */}
        <button
          type="button"
          onClick={() => {
            soundManager.playPop();
            onResetGame();
          }}
          title="重新开始游戏"
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 border border-slate-200 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
