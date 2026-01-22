import { motion } from 'framer-motion';
import { BoneSizes } from '../utils/physics';

// To use your own SVG files:
// 1. Create malleus.svg, incus.svg, and stapes.svg in src/assets/
// 2. Import them below (uncomment and adjust paths if needed)
// 3. The component will automatically use them if imported

// Import SVG files (place them in src/assets/)
import malleusSvgUrl from '../assets/malleus.svg?url';
import incusSvgUrl from '../assets/incus.svg?url';
import stapesSvgUrl from '../assets/stapes.svg?url';

// Set to true to use SVG files, false to use hand-drawn versions
const USE_SVG_FILES = true;

interface OssiclesProps {
  boneSizes: BoneSizes;
  isAnimating: boolean;
  x: number;
  y: number;
}

export default function Ossicles({
  boneSizes,
  isAnimating,
  x,
  y,
}: OssiclesProps) {
  // Base sizes scaled by bone size multipliers
  const malleusScale = boneSizes.malleus;
  const incusScale = boneSizes.incus;
  const stapesScale = boneSizes.stapes;

  // Malleus dimensions (hammer shape) - Much larger, more realistic sizes
  const malleusHeadRadius = 50 * malleusScale;
  const malleusHandleLength = 100 * malleusScale;
  const malleusNeckLength = 30 * malleusScale;
  const malleusHandleWidth = 12 * malleusScale;
  
  // Incus dimensions (anvil shape) - Much larger, more realistic sizes
  const incusBodyWidth = 65 * incusScale;
  const incusBodyHeight = 40 * incusScale;
  const incusLongProcessLength = 80 * incusScale;
  const incusShortProcessLength = 40 * incusScale;
  const incusProcessWidth = 10 * incusScale;
  
  // Stapes dimensions (stirrup shape) - Much larger, more realistic sizes
  const stapesHeadRadius = 25 * stapesScale;
  const stapesCruraLength = 60 * stapesScale;
  const stapesFootplateWidth = 45 * stapesScale;
  const stapesFootplateHeight = 12 * stapesScale;
  const stapesCruraWidth = 8 * stapesScale;

  // Calculate positions - ensure bones connect properly with generous spacing
  // Malleus: handle attaches to eardrum at (x, y), head connects to incus
  const malleusHandleX = x;
  const malleusHandleY = y;
  const malleusNeckX = malleusHandleX + malleusHandleLength * 0.65;
  const malleusNeckY = malleusHandleY - malleusHandleLength * 0.25;
  const malleusHeadX = malleusNeckX + malleusNeckLength;
  const malleusHeadY = malleusNeckY;

  // Incus: body connects to malleus head - adjust spacing multiplier to nestle closer
  // Line 65: Change the multiplier (currently 1.5) to reduce spacing (e.g., 0.8, 1.0, 1.2)
  const incusBodyX = malleusHeadX + malleusHeadRadius * 0.5; // Reduced spacing to nestle against malleus
  // Line 66: Adjust Y position if needed (currently matches malleusHeadY)
  const incusBodyY = malleusHeadY - 170;
  const incusLongProcessEndX = incusBodyX + incusLongProcessLength * 0.65;
  const incusLongProcessEndY = incusBodyY - incusLongProcessLength * 0.35;

  // Stapes: head connects to incus long process with spacing, footplate connects to oval window
  const stapesHeadX = incusLongProcessEndX + 100; // Larger gap
  const stapesHeadY = incusLongProcessEndY + 140;

  return (
    <g className="ossicles">
      {/* Malleus (Hammer) */}
      <g
        // Static position/angle we tuned so the malleus rests correctly on the eardrum
        // Rotated 15 degrees clockwise from -20 to -5
        transform={`translate(${malleusHandleX}, ${malleusHandleY}) rotate(-5)`}
      >
        <motion.g
          animate={
            isAnimating
              ? { rotate: [-3, 3, -3] }
              : { rotate: 0 }
          }
          transition={{
            duration: 0.6,
            repeat: isAnimating ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          {USE_SVG_FILES ? (
            <image
              href={malleusSvgUrl}
              width={200 * malleusScale}
              height={300 * malleusScale}
              x={-100 * malleusScale}
              // Align bottom of the malleus image with the local origin (0,0),
              // so the base of the malleus can sit directly on the eardrum.
              y={-300 * malleusScale}
              preserveAspectRatio="xMidYMid meet"
            />
          ) : (
            <>
              {/* Handle (manubrium) - more realistic, thicker, curved */}
              <path
                d={`M 0,0 
                    Q ${malleusHandleLength * 0.3},${-malleusHandleLength * 0.12} 
                    ${malleusHandleLength * 0.6},${-malleusHandleLength * 0.22}
                    Q ${malleusHandleLength * 0.7},${-malleusHandleLength * 0.25} 
                    ${malleusHandleLength * 0.65},${-malleusHandleLength * 0.25}`}
                stroke="#8B4513"
                strokeWidth={malleusHandleWidth * malleusScale}
                fill="none"
                strokeLinecap="round"
              />
              {/* Neck - thicker, more defined */}
              <ellipse
                cx={malleusHandleLength * 0.65 + malleusNeckLength * 0.5}
                cy={-malleusHandleLength * 0.25}
                rx={malleusNeckLength * 0.8}
                ry={malleusHandleWidth * 0.8 * malleusScale}
                fill="#A0522D"
                stroke="#654321"
                strokeWidth={3}
              />
              {/* Head (connects to incus) - larger, more hammer-like */}
              <ellipse
                cx={malleusHandleLength * 0.65 + malleusNeckLength}
                cy={-malleusHandleLength * 0.25}
                rx={malleusHeadRadius}
                ry={malleusHeadRadius * 0.9}
                fill="#A0522D"
                stroke="#654321"
                strokeWidth={4}
              />
              {/* Lateral process on head - more prominent */}
              <ellipse
                cx={malleusHandleLength * 0.65 + malleusNeckLength + malleusHeadRadius * 0.65}
                cy={-malleusHandleLength * 0.25 - malleusHeadRadius * 0.35}
                rx={malleusHeadRadius * 0.5}
                ry={malleusHeadRadius * 0.4}
                fill="#8B4513"
                stroke="#654321"
                strokeWidth={2.5}
              />
              {/* Anterior process */}
              <ellipse
                cx={malleusHandleLength * 0.65 + malleusNeckLength - malleusHeadRadius * 0.3}
                cy={-malleusHandleLength * 0.25 - malleusHeadRadius * 0.2}
                rx={malleusHeadRadius * 0.3}
                ry={malleusHeadRadius * 0.25}
                fill="#8B4513"
                stroke="#654321"
                strokeWidth={2}
              />
              <text
                x={malleusHandleLength * 0.325}
                y={-malleusHandleLength * 0.25 + 40}
                fontSize="14"
                fill="#666"
                className="font-semibold"
                textAnchor="middle"
              >
                Malleus
              </text>
            </>
          )}
        </motion.g>
      </g>

      {/* Incus (Anvil) */}
      <g transform={`translate(${incusBodyX}, ${incusBodyY}) rotate(-45)`}>
        <motion.g
          animate={
            isAnimating
              ? { rotate: [-3, 3, -3] }
              : { rotate: 0 }
          }
          transition={{
            duration: 0.6,
            repeat: isAnimating ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          {USE_SVG_FILES ? (
            <image
              href={incusSvgUrl}
              width={200 * incusScale}
              height={300 * incusScale}
              x={-100 * incusScale}
              y={-150 * incusScale}
              preserveAspectRatio="xMidYMid meet"
            />
          ) : (
            <>
            {/* Body (connects to malleus head) - more realistic anvil shape */}
            <path
              d={`M ${-incusBodyWidth * 0.85},${-incusBodyHeight * 0.25} 
                  Q ${-incusBodyWidth * 0.4},${-incusBodyHeight * 0.9} ${0},${-incusBodyHeight * 0.75}
                  Q ${incusBodyWidth * 0.4},${-incusBodyHeight * 0.9} ${incusBodyWidth * 0.85},${-incusBodyHeight * 0.25}
                  L ${incusBodyWidth * 0.85},${incusBodyHeight * 0.25}
                  Q ${incusBodyWidth * 0.4},${incusBodyHeight * 0.9} ${0},${incusBodyHeight * 0.75}
                  Q ${-incusBodyWidth * 0.4},${incusBodyHeight * 0.9} ${-incusBodyWidth * 0.85},${incusBodyHeight * 0.25}
                  Z`}
              fill="#A0522D"
              stroke="#654321"
              strokeWidth={3}
            />
            {/* Short process - thicker, more prominent */}
            <path
              d={`M ${-incusBodyWidth * 0.75},${-incusBodyHeight * 0.4} 
                  Q ${-incusBodyWidth * 0.75 - incusShortProcessLength * 0.25},${-incusBodyHeight * 0.4 - incusShortProcessLength * 0.15}
                  ${-incusBodyWidth * 0.75 - incusShortProcessLength * 0.6},${-incusBodyHeight * 0.4 - incusShortProcessLength * 0.4}`}
              stroke="#8B4513"
              strokeWidth={incusProcessWidth * incusScale}
              fill="none"
              strokeLinecap="round"
            />
            {/* Long process (connects to stapes) - much thicker, more realistic */}
            <path
              d={`M ${incusBodyWidth * 0.75},${0} 
                  Q ${incusBodyWidth * 0.75 + incusLongProcessLength * 0.25},${-incusLongProcessLength * 0.12}
                  ${incusBodyWidth * 0.75 + incusLongProcessLength * 0.6},${-incusLongProcessLength * 0.35}`}
              stroke="#8B4513"
              strokeWidth={incusProcessWidth * 1.2 * incusScale}
              fill="none"
              strokeLinecap="round"
            />
            {/* Lenticular process at end of long process - larger, more defined */}
            <ellipse
              cx={incusBodyWidth * 0.75 + incusLongProcessLength * 0.6}
              cy={-incusLongProcessLength * 0.35}
              rx={8 * incusScale}
              ry={6 * incusScale}
              fill="#8B4513"
              stroke="#654321"
              strokeWidth={2}
            />
            <text
              x={0}
              y={incusBodyHeight + 25}
              fontSize="12"
              fill="#666"
              className="font-semibold"
              textAnchor="middle"
            >
              Incus
            </text>
          </>
          )}
        </motion.g>
      </g>

      {/* Stapes (Stirrup) */}
      <g transform={`translate(${stapesHeadX}, ${stapesHeadY}) rotate(90)`}>
        <motion.g
          animate={
            isAnimating
              ? { rotate: [-3, 3, -3] }
              : { rotate: 0 }
          }
          transition={{
            duration: 0.6,
            repeat: isAnimating ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          {USE_SVG_FILES ? (
            <image
              href={stapesSvgUrl}
              width={200 * stapesScale}
              height={300 * stapesScale}
              x={-100 * stapesScale}
              y={-150 * stapesScale}
              preserveAspectRatio="xMidYMid meet"
            />
          ) : (
            <>
            {/* Head (connects to incus long process) - larger, more defined */}
            <ellipse
              cx={0}
              cy={0}
              rx={stapesHeadRadius}
              ry={stapesHeadRadius * 0.75}
              fill="#A0522D"
              stroke="#654321"
              strokeWidth={3}
            />
            {/* Neck - more defined connection */}
            <ellipse
              cx={0}
              cy={stapesHeadRadius * 0.75}
              rx={stapesHeadRadius * 0.5}
              ry={4 * stapesScale}
              fill="#8B4513"
              stroke="#654321"
              strokeWidth={2}
            />
            {/* Anterior crus - thicker, more realistic curve */}
            <path
              d={`M ${-stapesHeadRadius * 0.5},${stapesHeadRadius * 0.85} 
                  Q ${-stapesFootplateWidth * 0.2},${stapesCruraLength * 0.45}
                  ${-stapesFootplateWidth * 0.35},${stapesCruraLength}`}
              stroke="#8B4513"
              strokeWidth={stapesCruraWidth * stapesScale}
              fill="none"
              strokeLinecap="round"
            />
            {/* Posterior crus - thicker, more realistic curve */}
            <path
              d={`M ${stapesHeadRadius * 0.5},${stapesHeadRadius * 0.85} 
                  Q ${stapesFootplateWidth * 0.2},${stapesCruraLength * 0.45}
                  ${stapesFootplateWidth * 0.35},${stapesCruraLength}`}
              stroke="#8B4513"
              strokeWidth={stapesCruraWidth * stapesScale}
              fill="none"
              strokeLinecap="round"
            />
            {/* Footplate (connects to oval window) - larger, more realistic */}
            <ellipse
              cx={0}
              cy={stapesCruraLength + stapesFootplateHeight * 0.5}
              rx={stapesFootplateWidth}
              ry={stapesFootplateHeight}
              fill="#A0522D"
              stroke="#654321"
              strokeWidth={3}
            />
            {/* Footplate detail - more defined curve */}
            <path
              d={`M ${-stapesFootplateWidth * 0.85},${stapesCruraLength + stapesFootplateHeight * 0.5} 
                  Q ${0},${stapesCruraLength + stapesFootplateHeight * 0.25}
                  ${stapesFootplateWidth * 0.85},${stapesCruraLength + stapesFootplateHeight * 0.5}`}
              stroke="#654321"
              strokeWidth={1.5}
              fill="none"
              opacity={0.6}
            />
            <text
              x={0}
              y={stapesCruraLength + stapesFootplateHeight + 25}
              fontSize="12"
              fill="#666"
              className="font-semibold"
              textAnchor="middle"
            >
              Stapes
            </text>
          </>
          )}
        </motion.g>
      </g>
    </g>
  );
}

