import React, { useState } from 'react';
import { Play, MapPin, Target } from 'lucide-react';

const AlgorithmSelector = ({ 
  nodes, 
  selectedAlgorithm, 
  setSelectedAlgorithm,
  startNode,
  setStartNode,
  endNode,
  setEndNode,
  onFindPath,
  isLoading,
  isDark
}) => {
  const algorithms = [
    { 
      value: 'dijkstra', 
      label: 'Dijkstra\'s Algorithm',
      description: 'Shortest path with non-negative weights',
      type: 'path'
    },
    { 
      value: 'bellman-ford', 
      label: 'Bellman-Ford Algorithm',
      description: 'Shortest path with negative weights',
      type: 'path'
    },
    { 
      value: 'prim', 
      label: 'Prim\'s Algorithm',
      description: 'Minimum Spanning Tree',
      type: 'mst'
    },
    { 
      value: 'kruskal', 
      label: 'Kruskal\'s Algorithm',
      description: 'Minimum Spanning Tree',
      type: 'mst'
    }
  ];

  const selectedAlgorithmInfo = algorithms.find(alg => alg.value === selectedAlgorithm);
  const needsStartEnd = selectedAlgorithmInfo?.type === 'path';

  const canExecute = selectedAlgorithm && nodes.length > 0 && 
    (!needsStartEnd || (startNode && endNode && startNode !== endNode));

  return (
    <div className={`rounded-lg p-6 shadow-md border space-y-6 max-w-2xl w-full mx-auto ${
      isDark 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        Algorithm Selection
      </h3>

      {/* Algorithm Selection */}
      <div>
        <label className={`block text-sm font-medium mb-3 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Choose Algorithm
        </label>
        <div className="space-y-2">
          {algorithms.map(algorithm => (
            <label
              key={algorithm.value}
              className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedAlgorithm === algorithm.value
                  ? isDark 
                    ? 'border-blue-400 bg-blue-900/30 ring-2 ring-blue-400/30'
                    : 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : isDark
                    ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="algorithm"
                value={algorithm.value}
                checked={selectedAlgorithm === algorithm.value}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                className="mt-1 mr-3 text-blue-600"
              />
              <div className="flex-1">
                <div className={`font-medium ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>{algorithm.label}</div>
                <div className={`text-sm mt-1 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>{algorithm.description}</div>
                <div className={`text-xs mt-1 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Type: {algorithm.type === 'path' ? 'Shortest Path' : 'Minimum Spanning Tree'}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Node Selection for Path Algorithms */}
      {needsStartEnd && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={`block text-sm font-medium mb-2 flex items-center gap-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <MapPin className="w-4 h-4 text-blue-600" />
              From Node
            </label>
            <select
              value={startNode}
              onChange={(e) => setStartNode(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Select start node</option>
              {nodes.map(node => (
                <option key={node.id} value={node.id}>{node.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 flex items-center gap-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Target className="w-4 h-4 text-red-600" />
              To Node
            </label>
            <select
              value={endNode}
              onChange={(e) => setEndNode(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Select end node</option>
              {nodes.filter(node => node.id !== startNode).map(node => (
                <option key={node.id} value={node.id}>{node.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Execute Button */}
      <button
        onClick={onFindPath}
        disabled={!canExecute || isLoading}
        className={`w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
          canExecute && !isLoading
            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Computing...
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            Find Path
          </>
        )}
      </button>
    </div>
  );
};

export default AlgorithmSelector;