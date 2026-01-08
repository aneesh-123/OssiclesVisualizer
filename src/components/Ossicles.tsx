import { motion } from 'framer-motion';
import { BoneSizes } from '../utils/physics';
import {
  DEFAULT_MALLEUS_SIZE,
  DEFAULT_INCUS_SIZE,
  DEFAULT_STAPES_SIZE,
  VISUAL_SCALE,
} from '../utils/constants';

interface OssiclesProps {
  boneSizes: BoneSizes;
  isAnimating: boolean;
  animationIntensity: number;
  x: number;
  y: number;
}

export default function Ossicles({
  boneSizes,
  isAnimating,
  animationIntensity,
  x,
  y,
}: OssiclesProps) {
  const malleusLength = DEFAULT_MALLEUS_SIZE * boneSizes.malleus * VISUAL_SCALE;
  const incusLength = DEFAULT_INCUS_SIZE * boneSizes.incus * VISUAL_SCALE;
  const stapesLength = DEFAULT_STAPES_SIZE * boneSizes.stapes * VISUAL_SCALE;

  // Calculate positions
  const malleusX = x;
  const malleusY = y;
  const malleusEndX = malleusX + malleusLength * 0.7;
  const malleusEndY = malleusY - malleusLength * 0.3;

  const incusX = malleusEndX;
  const incusY = malleusEndY;
  const incusEndX = incusX + incusLength * 0.6;
  const incusEndY = incusY - incusLength * 0.4;

  const stapesX = incusEndX;
  const stapesY = incusEndY;
  const stapesEndX = stapesX + stapesLength * 0.5;
  const stapesEndY = stapesY - stapesLength * 0.5;

  // Animation offsets
  const animOffset = isAnimating ? animationIntensity * 2 : 0;

  return (
    <g className="ossicles">
      {/* Malleus (Hammer) */}
      <motion.g
        animate={
          isAnimating
            ? {
                x: [0, animOffset, 0],
                y: [0, -animOffset * 0.5, 0],
                rotate: [0, 2, 0],
              }
            : {}
        }
        transition={{
          duration: 0.5,
          repeat: isAnimating ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >
        <line
          x1={malleusX}
          y1={malleusY}
          x2={malleusEndX}
          y2={malleusEndY}
          stroke="#8B4513"
          strokeWidth={6}
          strokeLinecap="round"
        />
        <circle
          cx={malleusX}
          cy={malleusY}
          r={8}
          fill="#A0522D"
        />
        <text
          x={malleusX - 20}
          y={malleusY + 5}
          fontSize="12"
          fill="#666"
          className="font-semibold"
        >
          Malleus
        </text>
      </motion.g>

      {/* Incus (Anvil) */}
      <motion.g
        animate={
          isAnimating
            ? {
                x: [0, animOffset * 0.7, 0],
                y: [0, -animOffset * 0.3, 0],
                rotate: [0, -1.5, 0],
              }
            : {}
        }
        transition={{
          duration: 0.5,
          repeat: isAnimating ? Infinity : 0,
          ease: 'easeInOut',
          delay: 0.1,
        }}
      >
        <line
          x1={incusX}
          y1={incusY}
          x2={incusEndX}
          y2={incusEndY}
          stroke="#8B4513"
          strokeWidth={6}
          strokeLinecap="round"
        />
        <circle
          cx={incusX}
          cy={incusY}
          r={7}
          fill="#A0522D"
        />
        <text
          x={incusX - 15}
          y={incusY - 15}
          fontSize="12"
          fill="#666"
          className="font-semibold"
        >
          Incus
        </text>
      </motion.g>

      {/* Stapes (Stirrup) */}
      <motion.g
        animate={
          isAnimating
            ? {
                x: [0, animOffset * 0.5, 0],
                y: [0, -animOffset * 0.8, 0],
              }
            : {}
        }
        transition={{
          duration: 0.5,
          repeat: isAnimating ? Infinity : 0,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      >
        <line
          x1={stapesX}
          y1={stapesY}
          x2={stapesEndX}
          y2={stapesEndY}
          stroke="#8B4513"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <circle
          cx={stapesX}
          cy={stapesY}
          r={6}
          fill="#A0522D"
        />
        <text
          x={stapesX - 15}
          y={stapesEndY - 10}
          fontSize="12"
          fill="#666"
          className="font-semibold"
        >
          Stapes
        </text>
      </motion.g>

      {/* Connection lines */}
      <line
        x1={malleusEndX}
        y1={malleusEndY}
        x2={incusX}
        y2={incusY}
        stroke="#666"
        strokeWidth={2}
        strokeDasharray="3,3"
        opacity={0.5}
      />
      <line
        x1={incusEndX}
        y1={incusEndY}
        x2={stapesX}
        y2={stapesY}
        stroke="#666"
        strokeWidth={2}
        strokeDasharray="3,3"
        opacity={0.5}
      />
    </g>
  );
}

