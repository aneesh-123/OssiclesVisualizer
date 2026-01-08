import { BoneSizes } from '../utils/physics';
import { BONE_SIZE_RANGES } from '../utils/constants';

interface BoneSizeControlsProps {
  boneSizes: BoneSizes;
  onBoneSizeChange: (boneSizes: BoneSizes) => void;
}

export default function BoneSizeControls({
  boneSizes,
  onBoneSizeChange,
}: BoneSizeControlsProps) {
  const handleChange = (bone: keyof BoneSizes, value: number) => {
    onBoneSizeChange({
      ...boneSizes,
      [bone]: value,
    });
  };

  const resetToDefaults = () => {
    onBoneSizeChange({
      malleus: 1.0,
      incus: 1.0,
      stapes: 1.0,
      eardrum: 1.0,
      ovalWindow: 1.0,
    });
  };

  const SliderControl = ({
    label,
    value,
    min,
    max,
    onChange,
    percentage,
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    percentage: number;
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          {percentage.toFixed(0)}%
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={0.05}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{(min * 100).toFixed(0)}%</span>
        <span>{(max * 100).toFixed(0)}%</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Bone Size Controls
        </h3>
        <button
          onClick={resetToDefaults}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reset to Defaults
        </button>
      </div>

      <div className="space-y-4">
        <SliderControl
          label="Malleus (Hammer)"
          value={boneSizes.malleus}
          min={BONE_SIZE_RANGES.malleus.min}
          max={BONE_SIZE_RANGES.malleus.max}
          onChange={(value) => handleChange('malleus', value)}
          percentage={boneSizes.malleus * 100}
        />

        <SliderControl
          label="Incus (Anvil)"
          value={boneSizes.incus}
          min={BONE_SIZE_RANGES.incus.min}
          max={BONE_SIZE_RANGES.incus.max}
          onChange={(value) => handleChange('incus', value)}
          percentage={boneSizes.incus * 100}
        />

        <SliderControl
          label="Stapes (Stirrup)"
          value={boneSizes.stapes}
          min={BONE_SIZE_RANGES.stapes.min}
          max={BONE_SIZE_RANGES.stapes.max}
          onChange={(value) => handleChange('stapes', value)}
          percentage={boneSizes.stapes * 100}
        />

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Optional: Membrane Areas
          </h4>
          
          <div className="space-y-4">
            <SliderControl
              label="Eardrum Area"
              value={boneSizes.eardrum ?? 1.0}
              min={BONE_SIZE_RANGES.eardrum.min}
              max={BONE_SIZE_RANGES.eardrum.max}
              onChange={(value) => handleChange('eardrum', value)}
              percentage={(boneSizes.eardrum ?? 1.0) * 100}
            />

            <SliderControl
              label="Oval Window Area"
              value={boneSizes.ovalWindow ?? 1.0}
              min={BONE_SIZE_RANGES.ovalWindow.min}
              max={BONE_SIZE_RANGES.ovalWindow.max}
              onChange={(value) => handleChange('ovalWindow', value)}
              percentage={(boneSizes.ovalWindow ?? 1.0) * 100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

