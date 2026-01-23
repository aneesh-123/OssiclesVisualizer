import { useState, useMemo } from 'react';
import EarDiagram from './components/EarDiagram';
import { BoneSizes, calculateAmplificationMetrics } from './utils/physics';

function App() {
  const [boneSizes, setBoneSizes] = useState<BoneSizes>({
    inputLeverArm: 1.0, // 100% of default (9.1mm)
    outputLeverArm: 1.0, // 100% of default (7.0mm)
    eardrum: 1.0,
    ovalWindow: 1.0,
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate amplification metrics
  const amplificationMetrics = useMemo(
    () => calculateAmplificationMetrics(boneSizes),
    [boneSizes]
  );

  // Calculate actual values for tooltips
  const inputLeverArmLength = boneSizes.inputLeverArm * 9.1; // DEFAULT_INPUT_LEVER_ARM
  const outputLeverArmLength = boneSizes.outputLeverArm * 7.0; // DEFAULT_OUTPUT_LEVER_ARM
  const eardrumArea = (boneSizes.eardrum ?? 1.0) * 55; // DEFAULT_EARDRUM_AREA
  const ovalWindowArea = (boneSizes.ovalWindow ?? 1.0) * 3.2; // DEFAULT_OVAL_WINDOW_AREA

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-full max-w-6xl flex gap-6" style={{ height: '700px' }}>
        {/* Main diagram area */}
        <div className="flex-1 flex flex-col">
        <div className="mb-4 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Effective Input Lever Arm Length
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0.5}
                    max={1.5}
                    step={0.05}
                    value={boneSizes.inputLeverArm}
                    onChange={(e) =>
                      setBoneSizes((prev) => ({
                        ...prev,
                        inputLeverArm: parseFloat(e.target.value),
                      }))
                    }
                    className="flex-1 accent-blue-600"
                  />
                  <span className="w-12 text-right text-sm text-gray-700">
                    {(boneSizes.inputLeverArm * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Effective Output Lever Arm Length
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0.5}
                    max={1.5}
                    step={0.05}
                    value={boneSizes.outputLeverArm}
                    onChange={(e) =>
                      setBoneSizes((prev) => ({
                        ...prev,
                        outputLeverArm: parseFloat(e.target.value),
                      }))
                    }
                    className="flex-1 accent-green-600"
                  />
                  <span className="w-12 text-right text-sm text-gray-700">
                    {(boneSizes.outputLeverArm * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Eardrum size
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0.5}
                    max={1.5}
                    step={0.05}
                    value={boneSizes.eardrum ?? 1.0}
                    onChange={(e) =>
                      setBoneSizes((prev) => ({
                        ...prev,
                        eardrum: parseFloat(e.target.value),
                      }))
                    }
                    className="flex-1 accent-pink-600"
                  />
                  <span className="w-12 text-right text-sm text-gray-700">
                    {((boneSizes.eardrum ?? 1.0) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Oval Window size
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0.5}
                    max={1.5}
                    step={0.05}
                    value={boneSizes.ovalWindow ?? 1.0}
                    onChange={(e) =>
                      setBoneSizes((prev) => ({
                        ...prev,
                        ovalWindow: parseFloat(e.target.value),
                      }))
                    }
                    className="flex-1 accent-red-600"
                  />
                  <span className="w-12 text-right text-sm text-gray-700">
                    {((boneSizes.ovalWindow ?? 1.0) * 100).toFixed(0)}%
                  </span>
                </div>
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
        </div>
        <EarDiagram boneSizes={boneSizes} isAnimating={isAnimating} />
        </div>
        
        {/* Amplification metrics panel */}
        <div className="w-64 flex-shrink-0 bg-gray-50 rounded-lg p-4 border border-gray-200 flex flex-col h-full">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex-shrink-0">Amplification Metrics</h3>
          
          <div className="space-y-3 flex-1 overflow-y-auto">
            {/* Lever Ratio Section */}
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <div className="text-xs font-semibold text-gray-700 mb-2">From Lever Action</div>
              <div className="text-xs text-gray-600 mb-1 flex items-center justify-center gap-1 relative group">
                Lever Ratio
                <span className="text-blue-500 cursor-help relative">
                  ℹ️
                  <span className="absolute left-full ml-2 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {inputLeverArmLength.toFixed(1)} mm / {outputLeverArmLength.toFixed(1)} mm<br/>
                    = {amplificationMetrics.leverRatio.toFixed(2)}:1
                  </span>
                </span>
              </div>
              <div className="text-xl font-bold text-green-600">
                {amplificationMetrics.leverRatio.toFixed(2)}:1
              </div>
              <div className="text-xs text-gray-500 mt-1 mb-2">
                Input Arm / Output Arm
              </div>
              <div className="text-xs text-gray-600 mb-1 flex items-center justify-center gap-1 relative group">
                Decibel Gain
                <span className="text-gray-400 cursor-help relative">
                  ℹ️
                  <span className="absolute left-1/2 -translate-x-3/4 bottom-full mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    Decibel Gain = 20 × log₁₀(Amplification Factor)
                  </span>
                </span>
              </div>
              <div className="text-lg font-semibold text-green-700">
                {amplificationMetrics.leverRatioDecibelGain.toFixed(1)} dB
              </div>
            </div>

            {/* Area Ratio Section */}
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <div className="text-xs font-semibold text-gray-700 mb-2">From Area Compression</div>
              <div className="text-xs text-gray-600 mb-1 flex items-center justify-center gap-1 relative group">
                Area Ratio
                <span className="text-blue-500 cursor-help relative">
                  ℹ️
                  <span className="absolute left-full ml-2 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {eardrumArea.toFixed(1)} mm² / {ovalWindowArea.toFixed(1)} mm²<br/>
                    = {amplificationMetrics.areaRatio.toFixed(2)}:1
                  </span>
                </span>
              </div>
              <div className="text-xl font-bold text-blue-600">
                {amplificationMetrics.areaRatio.toFixed(2)}:1
              </div>
              <div className="text-xs text-gray-500 mt-1 mb-2">
                Eardrum / Oval Window
              </div>
              <div className="text-xs text-gray-600 mb-1 flex items-center justify-center gap-1 relative group">
                Decibel Gain
                <span className="text-gray-400 cursor-help relative">
                  ℹ️
                  <span className="absolute left-1/2 -translate-x-3/4 bottom-full mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    Decibel Gain = 20 × log₁₀(Amplification Factor)
                  </span>
                </span>
              </div>
              <div className="text-lg font-semibold text-blue-700">
                {amplificationMetrics.areaRatioDecibelGain.toFixed(1)} dB
              </div>
            </div>

            {/* Total Amplification */}
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <div className="text-xs font-semibold text-gray-700 mb-2">Total Amplification</div>
              <div className="text-xs text-gray-600 mb-1">Amplification Factor</div>
              <div className="text-2xl font-bold text-purple-600">
                {amplificationMetrics.amplificationFactor.toFixed(1)}x
              </div>
              <div className="text-xs text-gray-500 mt-1 mb-2">
                Lever Ratio × Area Ratio
              </div>
              <div className="text-xs text-gray-600 mb-1 flex items-center justify-center gap-1 relative group">
                Total Decibel Gain
                <span className="text-gray-400 cursor-help relative">
                  ℹ️
                  <span className="absolute left-1/2 -translate-x-3/4 bottom-full mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    Decibel Gain = 20 × log₁₀(Amplification Factor)
                  </span>
                </span>
              </div>
              <div className="text-lg font-semibold text-purple-700">
                {amplificationMetrics.decibelGain.toFixed(1)} dB
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

