"use client";
import PricingCalculator from "./components/PricingCalculator";
import WeatherWidget from "./components/WeatherWidget";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const cycleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Light cycles riding the grid in the bottom half
  useEffect(() => {
    const canvas = cycleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const GRID = 100; // grid line spacing (200px cells, lines at 25%/75% = every 100px)
    const SPEED = 2;
    const TRAIL_LENGTH = 80;
    const GRID_SCROLL_SPEED = 200 / 15; // grid moves 200px per 15s

    interface Dot {
      x: number;
      y: number;
      dx: number;
      dy: number;
      trail: { x: number; y: number }[];
      r: number;
      g: number;
      b: number;
    }

    const snap = (v: number) => Math.round(v / GRID) * GRID;

    const blue: Dot = {
      x: snap(canvas.width * 0.2),
      y: snap(canvas.height * 0.6),
      dx: SPEED, dy: 0,
      trail: [],
      r: 59, g: 130, b: 246
    };

    const red: Dot = {
      x: snap(canvas.width * 0.8),
      y: snap(canvas.height * 0.85),
      dx: -SPEED, dy: 0,
      trail: [],
      r: 239, g: 68, b: 68
    };

    let lastTime = performance.now();
    let gridOffset = 0;
    let frameId = 0;

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      gridOffset = (gridOffset + GRID_SCROLL_SPEED * dt) % GRID;

      const halfH = canvas.height / 2;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const nearestHLine = (y: number) => {
        const adjusted = y - gridOffset;
        return Math.round(adjusted / GRID) * GRID + gridOffset;
      };
      const nearestVLine = (x: number) => Math.round(x / GRID) * GRID;

      const updateDot = (dot: Dot) => {
        dot.trail.push({ x: dot.x, y: dot.y });
        if (dot.trail.length > TRAIL_LENGTH) dot.trail.shift();

        dot.x += dot.dx;
        dot.y += dot.dy;

        // Drift with grid scroll when moving horizontally
        if (dot.dx !== 0) {
          dot.y += GRID_SCROLL_SPEED * dt;
        }

        const onVLine = Math.abs(dot.x - nearestVLine(dot.x)) < SPEED + 0.5;
        const onHLine = Math.abs(dot.y - nearestHLine(dot.y)) < SPEED + 1;

        if (onVLine && onHLine && Math.random() < 0.03) {
          if (dot.dx !== 0) {
            dot.x = nearestVLine(dot.x);
            dot.dy = Math.random() > 0.5 ? SPEED : -SPEED;
            dot.dx = 0;
          } else {
            dot.y = nearestHLine(dot.y);
            dot.dx = Math.random() > 0.5 ? SPEED : -SPEED;
            dot.dy = 0;
          }
        }

        // Constrain to bottom half
        if (dot.y < halfH) {
          dot.y = halfH + GRID;
          dot.dy = SPEED;
          dot.dx = 0;
          dot.trail = [];
        }
        if (dot.y > h) {
          dot.y = halfH + GRID;
          dot.trail = [];
        }
        if (dot.x < 0) { dot.x = w; dot.trail = []; }
        if (dot.x > w) { dot.x = 0; dot.trail = []; }
      };

      const drawDot = (dot: Dot) => {
        for (let i = 0; i < dot.trail.length; i++) {
          const alpha = (i / dot.trail.length) * 0.7;
          const size = 2 + (i / dot.trail.length) * 2;
          ctx.fillStyle = `rgba(${dot.r},${dot.g},${dot.b},${alpha})`;
          ctx.shadowColor = `rgba(${dot.r},${dot.g},${dot.b},${alpha})`;
          ctx.shadowBlur = 10;
          ctx.fillRect(dot.trail[i].x - size / 2, dot.trail[i].y - size / 2, size, size);
        }
        ctx.fillStyle = `rgb(${dot.r},${dot.g},${dot.b})`;
        ctx.shadowColor = `rgb(${dot.r},${dot.g},${dot.b})`;
        ctx.shadowBlur = 30;
        ctx.fillRect(dot.x - 4, dot.y - 4, 8, 8);
        ctx.shadowBlur = 0;
      };

      updateDot(blue);
      updateDot(red);
      drawDot(blue);
      drawDot(red);

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    // Initialize Web Audio API for lo-fi background music
    const initAudio = () => {
      if (isPlayingRef.current) return;
      isPlayingRef.current = true;

      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      const masterGain = audioContext.createGain();
      masterGain.gain.value = 0.15; // Low volume for background
      masterGain.connect(audioContext.destination);
      gainNodeRef.current = masterGain;

      // Lo-fi bass note pattern with melody
      const playLoFiLoop = () => {
        const bassNotes = [110, 146.83, 164.81, 130.81]; // A2, D3, E3, C3
        const melodyNotes = [440, 587.33, 659.25, 523.25]; // A4, D5, E5, C5
        let beatCount = 0;

        const playBeat = () => {
          if (!audioContextRef.current) return;

          const currentTime = audioContext.currentTime;
          const noteIndex = beatCount % 4;

          // Bass note
          const bass = audioContext.createOscillator();
          const bassGain = audioContext.createGain();
          bass.type = 'sine';
          bass.frequency.value = bassNotes[noteIndex];

          bassGain.gain.setValueAtTime(0, currentTime);
          bassGain.gain.linearRampToValueAtTime(0.4, currentTime + 0.05);
          bassGain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.8);

          bass.connect(bassGain);
          bassGain.connect(masterGain);
          bass.start(currentTime);
          bass.stop(currentTime + 0.8);

          // Melody note (plays on beats 0 and 2)
          if (noteIndex % 2 === 0) {
            const melody = audioContext.createOscillator();
            const melodyGain = audioContext.createGain();
            melody.type = 'square';
            melody.frequency.value = melodyNotes[noteIndex];

            melodyGain.gain.setValueAtTime(0, currentTime);
            melodyGain.gain.linearRampToValueAtTime(0.08, currentTime + 0.1);
            melodyGain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.6);

            melody.connect(melodyGain);
            melodyGain.connect(masterGain);
            melody.start(currentTime);
            melody.stop(currentTime + 0.6);
          }

          // Hi-hat/click (every beat)
          const noise = audioContext.createOscillator();
          const noiseGain = audioContext.createGain();
          noise.type = 'triangle';
          noise.frequency.value = 8000 + Math.random() * 2000;

          noiseGain.gain.setValueAtTime(0, currentTime);
          noiseGain.gain.linearRampToValueAtTime(0.03, currentTime + 0.01);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.1);

          noise.connect(noiseGain);
          noiseGain.connect(masterGain);
          noise.start(currentTime);
          noise.stop(currentTime + 0.1);

          beatCount++;
          setTimeout(playBeat, 600); // ~100 BPM
        };

        playBeat();
      };

      playLoFiLoop();
    };

    // Start audio on user interaction to avoid autoplay restrictions
    const handleUserInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : 0.15;
    }
  }, [isMuted]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Weather Widget */}
      <WeatherWidget />

      {/* Mute/Unmute Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 border-2 border-cyan-400/50 flex items-center justify-center hover:bg-cyan-400/20 transition-all shadow-[0_0_20px_rgba(34,211,238,0.5)]"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <span className="text-cyan-400 text-sm sm:text-lg">{isMuted ? "🔇" : "🔊"}</span>
      </button>

      {/* Animated Grid Background - BIG GRID extending to horizon */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(34, 211, 238, 0.8) 25%, rgba(34, 211, 238, 0.8) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.8) 75%, rgba(34, 211, 238, 0.8) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(34, 211, 238, 0.8) 25%, rgba(34, 211, 238, 0.8) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.8) 75%, rgba(34, 211, 238, 0.8) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '200px 200px',
          backgroundPosition: '0 0',
          animation: 'gridMove 15s linear infinite',
          transform: 'perspective(800px) rotateX(75deg)',
          transformOrigin: 'center center'
        }}
      />

      {/* Horizon Line - Curved to look more natural */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80 shadow-[0_0_20px_rgba(34,211,238,1)]"
        style={{
          width: '200%',
          borderRadius: '50%',
          transform: 'translateX(-50%) translateY(0px)',
          clipPath: 'inset(0 25% 0 25%)'
        }}
      />

      {/* Tokyo-Style City Skyline - Buildings spanning entire width with depth */}
      <div className="absolute top-1/2 left-0 right-0 h-48 sm:h-72 md:h-96 flex items-end justify-start gap-0 -translate-y-full z-0 scale-[0.5] sm:scale-75 md:scale-100 origin-bottom-left" style={{perspective: '1000px'}}>
        {/* Building 1 - Short */}
        <div className="w-20 h-48 bg-gradient-to-br from-gray-800 via-gray-900 to-black border-r-2 border-cyan-800 relative shadow-[8px_0_20px_rgba(0,0,0,0.9),-2px_0_10px_rgba(6,182,212,0.3)]">
          {/* Neon edge light */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-transparent opacity-60"></div>
          {/* Window lights */}
          <div className="absolute top-6 left-4 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-14 left-4 w-2 h-2 bg-yellow-300 animate-twinkle shadow-[0_0_8px_rgba(253,224,71,0.8)]" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-22 left-4 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-30 left-4 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-38 left-4 w-2 h-2 bg-orange-300 animate-twinkle shadow-[0_0_8px_rgba(253,186,116,0.8)]" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-6 right-4 w-2 h-2 bg-yellow-300 animate-twinkle shadow-[0_0_8px_rgba(253,224,71,0.8)]" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-14 right-4 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-22 right-4 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '1.3s'}}></div>
          {/* Neon antenna on top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 2 - Medium */}
        <div className="w-24 h-64 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-5 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-18 left-5 w-2 h-2 bg-orange-300 animate-twinkle shadow-[0_0_8px_rgba(253,186,116,0.8)]" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-28 left-5 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-38 left-5 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-48 left-5 w-2 h-2 bg-yellow-300 animate-twinkle shadow-[0_0_8px_rgba(253,224,71,0.8)]" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-58 left-5 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-8 right-5 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-18 right-5 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-28 right-5 w-2 h-2 bg-orange-300 animate-twinkle shadow-[0_0_8px_rgba(253,186,116,0.8)]" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-38 right-5 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '1.9s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-4 left-1/3 w-0.5 h-4 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-5 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
          <div className="absolute -top-4 right-1/3 w-0.5 h-4 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-5 right-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Building 3 - SUPER TALL (Tokyo Skytree-like) with MAXIMUM DEPTH */}
        <div className="w-32 h-96 bg-gradient-to-br from-gray-700 via-gray-900 to-black border-r-4 border-cyan-700 relative shadow-[12px_0_40px_rgba(0,0,0,1),-4px_0_20px_rgba(6,182,212,0.5)]">
          {/* Neon top light */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,1)]"></div>
          {/* Vertical neon strips */}
          <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-cyan-400 via-cyan-600 to-transparent opacity-70 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
          <div className="absolute top-0 right-1/4 w-0.5 h-full bg-gradient-to-b from-cyan-500 via-cyan-700 to-transparent opacity-60 shadow-[0_0_10px_rgba(34,211,238,0.7)]"></div>
          {/* Right edge glow */}
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-transparent opacity-80"></div>
          {/* Window lights with enhanced glow */}
          <div className="absolute top-10 left-6 w-3 h-3 bg-orange-400 animate-twinkle shadow-[0_0_12px_rgba(251,146,60,1)]" style={{animationDelay: '0.1s'}}></div>
          <div className="absolute top-22 left-6 w-3 h-3 bg-yellow-400 animate-twinkle shadow-[0_0_12px_rgba(250,204,21,1)]" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-34 left-6 w-3 h-3 bg-orange-300 animate-twinkle shadow-[0_0_12px_rgba(253,186,116,1)]" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute top-46 left-6 w-3 h-3 bg-yellow-300 animate-twinkle shadow-[0_0_12px_rgba(253,224,71,1)]" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-58 left-6 w-3 h-3 bg-orange-400 animate-twinkle shadow-[0_0_12px_rgba(251,146,60,1)]" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-70 left-6 w-3 h-3 bg-yellow-400 animate-twinkle shadow-[0_0_12px_rgba(250,204,21,1)]" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-82 left-6 w-3 h-3 bg-orange-400 animate-twinkle shadow-[0_0_12px_rgba(251,146,60,1)]" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-10 right-6 w-3 h-3 bg-yellow-400 animate-twinkle shadow-[0_0_12px_rgba(250,204,21,1)]" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-22 right-6 w-3 h-3 bg-orange-400 animate-twinkle shadow-[0_0_12px_rgba(251,146,60,1)]" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-34 right-6 w-3 h-3 bg-yellow-300 animate-twinkle shadow-[0_0_12px_rgba(253,224,71,1)]" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-46 right-6 w-3 h-3 bg-orange-400 animate-twinkle shadow-[0_0_12px_rgba(251,146,60,1)]" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-58 right-6 w-3 h-3 bg-yellow-400 animate-twinkle shadow-[0_0_12px_rgba(250,204,21,1)]" style={{animationDelay: '2.3s'}}></div>
          <div className="absolute top-70 right-6 w-3 h-3 bg-orange-300 animate-twinkle shadow-[0_0_12px_rgba(253,186,116,1)]" style={{animationDelay: '0.6s'}}></div>
          {/* Tall antenna with pulsing lights */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_30px_rgba(34,211,238,1)] animate-pulse"></div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Building 4 - Medium */}
        <div className="w-22 h-56 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-18 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-28 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-38 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-48 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-8 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.1s'}}></div>
          <div className="absolute top-18 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-28 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 5 - Tall */}
        <div className="w-28 h-72 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle shadow-[0_0_10px_rgba(251,146,60,0.8)]" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-22 left-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle shadow-[0_0_10px_rgba(253,224,71,0.8)]" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-34 left-5 w-2.5 h-2.5 bg-orange-300 animate-twinkle shadow-[0_0_10px_rgba(253,186,116,0.8)]" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-46 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle shadow-[0_0_10px_rgba(250,204,21,0.8)]" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-58 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle shadow-[0_0_10px_rgba(251,146,60,0.8)]" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-10 right-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle shadow-[0_0_10px_rgba(250,204,21,0.8)]" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-22 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle shadow-[0_0_10px_rgba(251,146,60,0.8)]" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-34 right-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle shadow-[0_0_10px_rgba(253,224,71,0.8)]" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-46 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle shadow-[0_0_10px_rgba(251,146,60,0.8)]" style={{animationDelay: '2.2s'}}></div>
          {/* Tall antenna */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_25px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 6 - Short */}
        <div className="w-18 h-44 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-6 left-3 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-14 left-3 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-22 left-3 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-30 left-3 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-38 left-3 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-6 right-3 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.5s'}}></div>
          {/* Small antenna */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_12px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 7 - Medium-Tall */}
        <div className="w-24 h-68 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-20 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute top-30 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-40 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-50 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-60 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-20 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-30 right-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          {/* Medium antenna */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 8 - Short */}
        <div className="w-20 h-52 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-4 w-2 h-2 bg-yellow-300 animate-twinkle shadow-[0_0_8px_rgba(253,224,71,0.8)]" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-18 left-4 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-28 left-4 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-38 left-4 w-2 h-2 bg-orange-300 animate-twinkle shadow-[0_0_8px_rgba(253,186,116,0.8)]" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-8 right-4 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-18 right-4 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '0.7s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 9 - Medium */}
        <div className="w-24 h-60 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-22 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-34 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-46 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-22 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 10 - Tall */}
        <div className="w-26 h-76 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-12 left-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-26 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-40 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-54 left-5 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-68 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-12 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute top-26 right-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          {/* Tall antenna */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-1 h-7 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_18px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-[0_0_25px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 11 - Short */}
        <div className="w-18 h-46 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-3 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-18 left-3 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-28 left-3 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-38 left-3 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-8 right-3 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.2s'}}></div>
          {/* Small antenna */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_12px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 12 - Very Tall */}
        <div className="w-30 h-88 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-12 left-6 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute top-26 left-6 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-40 left-6 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-54 left-6 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-68 left-6 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute top-82 left-6 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-12 right-6 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-26 right-6 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          {/* Very tall antenna */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_30px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 13 - Medium */}
        <div className="w-22 h-58 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-22 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-34 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-46 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 14 - Short */}
        <div className="w-20 h-50 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-18 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-28 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-38 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-8 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          {/* Small antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 15 - Tall */}
        <div className="w-26 h-70 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-12 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-26 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-40 left-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-54 left-5 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-12 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-26 right-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          {/* Medium antenna */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 16 - Medium */}
        <div className="w-24 h-62 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-22 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-34 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-46 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.7s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 17 - Short */}
        <div className="w-22 h-48 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-18 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-28 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute top-38 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-8 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          {/* Small antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 18 - Tall */}
        <div className="w-28 h-74 bg-gray-900 border border-cyan-900 relative shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <div className="absolute top-10 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-24 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-38 left-5 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-52 left-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-66 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-10 right-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-24 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          {/* Tall antenna */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_25px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 19 - Medium */}
        <div className="w-24 h-58 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-22 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-34 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-46 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '2s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 20 - Very Tall */}
        <div className="w-32 h-92 bg-gray-900 border-2 border-cyan-900 relative shadow-[0_0_40px_rgba(0,0,0,0.9)]">
          <div className="absolute top-12 left-6 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-26 left-6 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-40 left-6 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-54 left-6 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-68 left-6 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-82 left-6 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-12 right-6 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-26 right-6 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-40 right-6 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          {/* Super tall antenna */}
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-1 h-9 bg-gradient-to-t from-cyan-700 to-cyan-300 shadow-[0_0_25px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-11 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-200 rounded-full shadow-[0_0_35px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 21 - Short */}
        <div className="w-20 h-46 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-6 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-16 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-26 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-36 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-6 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.7s'}}></div>
          {/* Small antenna */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_12px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 22 - Medium-Tall */}
        <div className="w-26 h-66 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-24 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-38 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-52 left-5 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-10 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '0.8s'}}></div>
          {/* Medium antenna */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 23 - Medium */}
        <div className="w-24 h-56 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-22 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-34 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-46 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 24 - Tall */}
        <div className="w-28 h-80 bg-gray-900 border border-cyan-900 relative shadow-[0_0_35px_rgba(0,0,0,0.8)]">
          <div className="absolute top-12 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.1s'}}></div>
          <div className="absolute top-26 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-40 left-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-54 left-5 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-68 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-12 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-26 right-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '2.3s'}}></div>
          {/* Tall antenna */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-1 h-7 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_18px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-[0_0_25px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 25 - Short */}
        <div className="w-22 h-50 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-18 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-28 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-38 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-8 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          {/* Small antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>
      </div>

      {/* Shooting Stars - Behind buildings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Stars from left and center */}
        <div className="absolute w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] animate-shootingStar1" style={{top: '-5%', left: '20%'}}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)] animate-shootingStar2" style={{top: '-5%', left: '50%'}}></div>
        <div className="absolute w-1 h-1 bg-cyan-200 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] animate-shootingStar3" style={{top: '-5%', left: '35%'}}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)] animate-shootingStar4" style={{top: '-5%', left: '65%'}}></div>
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] animate-shootingStar5" style={{top: '-5%', left: '10%'}}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-200 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)] animate-shootingStar6" style={{top: '-5%', left: '80%'}}></div>
        {/* Stars from right side */}
        <div className="absolute w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] animate-shootingStar7" style={{top: '-5%', left: '90%'}}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)] animate-shootingStar8" style={{top: '-5%', left: '95%'}}></div>
        <div className="absolute w-1 h-1 bg-cyan-200 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] animate-shootingStar9" style={{top: '-5%', left: '85%'}}></div>
      </div>

      {/* Light Cycles - riding the grid in the bottom half */}
      <canvas ref={cycleCanvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }} />

      {/* Content */}
      <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6 md:p-8 z-20 relative">
        {/* Main heading with ROBOCOP metallic chrome effect + sunburst */}
        <div className="relative inline-block">
          {/* Sunburst rays behind text */}
          <div className="absolute inset-0 pointer-events-none z-0" style={{
            background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.15) 10deg, transparent 20deg, transparent 40deg, rgba(255,255,255,0.1) 50deg, transparent 60deg, transparent 80deg, rgba(255,255,255,0.15) 90deg, transparent 100deg, transparent 120deg, rgba(255,255,255,0.08) 130deg, transparent 140deg, transparent 160deg, rgba(255,255,255,0.12) 170deg, transparent 180deg, transparent 200deg, rgba(255,255,255,0.15) 210deg, transparent 220deg, transparent 240deg, rgba(255,255,255,0.1) 250deg, transparent 260deg, transparent 280deg, rgba(255,255,255,0.15) 290deg, transparent 300deg, transparent 320deg, rgba(255,255,255,0.08) 330deg, transparent 340deg, transparent 360deg)',
            filter: 'blur(2px)',
            animation: 'sunRotate 20s linear infinite',
            transform: 'scale(1.5)',
            opacity: 0.6
          }}></div>
          {/* Bright center flash */}
          <div className="absolute top-1/4 left-1/3 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 pointer-events-none z-5" style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 20%, transparent 50%)',
            filter: 'blur(15px)',
            animation: 'flash 3s ease-in-out infinite'
          }}></div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-widest robocop-metallic relative z-10" style={{
            fontFamily: 'Impact, "Arial Black", sans-serif',
            letterSpacing: '0.1em',
            background: 'linear-gradient(180deg, #ffffff 0%, #d4e8f0 10%, #a8c5d6 25%, #6b9cb5 45%, #3d6b85 65%, #1e3a4f 85%, #0a1820 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 40px rgba(168,197,214,0.9)) drop-shadow(0 0 20px rgba(107,156,181,1)) drop-shadow(0 6px 12px rgba(0,0,0,1)) drop-shadow(2px 2px 0px rgba(255,255,255,0.3))'
          }}>
            HELLO WORLD
          </h1>
          {/* Digital scanlines overlay */}
          <div className="absolute inset-0 pointer-events-none z-20" style={{
            background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            mixBlendMode: 'overlay'
          }}></div>
        </div>

        {/* Subheading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl text-cyan-300 drop-shadow-[0_0_15px_rgba(103,232,249,0.7)]">
          Welcome to the Grid
        </h2>

        {/* Description text */}
        <p className="text-base sm:text-lg md:text-xl text-cyan-200 max-w-2xl mx-auto px-2">
          Racing through the digital frontier on a light cycle!
        </p>

        {/* Glowing border box */}
        <div className="border-2 border-cyan-400 p-3 sm:p-4 md:p-6 mt-4 sm:mt-6 md:mt-8 shadow-[0_0_30px_rgba(34,211,238,0.5)] mx-2 sm:mx-0">
          <p className="text-cyan-100 text-sm sm:text-base md:text-lg">
            The grid is moving beneath you!
          </p>
        </div>

        {/* Pricing Calculator */}
        <PricingCalculator />
      </div>

      {/* CSS Animations - Grid movement, twinkling lights, and building depth */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 200px;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        /* Shooting Stars Animations - Coming from top, streaking down and to the left */
        @keyframes shootingStar1 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-80vw, 45vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar2 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-70vw, 40vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar3 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-75vw, 42vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar4 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-65vw, 38vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar5 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-85vw, 48vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar6 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-60vw, 35vh) rotate(135deg);
            opacity: 0;
          }
        }

        .animate-shootingStar1 {
          animation: shootingStar1 3s linear infinite;
          animation-delay: 0s;
          box-shadow: 0 0 10px rgba(34, 211, 238, 1), 30px -30px 20px rgba(34, 211, 238, 0.5), 60px -60px 10px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar2 {
          animation: shootingStar2 2.5s linear infinite;
          animation-delay: 1.5s;
          box-shadow: 0 0 8px rgba(34, 211, 238, 1), 20px -20px 15px rgba(34, 211, 238, 0.5), 40px -40px 8px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar3 {
          animation: shootingStar3 3.2s linear infinite;
          animation-delay: 0.8s;
          box-shadow: 0 0 10px rgba(34, 211, 238, 1), 30px -30px 20px rgba(34, 211, 238, 0.5), 60px -60px 10px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar4 {
          animation: shootingStar4 2.8s linear infinite;
          animation-delay: 2.2s;
          box-shadow: 0 0 8px rgba(34, 211, 238, 1), 20px -20px 15px rgba(34, 211, 238, 0.5), 40px -40px 8px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar5 {
          animation: shootingStar5 3.5s linear infinite;
          animation-delay: 0.3s;
          box-shadow: 0 0 10px rgba(34, 211, 238, 1), 30px -30px 20px rgba(34, 211, 238, 0.5), 60px -60px 10px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar6 {
          animation: shootingStar6 2.7s linear infinite;
          animation-delay: 1.8s;
          box-shadow: 0 0 8px rgba(34, 211, 238, 1), 20px -20px 15px rgba(34, 211, 238, 0.5), 40px -40px 8px rgba(34, 211, 238, 0.2);
        }

        /* Additional shooting stars from the right */
        @keyframes shootingStar7 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-90vw, 50vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar8 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-95vw, 48vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar9 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-85vw, 46vh) rotate(135deg);
            opacity: 0;
          }
        }

        .animate-shootingStar7 {
          animation: shootingStar7 3.3s linear infinite;
          animation-delay: 0.5s;
          box-shadow: 0 0 10px rgba(34, 211, 238, 1), 30px -30px 20px rgba(34, 211, 238, 0.5), 60px -60px 10px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar8 {
          animation: shootingStar8 2.9s linear infinite;
          animation-delay: 2s;
          box-shadow: 0 0 8px rgba(34, 211, 238, 1), 20px -20px 15px rgba(34, 211, 238, 0.5), 40px -40px 8px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar9 {
          animation: shootingStar9 3.1s linear infinite;
          animation-delay: 1.2s;
          box-shadow: 0 0 10px rgba(34, 211, 238, 1), 30px -30px 20px rgba(34, 211, 238, 0.5), 60px -60px 10px rgba(34, 211, 238, 0.2);
        }

        /* Sunburst rotation animation */
        @keyframes sunRotate {
          0% {
            transform: scale(1.5) rotate(0deg);
          }
          100% {
            transform: scale(1.5) rotate(360deg);
          }
        }

        /* Flash animation */
        @keyframes flash {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }

        /* Add architectural floor lines to make buildings look realistic */
        div[class*="bg-gray-900"]:not(:has(p)):not(:has(h1)):not(:has(h2)) {
          background-image:
            /* Horizontal floor lines */
            repeating-linear-gradient(
              180deg,
              transparent 0px,
              transparent 18px,
              rgba(55, 65, 81, 0.5) 18px,
              rgba(55, 65, 81, 0.5) 20px
            ),
            /* Vertical column lines for depth */
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 18px,
              rgba(31, 41, 55, 0.3) 18px,
              rgba(31, 41, 55, 0.3) 19px
            ),
            /* Main gradient */
            linear-gradient(to right, rgba(6, 182, 212, 0.1) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.3) 100%),
            linear-gradient(135deg, #4b5563 0%, #374151 20%, #1f2937 60%, #000000 100%) !important;
        }

        /* MASSIVE 3D DEPTH for all buildings - 200% more! */
        div[class*="bg-gray-900"]:not(:has(p)):not(:has(h1)):not(:has(h2)) {
          background:
            linear-gradient(to right, rgba(6, 182, 212, 0.1) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.3) 100%),
            linear-gradient(135deg, #4b5563 0%, #374151 20%, #1f2937 60%, #000000 100%) !important;
          box-shadow:
            /* Main depth shadow - much stronger */
            15px 0 50px rgba(0, 0, 0, 1),
            10px 0 30px rgba(0, 0, 0, 0.9),
            /* Cyan atmospheric glow on left */
            -4px 0 25px rgba(6, 182, 212, 0.5),
            -8px 0 40px rgba(6, 182, 212, 0.3),
            /* Inner shadows for dimension */
            inset -4px 0 20px rgba(6, 182, 212, 0.3),
            inset 4px 0 15px rgba(0, 0, 0, 0.5) !important;
          border-right: 3px solid rgba(34, 211, 238, 0.8) !important;
          border-left: 1px solid rgba(107, 114, 128, 0.3) !important;
          position: relative;
          transform: perspective(1000px) rotateY(-1deg);
        }

        /* Top neon strip with stronger glow */
        div[class*="bg-gray-900"]:not(:has(p)):not(:has(h1)):not(:has(h2))::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(34, 211, 238, 0.3) 20%,
            rgba(34, 211, 238, 1) 50%,
            rgba(34, 211, 238, 0.3) 80%,
            transparent 100%);
          box-shadow:
            0 0 15px rgba(34, 211, 238, 1),
            0 0 30px rgba(34, 211, 238, 0.5);
        }

        /* Enhanced right edge glow with floor lines */
        div[class*="bg-gray-900"]:not(:has(p)):not(:has(h1)):not(:has(h2))::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 2px;
          height: 100%;
          background:
            repeating-linear-gradient(
              180deg,
              rgba(34, 211, 238, 1) 0%,
              rgba(34, 211, 238, 0.8) 5%,
              rgba(34, 211, 238, 0.2) 10%,
              rgba(34, 211, 238, 0.2) 30%
            );
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.8);
        }
      `}</style>
    </div>
  );
}
