import { useState } from 'react';
import EarDiagram from './components/EarDiagram';
import { BoneSizes } from './utils/physics';

function App() {
  const boneSizes: BoneSizes = {
    malleus: 1.0,
    incus: 1.0,
    stapes: 1.0,
    eardrum: 1.0,
    ovalWindow: 1.0,
  };

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Ossicles Sound Amplification Visualizer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explore how the three bones in the human ear amplify sound through size ratios and lever mechanics
          </p>
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
              isPlaying
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <span className="text-2xl">⏸</span>
                <span>Pause Animation</span>
              </>
            ) : (
              <>
                <span className="text-2xl">▶</span>
                <span>Play Animation</span>
              </>
            )}
          </button>
        </header>

        {/* Main Content - Single visualization panel in a white box */}
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <EarDiagram boneSizes={boneSizes} isAnimating={isPlaying} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

