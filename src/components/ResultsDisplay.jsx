import React from 'react';
import { CheckCircle, AlertCircle, TrendingUp, Route } from 'lucide-react';

const ResultsDisplay = ({ result, algorithm, executionTime, isDark }) => {
  if (!result) return null;

  const algorithmNames = {
    'dijkstra': 'Dijkstra\'s Algorithm',
    'bellman-ford': 'Bellman-Ford Algorithm',
    'prim': 'Prim\'s Algorithm',
    'kruskal': 'Kruskal\'s Algorithm'
  };

  const isPathAlgorithm = ['dijkstra', 'bellman-ford'].includes(algorithm);
  const isMSTAlgorithm = ['prim', 'kruskal'].includes(algorithm);

  return (
    <div className={`rounded-lg p-6 shadow-md border ${
      isDark 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        <CheckCircle className="w-5 h-5 text-green-600" />
        Results
      </h3>

      <div className="space-y-4">
        {/* Algorithm Info */}
        <div className={`rounded-lg p-4 border ${
          isDark 
            ? 'bg-blue-900/30 border-blue-700' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`font-medium ${
                isDark ? 'text-blue-300' : 'text-blue-900'
              }`}>
                {algorithmNames[algorithm]}
              </div>
              <div className={`text-sm mt-1 ${
                isDark ? 'text-blue-400' : 'text-blue-700'
              }`}>
                Execution time: {executionTime}ms
              </div>
            </div>
            <div className="text-right">
              {isPathAlgorithm && (
                <div className={`text-2xl font-bold ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {result.distance === Infinity ? '∞' : result.distance}
                </div>
              )}
              {isMSTAlgorithm && (
                <div className={`text-2xl font-bold ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {result.totalWeight}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Path or MST Details */}
        {isPathAlgorithm && result.path && result.path.length > 0 && (
          <div className="space-y-3">
            <div className={`flex items-center gap-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Route className="w-4 h-4" />
              <span className="font-medium">Path Found:</span>
            </div>
            <div className={`rounded-lg p-4 ${
              isDark ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-center flex-wrap gap-2">
                {result.path.map((node, index) => (
                  <React.Fragment key={node}>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                      {node}
                    </span>
                    {index < result.path.length - 1 && (
                      <span className="text-gray-400">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        {isPathAlgorithm && result.distance === Infinity && (
          <div className={`rounded-lg p-4 border ${
            isDark 
              ? 'bg-yellow-900/30 border-yellow-700' 
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className={`flex items-center gap-2 ${
              isDark ? 'text-yellow-300' : 'text-yellow-800'
            }`}>
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">No path found between the selected nodes.</span>
            </div>
          </div>
        )}

        {algorithm === 'bellman-ford' && result.hasNegativeCycle && (
          <div className={`rounded-lg p-4 border ${
            isDark 
              ? 'bg-red-900/30 border-red-700' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className={`flex items-center gap-2 ${
              isDark ? 'text-red-300' : 'text-red-800'
            }`}>
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">Negative cycle detected in the graph!</span>
            </div>
          </div>
        )}

        {isMSTAlgorithm && result.mst && result.mst.length > 0 && (
          <div className="space-y-3">
            <div className={`flex items-center gap-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Minimum Spanning Tree Edges:</span>
            </div>
            <div className={`rounded-lg p-4 ${
              isDark ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="space-y-2">
                {result.mst.map((edge, index) => (
                  <div key={index} className={`flex items-center justify-between py-2 px-3 rounded border ${
                    isDark 
                      ? 'bg-gray-800 border-gray-600' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <span className={`font-medium ${isDark ? 'text-white' : ''}`}>
                      {edge.from} ↔ {edge.to}
                    </span>
                    <span className="text-green-600 font-semibold">
                      Weight: {edge.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;