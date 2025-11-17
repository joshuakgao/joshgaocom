'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Upload, Music, SlidersHorizontal } from 'lucide-react';

export default function AudioFFTVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [visualMode, setVisualMode] = useState<'bars' | 'circle' | 'wave'>('bars');
  const [filterMode, setFilterMode] = useState<'full' | 'bass' | 'mids' | 'treble'>('full');
  const [isSetup, setIsSetup] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const animationRef = useRef<number | null>(null);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioFile(url);
      setIsPlaying(false);
      setIsSetup(false);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    }
  };

  const setupAudio = async () => {
    if (isSetup || !audioRef.current) return;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;

    const source = ctx.createMediaElementSource(audioRef.current);
    const filter = ctx.createBiquadFilter();
    filter.type = 'allpass'; // default full mix

    source.connect(filter);
    filter.connect(analyser);
    analyser.connect(ctx.destination);

    audioContextRef.current = ctx;
    analyserRef.current = analyser;
    sourceRef.current = source;
    filterRef.current = filter;
    setIsSetup(true);
  };

  const togglePlayPause = async () => {
    if (!audioFile || !audioRef.current) return;

    if (!isSetup) await setupAudio();

    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (isPlaying) {
      audioRef.current.pause();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    } else {
      await audioRef.current.play();
      visualize();
    }
    setIsPlaying(!isPlaying);
  };

  // 🎚️ Change filter mode
  const applyFilter = (mode: 'full' | 'bass' | 'mids' | 'treble') => {
    if (!filterRef.current) return;

    setFilterMode(mode);
    const filter = filterRef.current;

    switch (mode) {
      case 'bass':
        filter.type = 'lowpass';
        filter.frequency.value = 250;
        break;
      case 'mids':
        filter.type = 'bandpass';
        filter.frequency.value = 1000;
        filter.Q.value = 1.0;
        break;
      case 'treble':
        filter.type = 'highpass';
        filter.frequency.value = 2000;
        break;
      default:
        filter.type = 'allpass';
        break;
    }
  };

  // 🎨 Visualizer
  const visualize = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const analyser = analyserRef.current;
    if (!canvas || !ctx || !analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgb(10, 10, 20)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (visualMode === 'bars') {
        drawBars(ctx, dataArray, canvas.width, canvas.height);
      } else if (visualMode === 'circle') {
        drawCircle(ctx, dataArray, canvas.width, canvas.height);
      } else {
        drawWave(ctx, dataArray, canvas.width, canvas.height);
      }
    };

    draw();
  };

  // 🎵 Drawing helpers
  const drawBars = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, width: number, height: number) => {
    const barCount = 128;
    const barWidth = width / barCount - 2;
    let x = 0;
    for (let i = 0; i < barCount; i++) {
      const dataIndex = Math.floor((i / barCount) * dataArray.length);
      const barHeight = (dataArray[dataIndex] / 255) * height * 0.9;
      const hue = (i / barCount) * 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      x += barWidth + 2;
    }
  };

  const drawCircle = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, width: number, height: number) => {
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 4;
    const bars = 128;
    for (let i = 0; i < bars; i++) {
      const idx = Math.floor((i / bars) * dataArray.length);
      const val = dataArray[idx];
      const len = (val / 255) * radius * 1.5;
      const angle = (i / bars) * Math.PI * 2;
      const x1 = cx + Math.cos(angle) * radius;
      const y1 = cy + Math.sin(angle) * radius;
      const x2 = cx + Math.cos(angle) * (radius + len);
      const y2 = cy + Math.sin(angle) * (radius + len);
      const hue = (i / bars) * 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  };

  const drawWave = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, width: number, height: number) => {
    const points = 128;
    const sliceWidth = width / points;
    let x = 0;
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb(100, 200, 255)';
    ctx.beginPath();
    for (let i = 0; i < points; i++) {
      const idx = Math.floor((i / points) * dataArray.length);
      const v = dataArray[idx] / 255.0;
      const y = height - v * height * 0.9;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      x += sliceWidth;
    }
    ctx.stroke();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Music className="w-12 h-12 text-purple-400" />
            Audio FFT Visualizer
          </h1>
          <p className="text-gray-300 text-lg">Upload a song and explore its frequency spectrum</p>
        </div>

        <canvas
          ref={canvasRef}
          width={1000}
          height={400}
          className="w-full rounded-lg bg-gray-900 shadow-inner mb-6"
        />

        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <label className="cursor-pointer">
              <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
              <div className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
                <Upload className="w-5 h-5" />
                Upload Audio
              </div>
            </label>

            <button
              onClick={togglePlayPause}
              disabled={!audioFile}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            <div className="flex gap-2">
              {['bars', 'circle', 'wave'].map((m) => (
                <button
                  key={m}
                  onClick={() => setVisualMode(m as any)}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    visualMode === m ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              {['full', 'bass', 'mids', 'treble'].map((m) => (
                <button
                  key={m}
                  onClick={() => applyFilter(m as any)}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    filterMode === m ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {m === 'full' ? 'Full Mix' : m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <audio ref={audioRef} src={audioFile ?? undefined} />
      </div>
    </div>
  );
}
