import { motion } from 'framer-motion';
import { BoneSizes } from '../utils/physics';
import Ossicles from './Ossicles';
import SoundWave from './SoundWave';
import {
  DEFAULT_EARDRUM_AREA,
  DEFAULT_OVAL_WINDOW_AREA,
  VISUAL_SCALE,
} from '../utils/constants';

interface EarDiagramProps {
  boneSizes: BoneSizes;
  frequency: number;
  intensity: number;
  isAnimating: boolean;
}

export default function EarDiagram({
  boneSizes,
  frequency,
  intensity,
  isAnimating,
}: EarDiagramProps) {
  const svgWidth = 800;
  const svgHeight = 600;

  // Calculate scaled areas
  const eardrumArea = (boneSizes.eardrum ?? 1.0) * DEFAULT_EARDRUM_AREA;
  const ovalWindowArea = (boneSizes.ovalWindow ?? 1.0) * DEFAULT_OVAL_WINDOW_AREA;
  
  // Visual representation sizes
  const eardrumRadius = Math.sqrt(eardrumArea / Math.PI) * VISUAL_SCALE * 0.5;
  const ovalWindowRadius = Math.sqrt(ovalWindowArea / Math.PI) * VISUAL_SCALE * 0.5;

  // Positions
  const earCanalX = 100;
  const earCanalY = 100;
  const earCanalWidth = 150;
  const earCanalHeight = 200;

  const eardrumX = earCanalX + earCanalWidth;
  const eardrumY = earCanalY + earCanalHeight / 2;

  const ossiclesX = eardrumX + 50;
  const ossiclesY = eardrumY;

  const ovalWindowX = ossiclesX + 200;
  const ovalWindowY = ossiclesY - 50;

  // Pressure visualization colors
  const inputPressureColor = `rgba(100, 150, 255, ${0.3 + intensity * 0.4})`;
  const outputPressureColor = `rgba(255, 100, 100, ${0.3 + intensity * 0.6})`;

  return (
    <div className="flex justify-center items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        {/* Ear Canal */}
        <rect
          x={earCanalX}
          y={earCanalY}
          width={earCanalWidth}
          height={earCanalHeight}
          fill="#E5E7EB"
          stroke="#9CA3AF"
          strokeWidth={2}
          rx={5}
        />
        <text
          x={earCanalX + earCanalWidth / 2}
          y={earCanalY - 10}
          textAnchor="middle"
          fontSize="14"
          fill="#666"
          className="font-semibold"
        >
          Ear Canal
        </text>

        {/* Sound Waves in Ear Canal */}
        <SoundWave
          frequency={frequency}
          intensity={intensity}
          isActive={isAnimating}
          x={earCanalX + 20}
          y={earCanalY + 20}
          width={earCanalWidth - 40}
          height={earCanalHeight - 40}
        />

        {/* Eardrum (Tympanic Membrane) */}
        <g>
          <ellipse
            cx={eardrumX}
            cy={eardrumY}
            rx={eardrumRadius}
            ry={eardrumRadius * 0.6}
            fill={inputPressureColor}
            stroke="#4B5563"
            strokeWidth={3}
            opacity={0.7}
          />
          <text
            x={eardrumX}
            y={eardrumY + eardrumRadius + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#666"
            className="font-semibold"
          >
            Eardrum
          </text>
          <text
            x={eardrumX}
            y={eardrumY + eardrumRadius + 35}
            textAnchor="middle"
            fontSize="10"
            fill="#999"
          >
            {eardrumArea.toFixed(1)} mm²
          </text>
        </g>

        {/* Ossicles */}
        <Ossicles
          boneSizes={boneSizes}
          isAnimating={isAnimating}
          animationIntensity={intensity}
          x={ossiclesX}
          y={ossiclesY}
        />

        {/* Connection from Eardrum to Malleus */}
        <line
          x1={eardrumX + eardrumRadius * 0.7}
          y1={eardrumY}
          x2={ossiclesX}
          y2={ossiclesY}
          stroke="#666"
          strokeWidth={2}
          strokeDasharray="3,3"
          opacity={0.5}
        />

        {/* Oval Window */}
        <g>
          <ellipse
            cx={ovalWindowX}
            cy={ovalWindowY}
            rx={ovalWindowRadius}
            ry={ovalWindowRadius * 0.8}
            fill={outputPressureColor}
            stroke="#DC2626"
            strokeWidth={3}
            opacity={0.8}
          />
          <text
            x={ovalWindowX}
            y={ovalWindowY - ovalWindowRadius - 10}
            textAnchor="middle"
            fontSize="12"
            fill="#666"
            className="font-semibold"
          >
            Oval Window
          </text>
          <text
            x={ovalWindowX}
            y={ovalWindowY - ovalWindowRadius + 5}
            textAnchor="middle"
            fontSize="10"
            fill="#999"
          >
            {ovalWindowArea.toFixed(1)} mm²
          </text>
        </g>

        {/* Connection from Stapes to Oval Window */}
        <line
          x1={ossiclesX + 200}
          y1={ossiclesY - 50}
          x2={ovalWindowX - ovalWindowRadius * 0.8}
          y2={ovalWindowY}
          stroke="#666"
          strokeWidth={2}
          strokeDasharray="3,3"
          opacity={0.5}
        />

        {/* Pressure indicators */}
        {isAnimating && (
          <>
            {/* Input pressure indicator */}
            <motion.circle
              cx={eardrumX}
              cy={eardrumY}
              r={eardrumRadius * 0.8}
              fill="none"
              stroke="rgba(100, 150, 255, 0.5)"
              strokeWidth={2}
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />

            {/* Output pressure indicator */}
            <motion.circle
              cx={ovalWindowX}
              cy={ovalWindowY}
              r={ovalWindowRadius * 1.2}
              fill="none"
              stroke="rgba(255, 100, 100, 0.6)"
              strokeWidth={3}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
            />
          </>
        )}

        {/* Arrow showing sound flow */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#666" />
          </marker>
        </defs>
        <path
          d={`M ${earCanalX + earCanalWidth} ${eardrumY} L ${ovalWindowX - ovalWindowRadius} ${ovalWindowY}`}
          stroke="#666"
          strokeWidth={2}
          fill="none"
          strokeDasharray="5,5"
          opacity={0.3}
          markerEnd="url(#arrowhead)"
        />
      </svg>
    </div>
  );
}

