import { BoneSizes } from '../utils/physics';
import Ossicles from './Ossicles';
import {
  DEFAULT_EARDRUM_AREA,
  VISUAL_SCALE,
} from '../utils/constants';

interface EarDiagramProps {
  boneSizes: BoneSizes;
  isAnimating: boolean;
}

export default function EarDiagram({ boneSizes, isAnimating }: EarDiagramProps) {
  const svgWidth = 1200;
  const svgHeight = 800;

  // Eardrum visual size (simple fixed size for now)
  const eardrumArea = (boneSizes.eardrum ?? 1.0) * DEFAULT_EARDRUM_AREA;
  const eardrumRadius = Math.sqrt(eardrumArea / Math.PI) * VISUAL_SCALE * 0.5;

  // Realistic ear canal positions - curved, anatomical shape
  const earCanalStartX = 100;
  const earCanalStartY = 200;
  const earCanalMidX = 250;
  const earCanalMidY = 300;
  const earCanalEndX = 380;
  const earCanalEndY = 400;
  const earCanalStartWidth = 80; // Wider at entrance
  const earCanalMidWidth = 50;   // Narrower in middle
  const earCanalEndWidth = 35;   // Narrowest at eardrum

  const eardrumX = earCanalEndX;
  const eardrumY = earCanalEndY;

  // More space for larger, well-spaced ossicles
  const ossiclesX = eardrumX + 120;
  const ossiclesY = eardrumY;

  // Calculate bone dimensions (same as in Ossicles component) - much larger sizes
  const malleusScale = boneSizes.malleus;
  const incusScale = boneSizes.incus;
  const stapesScale = boneSizes.stapes;
  
  const malleusHeadRadius = 50 * malleusScale;
  const malleusHandleLength = 100 * malleusScale;
  const malleusNeckLength = 30 * malleusScale;
  const incusLongProcessLength = 80 * incusScale;
  const stapesCruraLength = 60 * stapesScale;

  // Calculate bone connection points with proper spacing (matching Ossicles component)
  const malleusNeckX = ossiclesX + malleusHandleLength * 0.65;
  const malleusNeckY = ossiclesY - malleusHandleLength * 0.25;
  const malleusHeadX = malleusNeckX + malleusNeckLength;
  const malleusHeadY = malleusNeckY;
  // More spacing between bones
  const incusBodyX = malleusHeadX + malleusHeadRadius * 1.5;
  const incusBodyY = malleusHeadY;
  const incusLongProcessEndX = incusBodyX + incusLongProcessLength * 0.65;
  const incusLongProcessEndY = incusBodyY - incusLongProcessLength * 0.35;
  const stapesHeadX = incusLongProcessEndX + 15; // More gap
  const stapesHeadY = incusLongProcessEndY;

  return (
    <div className="flex justify-center items-center p-4">
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        {/* Ear Canal - Realistic curved, anatomical shape */}
        <defs>
          <linearGradient id="earCanalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F9FAFB" />
            <stop offset="50%" stopColor="#F3F4F6" />
            <stop offset="100%" stopColor="#E5E7EB" />
          </linearGradient>
          <radialGradient id="earCanalDepth" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#E5E7EB" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0.6" />
          </radialGradient>
        </defs>
        {/* Main ear canal path - curved S-shape */}
        <path
          d={`M ${earCanalStartX},${earCanalStartY - earCanalStartWidth / 2}
              Q ${earCanalStartX + 60},${earCanalStartY - 20} ${earCanalMidX},${earCanalMidY - earCanalMidWidth / 2}
              Q ${earCanalMidX + 50},${earCanalMidY} ${earCanalEndX},${earCanalEndY - earCanalEndWidth / 2}
              L ${earCanalEndX},${earCanalEndY + earCanalEndWidth / 2}
              Q ${earCanalMidX + 50},${earCanalMidY + earCanalMidWidth} ${earCanalMidX},${earCanalMidY + earCanalMidWidth / 2}
              Q ${earCanalStartX + 60},${earCanalStartY + earCanalStartWidth + 20} ${earCanalStartX},${earCanalStartY + earCanalStartWidth / 2}
              Z`}
          fill="url(#earCanalGradient)"
          stroke="#9CA3AF"
          strokeWidth={2.5}
        />
        {/* Inner depth shadow */}
        <ellipse
          cx={earCanalMidX}
          cy={earCanalMidY}
          rx={earCanalMidWidth * 0.3}
          ry={earCanalMidWidth * 0.2}
          fill="url(#earCanalDepth)"
        />
        <text
          x={earCanalStartX + 80}
          y={earCanalStartY - 30}
          textAnchor="middle"
          fontSize="14"
          fill="#666"
          className="font-semibold"
        >
          Ear Canal
        </text>

        {/* Eardrum (Tympanic Membrane) - Pinkish membrane, side view (tall and narrow) */}
        <defs>
          <linearGradient id="eardrumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F8BBD0" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F48FB1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#EC407A" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <g>
          {/* Main membrane - tall and narrow (side view) */}
          <ellipse
            cx={eardrumX}
            cy={eardrumY}
            rx={eardrumRadius * 0.4}
            ry={eardrumRadius * 1.2}
            fill="url(#eardrumGradient)"
            stroke="#C2185B"
            strokeWidth={2.5}
            opacity={0.85}
          />
          {/* Membrane texture/light reflection */}
          <ellipse
            cx={eardrumX - eardrumRadius * 0.15}
            cy={eardrumY - eardrumRadius * 0.3}
            rx={eardrumRadius * 0.2}
            ry={eardrumRadius * 0.4}
            fill="#FFFFFF"
            opacity={0.3}
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
          animationIntensity={1}
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
          opacity={0.3}
        />

      </svg>
    </div>
  );
}

