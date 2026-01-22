import { useState } from 'react';
import EarDiagram from './components/EarDiagram';
import { BoneSizes } from './utils/physics';

function App() {
  const [boneSizes, setBoneSizes] = useState<BoneSizes>({
    malleus: 1.0,
    incus: 1.0,
    stapes: 1.0,
    eardrum: 1.0,
    ovalWindow: 1.0,
  });

  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div
        className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-full max-w-3xl"
        style={{ height: '450px' }}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Malleus size
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.05}
                value={boneSizes.malleus}
                onChange={(e) =>
                  setBoneSizes((prev) => ({
                    ...prev,
                    malleus: parseFloat(e.target.value),
                  }))
                }
                className="flex-1 accent-blue-600"
              />
              <span className="w-12 text-right text-sm text-gray-700">
                {(boneSizes.malleus * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAnimating((prev) => !prev)}
            className={`px-4 py-2 rounded-md text-sm font-semibold shadow ${
              isAnimating
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isAnimating ? 'Pause' : 'Animate'}
          </button>
        </div>
        <EarDiagram boneSizes={boneSizes} isAnimating={isAnimating} />
      </div>
    </div>
  );
}

export default App;

