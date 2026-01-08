import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SoundWaveProps {
  frequency: number;
  intensity: number;
  isActive: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function SoundWave({
  frequency,
  intensity,
  isActive,
  x,
  y,
  width,
  height,
}: SoundWaveProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setPhase((prev) => (prev + 0.1) % (Math.PI * 2));
    }, 1000 / (frequency / 10)); // Adjust animation speed based on frequency

    return () => clearInterval(interval);
  }, [frequency, isActive]);

  if (!isActive) return null;

  const waveCount = Math.floor(frequency / 200); // More waves for higher frequency
  const amplitude = height * 0.3 * intensity;
  const opacity = 0.3 + intensity * 0.5;

  return (
    <g>
      {Array.from({ length: waveCount }).map((_, i) => {
        const wavePhase = phase + (i * Math.PI * 2) / waveCount;
        const waveY = y + height / 2 + Math.sin(wavePhase) * amplitude;

        return (
          <motion.circle
            key={i}
            cx={x + (i * width) / waveCount}
            cy={waveY}
            r={3 * intensity}
            fill="rgba(100, 150, 255, 0.6)"
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </g>
  );
}

