// Anatomical measurements and default values

export const DEFAULT_EARDRUM_AREA = 55; // mm²
export const DEFAULT_OVAL_WINDOW_AREA = 3.2; // mm² (stapes footplate area)
export const DEFAULT_AREA_RATIO = DEFAULT_EARDRUM_AREA / DEFAULT_OVAL_WINDOW_AREA; // 17:1

// Default lever arm lengths for physiological lever ratio of ~1.3:1
export const DEFAULT_INPUT_LEVER_ARM = 9.1; // mm (effective input lever arm length)
export const DEFAULT_OUTPUT_LEVER_ARM = 7.0; // mm (effective output lever arm length)
export const DEFAULT_LEVER_RATIO = DEFAULT_INPUT_LEVER_ARM / DEFAULT_OUTPUT_LEVER_ARM; // ~1.3:1 (~2-3 dB gain)

// Realistic ranges for bone sizes (as multipliers of default)
export const BONE_SIZE_RANGES = {
  malleus: { min: 0.5, max: 2.0 }, // 50% to 200% of default
  incus: { min: 0.5, max: 2.0 },
  stapes: { min: 0.5, max: 2.0 },
  eardrum: { min: 0.5, max: 2.0 },
  ovalWindow: { min: 0.5, max: 2.0 },
};

// Default input sound intensity (for visualization)
export const DEFAULT_SOUND_INTENSITY = 1.0; // arbitrary units
export const DEFAULT_SOUND_FREQUENCY = 1000; // Hz

// Visual scaling constants
export const VISUAL_SCALE = 10; // pixels per mm
export const EAR_CANAL_WIDTH = 200; // pixels
export const EAR_CANAL_HEIGHT = 300; // pixels

