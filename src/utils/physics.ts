import {
  DEFAULT_EARDRUM_AREA,
  DEFAULT_OVAL_WINDOW_AREA,
  DEFAULT_INPUT_LEVER_ARM,
  DEFAULT_OUTPUT_LEVER_ARM,
} from './constants';

export interface BoneSizes {
  inputLeverArm: number; // Multiplier for effective input lever arm length (default 1.0 = 9.1mm)
  outputLeverArm: number; // Multiplier for effective output lever arm length (default 1.0 = 7.0mm)
  eardrum?: number; // optional multiplier for eardrum area
  ovalWindow?: number; // optional multiplier for oval window area
}

export interface AmplificationResult {
  areaRatio: number;
  leverRatio: number;
  amplificationFactor: number;
  decibelGain: number;
  leverRatioDecibelGain: number;
  areaRatioDecibelGain: number;
  inputPressure: number;
  outputPressure: number;
}

/**
 * Calculate the lever ratio based on effective lever arm lengths
 * The lever ratio represents the mechanical advantage from the ossicular chain.
 * 
 * Formula: Lever Ratio = Input Lever Arm / Output Lever Arm
 * 
 * Physiologically, this is approximately 1.3:1 (~2-3 dB gain)
 * - Larger input lever arm → Higher lever ratio → More amplification
 * - Smaller output lever arm → Higher lever ratio → More amplification
 * 
 * Note: This is a simplified mechanical model. In reality, the ossicular chain
 * acts as a lever system where the malleus-incus complex provides the input arm
 * and the stapes provides the output arm.
 */
export function calculateLeverRatio(
  inputLeverArm: number,
  outputLeverArm: number
): number {
  if (outputLeverArm <= 0) return 1.0;
  
  // Lever ratio = Input arm / Output arm
  // This represents how much the lever system amplifies the force
  const ratio = inputLeverArm / outputLeverArm;
  
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
 * Calculate all amplification metrics based on lever arm lengths and areas
 * 
 * Note: This is a simplified mechanical model of middle-ear amplification.
 * It does not account for frequency-dependent cochlear mechanics or neural processing.
 */
export function calculateAmplificationMetrics(
  boneSizes: BoneSizes,
  inputPressure: number = 1.0
): AmplificationResult {
  const eardrumArea = (boneSizes.eardrum ?? 1.0) * DEFAULT_EARDRUM_AREA;
  const ovalWindowArea = (boneSizes.ovalWindow ?? 1.0) * DEFAULT_OVAL_WINDOW_AREA;
  
  // Convert percentage multipliers to actual lever arm lengths (mm)
  const inputLeverArmLength = boneSizes.inputLeverArm * DEFAULT_INPUT_LEVER_ARM;
  const outputLeverArmLength = boneSizes.outputLeverArm * DEFAULT_OUTPUT_LEVER_ARM;
  
  const areaRatio = calculateAreaRatio(eardrumArea, ovalWindowArea);
  const leverRatio = calculateLeverRatio(
    inputLeverArmLength,
    outputLeverArmLength
  );
  
  // Total amplification = Area Ratio × Lever Ratio
  // Physiologically: ~17:1 (area) × ~1.3:1 (lever) ≈ 22× (~26-27 dB)
  const amplificationFactor = calculateAmplification(areaRatio, leverRatio);
  const decibelGain = calculateDecibelGain(amplificationFactor);
  const outputPressure = calculateOutputPressure(inputPressure, amplificationFactor);
  
  // Calculate decibel contributions from each component
  const leverRatioDecibelGain = calculateDecibelGain(leverRatio);
  const areaRatioDecibelGain = calculateDecibelGain(areaRatio);
  
  return {
    areaRatio,
    leverRatio,
    amplificationFactor,
    decibelGain,
    leverRatioDecibelGain,
    areaRatioDecibelGain,
    inputPressure,
    outputPressure,
  };
}

