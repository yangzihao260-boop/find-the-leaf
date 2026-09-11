import confetti from 'canvas-confetti';

export function fireLeafConfetti() {
  try {
    // Burst of colorful leaf-like confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#86efac', '#eab308', '#f59e0b', '#38bdf8'],
      shapes: ['circle'],
      scalar: 1.2,
    });
  } catch {
    // Ignore in unsupported environments
  }
}

export function fireVictoryConfetti() {
  try {
    const end = Date.now() + 800;
    const colors = ['#22c55e', '#fbbf24', '#38bdf8', '#f43f5e', '#a855f7'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {
    // Ignore
  }
}
