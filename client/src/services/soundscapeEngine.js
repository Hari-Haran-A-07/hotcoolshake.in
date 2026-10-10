// HOT COOL SHAKE™ - Quantum Web Audio API Synthesizer
// Generates luxury binaural ambiance, thermal steam hiss, cryo crystal resonance, and sonic vortex frequencies directly in browser.

class SoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.activePreset = null;
    this.isPlaying = false;
    this.volume = 0.45;
    this.nodes = [];
    this.analyser = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  stop() {
    if (!this.ctx) return;
    this.nodes.forEach((node) => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {
        // Ignored safe teardown
      }
    });
    this.nodes = [];
    this.isPlaying = false;
    this.activePreset = null;
  }

  createPinkNoise() {
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    return whiteNoise;
  }

  play(presetKey) {
    this.init();
    this.stop();

    const t = this.ctx.currentTime;
    this.activePreset = presetKey;
    this.isPlaying = true;

    if (presetKey === 'MILAN_BLOOM') {
      // Warm thermal steam hiss & rich low harmonic espresso drone
      const noise = this.createPinkNoise();
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, t);
      filter.Q.setValueAtTime(3.5, t);

      // Gentle LFO modulating steam flow
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.3, t);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(400, t);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.25, t);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      // Deep harmonic warm hum (108 Hz + 216 Hz)
      const drone = this.ctx.createOscillator();
      drone.type = 'sine';
      drone.frequency.setValueAtTime(108, t);
      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.18, t);
      drone.connect(droneGain);
      droneGain.connect(this.masterGain);

      noise.start(t);
      lfo.start(t);
      drone.start(t);

      this.nodes.push(noise, filter, lfo, lfoGain, noiseGain, drone, droneGain);
    } else if (presetKey === 'CRYO_CHILL') {
      // Sub-zero nitrogen mist & crystalline high resonance chimes
      const noise = this.createPinkNoise();
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2400, t);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.15, t);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      // Crystalline dual resonant tones (528Hz Love Frequency & 1056Hz)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(528, t);

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1056, t);

      const tonesGain = this.ctx.createGain();
      tonesGain.gain.setValueAtTime(0.08, t);
      osc1.connect(tonesGain);
      osc2.connect(tonesGain);
      tonesGain.connect(this.masterGain);

      noise.start(t);
      osc1.start(t);
      osc2.start(t);

      this.nodes.push(noise, filter, noiseGain, osc1, osc2, tonesGain);
    } else if (presetKey === 'VORTEX_SHAKE') {
      // Sonic vortex blending swirl with rhythmic phasing
      const noise = this.createPinkNoise();
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, t);

      // Phasing LFO
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(1.8, t);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(600, t);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.3, t);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      // Rhythmic pulsation sub
      const sub = this.ctx.createOscillator();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(64, t);
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.2, t);
      sub.connect(subGain);
      subGain.connect(this.masterGain);

      noise.start(t);
      lfo.start(t);
      sub.start(t);

      this.nodes.push(noise, filter, lfo, lfoGain, noiseGain, sub, subGain);
    } else if (presetKey === 'BINAURAL_432HZ') {
      // 432 Hz Alpha Wave Focus Blend
      const oscL = this.ctx.createOscillator();
      oscL.type = 'sine';
      oscL.frequency.setValueAtTime(432, t);

      const oscR = this.ctx.createOscillator();
      oscR.type = 'sine';
      oscR.frequency.setValueAtTime(440, t); // 8Hz binaural alpha beat

      const merger = this.ctx.createChannelMerger(2);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, t);

      oscL.connect(merger, 0, 0);
      oscR.connect(merger, 0, 1);
      merger.connect(gain);
      gain.connect(this.masterGain);

      oscL.start(t);
      oscR.start(t);

      this.nodes.push(oscL, oscR, merger, gain);
    }
  }

  getFrequencyData() {
    if (!this.analyser) return new Uint8Array(16);
    const buffer = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(buffer);
    return buffer;
  }
}

export const soundscape = new SoundscapeEngine();
export default soundscape;
