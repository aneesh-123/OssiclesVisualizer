import { motion } from 'framer-motion';
import { BoneSizes } from '../utils/physics';
import Ossicles from './Ossicles';
import {
  DEFAULT_EARDRUM_AREA,
  DEFAULT_OVAL_WINDOW_AREA,
  VISUAL_SCALE,
} from '../utils/constants';

interface EarDiagramProps {
  boneSizes: BoneSizes;
  isAnimating: boolean;
}

export default function EarDiagram({ boneSizes, isAnimating }: EarDiagramProps) {
  // Ear canal - moved further left and slightly down so it's less of a focal point
  const earCanalStartX = 20;
  const earCanalStartY = 280;
  const earCanalMidX = 140;
  const earCanalMidY = 380;
  const earCanalEndX = 260;
  const earCanalEndY = 480;
  const earCanalStartWidth = 70; // Wider at entrance
  const earCanalMidWidth = 45;   // Narrower in middle
  const earCanalEndWidth = 30;   // Narrowest at eardrum

  const eardrumX = earCanalEndX;
  // Eardrum sits directly at the end of the ear canal
  const eardrumY = earCanalEndY;

  // Eardrum visual size (simple fixed size for now)
  const eardrumArea = (boneSizes.eardrum ?? 1.0) * DEFAULT_EARDRUM_AREA;
  const eardrumRadius = Math.sqrt(eardrumArea / Math.PI) * VISUAL_SCALE * 0.5;

  // Position ossicles so the malleus handle base (0,0) connects slightly above the
  // eardrum's lower edge, and shifted right so it doesn't block the membrane
  const ossiclesX = eardrumX + eardrumRadius * 0.5 + 50; // previous +20, now +30 more = +50
  const ossiclesY = eardrumY - eardrumRadius * 0.2 + 50; // Moved down to provide more space for expansion

  // Visual scaling: Map lever arm multipliers to visual bone scales (for positioning calculations)
  const malleusScale = boneSizes.inputLeverArm * 0.7 + 0.3;
  const incusScale = boneSizes.inputLeverArm * 0.7 + 0.3;
  const stapesScale = boneSizes.outputLeverArm * 0.7 + 0.3;
  
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
  // More spacing between bones - scales with bone sizes
  const incusBodyX = malleusHeadX + malleusHeadRadius * 1.5;
  const incusBodyY = malleusHeadY;
  const incusLongProcessEndX = incusBodyX + incusLongProcessLength * 0.65;
  const incusLongProcessEndY = incusBodyY - incusLongProcessLength * 0.35;
  // Note: Actual stapes position is calculated in Ossicles component
  // We'll calculate approximate position here for oval window placement - scales with bone sizes
  const stapesSpacing = 100 * Math.max(incusScale, stapesScale); // Match Ossicles calculation
  const stapesHeadX = incusLongProcessEndX + stapesSpacing;
  const stapesHeadY = incusLongProcessEndY + 140 * stapesScale; // Match Ossicles calculation
  
  // Calculate stapes footplate position (where it connects to oval window)
  // Stapes is rotated 90 degrees clockwise in Ossicles
  // In the hand-drawn version, footplate is at cy = stapesCruraLength + stapesFootplateHeight * 0.5
  // After 90° clockwise rotation, this becomes an X offset (to the right)
  const stapesFootplateWidth = 45 * stapesScale;
  const stapesFootplateHeight = 12 * stapesScale;
  const stapesHeadRadius = 25 * stapesScale;
  // With 90° clockwise rotation, the footplate extends to the right of the head
  const footplateOffset = stapesCruraLength + stapesFootplateHeight * 0.5;
  const stapesFootplateX = stapesHeadX + footplateOffset;
  const stapesFootplateY = stapesHeadY;
  
  // Oval window position - positioned to connect directly to stapes footplate
  // Oval window size scales with boneSizes.ovalWindow multiplier
  const ovalWindowArea = (boneSizes.ovalWindow ?? 1.0) * DEFAULT_OVAL_WINDOW_AREA;
  const ovalWindowRadius = Math.sqrt(ovalWindowArea / Math.PI) * VISUAL_SCALE * 0.8; // Increased from 0.5 to 0.8 to make it wider
  // Oval window height - scales with oval window size
  const baseStapesHeadRadius = 25; // Base size for height calculation
  const ovalWindowHeight = baseStapesHeadRadius * 0.75 * 4 * (boneSizes.ovalWindow ?? 1.0);
  // Position oval window to the right of the footplate, aligned with it
  const ovalWindowX = stapesFootplateX + stapesFootplateWidth * 0.5 + ovalWindowRadius - 10;
  const ovalWindowY = stapesFootplateY - 150

  // ViewBox for the main diagram area - expanded to accommodate all bones at larger sizes
  const viewBoxX = 0;
  const viewBoxY = 50; // Start from top to show more vertical space
  const viewBoxWidth = 1000; // Expanded width to accommodate all bones (malleus, incus, stapes)
  const viewBoxHeight = 600; // Increased height to accommodate larger bones and prevent overlap with sliders

  return (
    <svg
      viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block' }}
    >
        {/* White background rectangle - matches viewBox exactly */}
        <rect x={viewBoxX} y={viewBoxY} width={viewBoxWidth} height={viewBoxHeight} fill="#ffffff" />
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

        {/* Eardrum (Tympanic Membrane) - Pinkish membrane, side view (tall and narrow) */}
        <defs>
          <linearGradient id="eardrumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F8BBD0" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F48FB1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#EC407A" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <motion.g
          animate={
            isAnimating
              ? { scale: [1, 1.05, 1] }
              : { scale: 1 }
          }
          transition={{
            duration: 0.6,
            repeat: isAnimating ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
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
        </motion.g>

        {/* Ossicles */}
        <Ossicles boneSizes={boneSizes} isAnimating={isAnimating} x={ossiclesX} y={ossiclesY} />

        {/* Oval Window - positioned to align with stapes footplate */}
        <motion.g
          animate={
            isAnimating
              ? { scale: [1, 1.05, 1] }
              : { scale: 1 }
          }
          transition={{
            duration: 0.6,
            repeat: isAnimating ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <ellipse
            cx={ovalWindowX}
            cy={ovalWindowY}
            rx={ovalWindowRadius}
            ry={ovalWindowHeight}
            fill="rgba(255, 200, 200, 0.6)"
            stroke="#DC2626"
            strokeWidth={3}
            opacity={0.8}
          />
        </motion.g>
    </svg>
  );
}

