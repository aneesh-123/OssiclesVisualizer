import { AmplificationResult } from '../utils/physics';

interface AmplificationDisplayProps {
  metrics: AmplificationResult;
}

export default function AmplificationDisplay({ metrics }: AmplificationDisplayProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Amplification Metrics
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
          <div className="text-sm text-gray-600 dark:text-gray-400">Area Ratio</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {metrics.areaRatio.toFixed(2)}:1
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
          <div className="text-sm text-gray-600 dark:text-gray-400">Lever Ratio</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {metrics.leverRatio.toFixed(2)}:1
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded col-span-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Amplification</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {metrics.amplificationFactor.toFixed(1)}x
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Amplification = Area Ratio × Lever Ratio
        </p>
      </div>
    </div>
  );
}

