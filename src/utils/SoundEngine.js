class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.enabled = true;
  }

  playNote(freq, duration = 0.05) {
    if (!this.ctx || !this.enabled) return;
    
    if (this.ctx.state === 'suspended') {
        this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playVal(val, maxVal) {
    // Map val to freq between 200Hz and 1000Hz
    const freq = 200 + (val / maxVal) * 800;
    this.playNote(freq);
  }
}

export const soundEngine = new SoundEngine();
