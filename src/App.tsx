import { useState, useMemo } from 'react';
import EarDiagram from './components/EarDiagram';
import AmplificationDisplay from './components/AmplificationDisplay';
import BoneSizeControls from './components/BoneSizeControls';
import Controls from './components/Controls';
import { BoneSizes, calculateAmplificationMetrics } from './utils/physics';
import { DEFAULT_SOUND_INTENSITY, DEFAULT_SOUND_FREQUENCY } from './utils/constants';

function App() {
  const [boneSizes, setBoneSizes] = useState<BoneSizes>({
    malleus: 1.0,
    incus: 1.0,
    stapes: 1.0,
    eardrum: 1.0,
    ovalWindow: 1.0,
  });

  const [frequency, setFrequency] = useState(DEFAULT_SOUND_FREQUENCY);
  const [intensity, setIntensity] = useState(DEFAULT_SOUND_INTENSITY);
  const [isPlaying, setIsPlaying] = useState(false);

  // Calculate amplification metrics
  const metrics = useMemo(
    () => calculateAmplificationMetrics(boneSizes, intensity),
    [boneSizes, intensity]
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Ossicles Sound Amplification Visualizer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore how the three bones in the human ear amplify sound through size ratios and lever mechanics
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <Controls
              frequency={frequency}
              intensity={intensity}
              isPlaying={isPlaying}
              onFrequencyChange={setFrequency}
              onIntensityChange={setIntensity}
              onPlayPause={() => setIsPlaying(!isPlaying)}
            />

            <BoneSizeControls
              boneSizes={boneSizes}
              onBoneSizeChange={setBoneSizes}
            />
          </div>

          {/* Center Column - Visualization */}
          <div className="lg:col-span-1">
            <EarDiagram
              boneSizes={boneSizes}
              frequency={frequency}
              intensity={intensity}
              isAnimating={isPlaying}
            />
          </div>

          {/* Right Column - Metrics */}
          <div>
            <AmplificationDisplay metrics={metrics} />

            {/* Educational Info */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">
                How It Works
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">Area Ratio:</strong> The eardrum is much larger than the oval window, concentrating sound pressure.
                </p>
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">Lever Ratio:</strong> The ossicles act as a lever system, providing mechanical advantage.
                </p>
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">Total Amplification:</strong> Combined effect amplifies sound by 20-25 dB (100-300x).
                </p>
                <p className="pt-2 text-xs text-gray-500 dark:text-gray-500">
                  Adjust the bone sizes above to see how anatomy affects amplification!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

