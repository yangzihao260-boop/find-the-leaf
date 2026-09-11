import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, CheckCircle2, Volume2, Sparkles } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 px-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-2 font-bold text-xl font-['Fredoka',sans-serif]">
              <HelpCircle className="w-6 h-6" />
              <span>小学英语备课教学指引 Teacher's Guide</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-slate-700 text-sm">
            {/* 1. 教学目标 */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
              <h4 className="font-bold text-base text-amber-900 flex items-center gap-2 mb-2 font-['Fredoka',sans-serif]">
                <Sparkles className="w-4 h-4 text-amber-600" />
                本课学习目标 (Learning Goals)
              </h4>
              <ul className="space-y-1.5 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">● 4大核心词汇:</span>
                  <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-200">leaf</span>
                  <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-200">field</span>
                  <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-200">forest</span>
                  <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-200">river</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">● 核心句型:</span>
                  <span className="font-semibold text-slate-900">
                    The leaf is in the field / forest / river. (支持切换课本原句)
                  </span>
                </li>
              </ul>
            </div>

            {/* 2. 课堂互动 4 步走 */}
            <div>
              <h4 className="font-bold text-base text-slate-900 mb-2.5 font-['Fredoka',sans-serif]">
                🎯 课堂互动 4 步教学流程:
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">观察落点 (Observe)</div>
                    <div className="text-xs text-slate-600">
                      树叶在空中飘动后，落在三个场景之一（田野/森林/河流），上方即时呈现目标句子。
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">找树叶 & 听发音 (Find & Tap)</div>
                    <div className="text-xs text-slate-600">
                      请学生上前触摸或使用鼠标点击叶子，叶子会欢呼发光并伴随清脆音效。点击下方场景单词可单独发音。
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">朗读句子 (Read Aloud)</div>
                    <div className="text-xs text-slate-600">
                      学生大声朗读上方句子。可使用麦克风智能识别，或由老师点击“读对啦”直接给学生加分与金星奖励！
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    4
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">继续挑战 (Next Round)</div>
                    <div className="text-xs text-slate-600">
                      点击“继续游戏”，树叶再次迎风飘起，随机飞向下一个地点，保持孩子们高度专注与兴奋！
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. 音效与设置 */}
            <div className="p-3 rounded-xl bg-emerald-50 text-xs text-emerald-900 flex items-center gap-2 border border-emerald-200">
              <Volume2 className="w-5 h-5 shrink-0 text-emerald-700" />
              <span>配备了愉快的 Web Audio 合成背景音乐和点击音效，无需下载外部音频，断网也能流畅使用。</span>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>知道了，开始教学！</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
