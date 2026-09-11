/**
 * Web Audio API Synthesizer & Speech Audio Utilities
 * All sound effects & cheerful background music are synthesized client-side
 * ensuring 100% reliable offline playback with zero missing external audio files.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isBgmPlaying = false;
  private bgmTimeout: number | null = null;
  private bgmStep = 0;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.value = 0.18; // soft relaxing volume
      this.bgmGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.35;
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- Sound Effects ---

  // Cute bubble pop when clicking buttons or cards
  playPop() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignore audio context errors
    }
  }

  // Gentle wind breeze when leaf floats
  playBreeze() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      // Soft filtered white noise sweep
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.2);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.4);
      filter.Q.value = 3.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(now);
      noise.stop(now + 0.4);
    } catch {
      // Ignore
    }
  }

  // Cheerful chime when clicking the leaf
  playLeafClick() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (major arpeggio)
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.05;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch {
      // Ignore
    }
  }

  // Celebratory reward fanfare when sentence is read and score awarded
  playSuccessFanfare() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      // Vibrant celebratory chord progression
      const chords = [
        { freqs: [523.25, 659.25, 783.99], time: 0, dur: 0.15 },
        { freqs: [587.33, 739.99, 880.00], time: 0.15, dur: 0.15 },
        { freqs: [659.25, 830.61, 987.77], time: 0.30, dur: 0.15 },
        { freqs: [783.99, 987.77, 1174.66, 1567.98], time: 0.45, dur: 0.5 },
      ];
      const now = this.ctx.currentTime;

      chords.forEach((chord) => {
        chord.freqs.forEach((freq) => {
          if (!this.ctx || !this.sfxGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const startTime = now + chord.time;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.2, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + chord.dur);

          osc.connect(gain);
          gain.connect(this.sfxGain);

          osc.start(startTime);
          osc.stop(startTime + chord.dur);
        });
      });
    } catch {
      // Ignore
    }
  }

  // --- Relaxing & Cheerful BGM Engine ---
  // Gentle pentatonic music-box / marimba melody
  startBGM() {
    this.initCtx();
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    this.bgmStep = 0;
    this.playNextBgmNote();
  }

  stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimeout) {
      window.clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
  }

  private playNextBgmNote() {
    if (!this.isBgmPlaying) return;
    try {
      if (this.ctx && this.bgmGain) {
        // Cheerful C major pentatonic melody loop (C4, D4, E4, G4, A4, C5)
        const melody = [
          523.25, 659.25, 783.99, 659.25,
          587.33, 523.25, 659.25, 783.99,
          880.00, 783.99, 659.25, 523.25,
          587.33, 659.25, 587.33, 523.25,
          659.25, 783.99, 1046.5, 783.99,
          880.00, 783.99, 659.25, 587.33,
          523.25, 659.25, 587.33, 523.25,
          392.00, 523.25, 659.25, 523.25,
        ];

        const bass = [
          261.63, 0, 329.63, 0,
          293.66, 0, 261.63, 0,
          349.23, 0, 329.63, 0,
          293.66, 0, 261.63, 0,
          261.63, 0, 329.63, 0,
          349.23, 0, 329.63, 0,
          293.66, 0, 261.63, 0,
          196.00, 0, 261.63, 0,
        ];

        const noteFreq = melody[this.bgmStep % melody.length];
        const bassFreq = bass[this.bgmStep % bass.length];
        const now = this.ctx.currentTime;

        // Play melody note (marimba/kalimba timbre)
        if (noteFreq > 0) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(noteFreq, now);

          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          osc.connect(gain);
          gain.connect(this.bgmGain);
          osc.start(now);
          osc.stop(now + 0.35);
        }

        // Play soft accompaniment base note
        if (bassFreq > 0) {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(bassFreq, now);

          bassGain.gain.setValueAtTime(0.05, now);
          bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

          bassOsc.connect(bassGain);
          bassGain.connect(this.bgmGain);
          bassOsc.start(now);
          bassOsc.stop(now + 0.5);
        }

        this.bgmStep++;
      }
    } catch {
      // Ignore
    }

    // Step duration 320ms (~94 BPM, relaxed pace)
    this.bgmTimeout = window.setTimeout(() => {
      this.playNextBgmNote();
    }, 320);
  }

  setBgmVolume(val: number) {
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  setSfxMute(muted: boolean) {
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(muted ? 0 : 0.35, this.ctx.currentTime);
    }
  }
}

export const soundManager = new SoundController();

/**
 * Text-to-Speech Helper using Web Speech API
 */
export function speakText(text: string, onEnd?: () => void, rate = 0.88): SpeechSynthesisUtterance | null {
  if (!('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return null;
  }

  window.speechSynthesis.cancel(); // cancel any ongoing speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate; // slightly slower for elementary English learners
  utterance.pitch = 1.1; // friendly, cheerful pitch

  // Pick a nice English voice if available
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(
    (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Daniel'))
  ) || voices.find((v) => v.lang.startsWith('en'));

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  if (onEnd) {
    utterance.onend = () => onEnd();
    utterance.onerror = () => onEnd();
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
}
