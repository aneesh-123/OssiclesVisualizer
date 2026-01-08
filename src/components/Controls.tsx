interface ControlsProps {
  frequency: number;
  intensity: number;
  isPlaying: boolean;
  onFrequencyChange: (frequency: number) => void;
  onIntensityChange: (intensity: number) => void;
  onPlayPause: () => void;
}

export default function Controls({
  frequency,
  intensity,
  isPlaying,
  onFrequencyChange,
  onIntensityChange,
  onPlayPause,
}: ControlsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Sound Controls
      </h3>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Frequency
            </label>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {frequency} Hz
            </span>
          </div>
          <input
            type="range"
            min="200"
            max="5000"
            step="50"
            value={frequency}
            onChange={(e) => onFrequencyChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>200 Hz</span>
            <span>5000 Hz</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Intensity
            </label>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              {(intensity * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={intensity}
            onChange={(e) => onIntensityChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        <button
          onClick={onPlayPause}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
            isPlaying
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>
    </div>
  );
}

