// Anatomical measurements and default values

export const DEFAULT_EARDRUM_AREA = 60; // mm² (average of 55-65 mm²)
export const DEFAULT_OVAL_WINDOW_AREA = 3.2; // mm²
export const DEFAULT_AREA_RATIO = DEFAULT_EARDRUM_AREA / DEFAULT_OVAL_WINDOW_AREA; // ~17:1

export const DEFAULT_MALLEUS_SIZE = 8.5; // mm (average of 8-9mm)
export const DEFAULT_INCUS_SIZE = 7; // mm
export const DEFAULT_STAPES_SIZE = 3.5; // mm
export const DEFAULT_LEVER_RATIO = 1.3; // mechanical advantage

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

