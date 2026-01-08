import {
  DEFAULT_EARDRUM_AREA,
  DEFAULT_OVAL_WINDOW_AREA,
  DEFAULT_MALLEUS_SIZE,
  DEFAULT_INCUS_SIZE,
  DEFAULT_STAPES_SIZE,
} from './constants';

export interface BoneSizes {
  malleus: number; // multiplier of default size
  incus: number;
  stapes: number;
  eardrum?: number; // optional multiplier
  ovalWindow?: number; // optional multiplier
}

export interface AmplificationResult {
  areaRatio: number;
  leverRatio: number;
  amplificationFactor: number;
  decibelGain: number;
  inputPressure: number;
  outputPressure: number;
}

/**
 * Calculate the lever ratio based on ossicle sizes
 * The lever ratio is determined by the relative lengths of the ossicles
 * and their pivot points. Simplified model: ratio of input arm to output arm.
 */
export function calculateLeverRatio(
  malleusSize: number,
  incusSize: number,
  stapesSize: number
): number {
  // The lever ratio is approximately the ratio of the effective lever arms
  // In a simplified model: (malleus + incus) / stapes
  // This represents the mechanical advantage
  const inputArm = (malleusSize * DEFAULT_MALLEUS_SIZE + incusSize * DEFAULT_INCUS_SIZE) / 2;
  const outputArm = stapesSize * DEFAULT_STAPES_SIZE;
  
  // Lever ratio should be > 1 for amplification
  const ratio = inputArm / outputArm;
  
  // Ensure minimum ratio of 1.0 (no de-amplification in this model)
  return Math.max(1.0, ratio);
}

/**
 * Calculate the area ratio between eardrum and oval window
 */
export function calculateAreaRatio(
  eardrumArea: number = DEFAULT_EARDRUM_AREA,
  ovalWindowArea: number = DEFAULT_OVAL_WINDOW_AREA
): number {
  if (ovalWindowArea <= 0) return 1;
  return eardrumArea / ovalWindowArea;
}

/**
 * Calculate total amplification factor
 * Amplification = Area Ratio × Lever Ratio
 */
export function calculateAmplification(
  areaRatio: number,
  leverRatio: number
): number {
  return areaRatio * leverRatio;
}

/**
 * Convert amplification factor to decibel gain
 * dB = 20 × log10(amplification)
 */
export function calculateDecibelGain(amplificationFactor: number): number {
  if (amplificationFactor <= 0) return 0;
  return 20 * Math.log10(amplificationFactor);
}

/**
 * Calculate output pressure from input pressure and amplification
 */
export function calculateOutputPressure(
  inputPressure: number,
  amplificationFactor: number
): number {
  return inputPressure * amplificationFactor;
}

/**
 * Calculate all amplification metrics based on bone sizes and input
 */
export function calculateAmplificationMetrics(
  boneSizes: BoneSizes,
  inputPressure: number = 1.0
): AmplificationResult {
  const eardrumArea = (boneSizes.eardrum ?? 1.0) * DEFAULT_EARDRUM_AREA;
  const ovalWindowArea = (boneSizes.ovalWindow ?? 1.0) * DEFAULT_OVAL_WINDOW_AREA;
  
  const areaRatio = calculateAreaRatio(eardrumArea, ovalWindowArea);
  const leverRatio = calculateLeverRatio(
    boneSizes.malleus,
    boneSizes.incus,
    boneSizes.stapes
  );
  
  const amplificationFactor = calculateAmplification(areaRatio, leverRatio);
  const decibelGain = calculateDecibelGain(amplificationFactor);
  const outputPressure = calculateOutputPressure(inputPressure, amplificationFactor);
  
  return {
    areaRatio,
    leverRatio,
    amplificationFactor,
    decibelGain,
    inputPressure,
    outputPressure,
  };
}

