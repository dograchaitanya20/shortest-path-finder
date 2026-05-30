import React, { useState, useCallback } from 'react';
import { Network, Zap, GitBranch, Heart, LogOut, User } from 'lucide-react';

import GraphVisualization from './components/GraphVisualization';
import InputControls from './components/InputControls';
import AlgorithmSelector from './components/AlgorithmSelector';
import ResultsDisplay from './components/ResultsDisplay';
import CodeDisplay from './components/CodeDisplay';
import ThemeToggle from './components/ThemeToggle';

import { dijkstra, getPath as getDijkstraPath } from './algorithms/dijkstra';
import { bellmanFord, getPath as getBellmanFordPath } from './algorithms/bellmanFord';
import { prim } from './algorithms/prim';
import { kruskal } from './algorithms/kruskal';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [nodes, setNodes] = useState([
    { id: 'A', label: 'A' },
    { id: 'B', label: 'B' },
    { id: 'C', label: 'C' },
    { id: 'D', label: 'D' }
  ]);
  const [edges, setEdges] = useState([
    { id: 'AB', from: 'A', to: 'B', weight: 4 },
    { id: 'AC', from: 'A', to: 'C', weight: 2 },
    { id: 'BC', from: 'B', to: 'C', weight: 1 },
    { id: 'BD', from: 'B', to: 'D', weight: 5 },
    { id: 'CD', from: 'C', to: 'D', weight: 8 }
  ]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra');
  const [startNode, setStartNode] = useState('A');
  const [endNode, setEndNode] = useState('D');
  const [result, setResult] = useState(null);
  const [highlightedPath, setHighlightedPath] = useState([]);
  const [highlightedMST, setHighlightedMST] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);

  // Convert edges to adjacency list format
  const createGraph = useCallback(() => {
    const graph = {};
    nodes.forEach(node => {
      graph[node.id] = [];
    });
    edges.forEach(edge => {
      graph[edge.from].push({ node: edge.to, weight: edge.weight });
      graph[edge.to].push({ node: edge.from, weight: edge.weight });
    });
    return graph;
  }, [nodes, edges]);

  const handleAddNode = useCallback((nodeId) => {
    const newNode = { id: nodeId, label: nodeId };
    setNodes(prev => [...prev, newNode]);
  }, []);

  const handleAddEdge = useCallback((from, to, weight) => {
    const edgeId = `${from}${to}`;
    const newEdge = { id: edgeId, from, to, weight };
    setEdges(prev => [...prev, newEdge]);
  }, []);

  const executeAlgorithm = useCallback(async () => {
    setIsLoading(true);
    setResult(null);
    setHighlightedPath([]);
    setHighlightedMST([]);
    await new Promise(resolve => setTimeout(resolve, 500));
    const startTime = performance.now();
    const graph = createGraph();
    let algorithmResult = null;
    try {
      switch (selectedAlgorithm) {
        case 'dijkstra': {
          const { distances, previous } = dijkstra(graph, startNode);
          const path = getDijkstraPath(previous, startNode, endNode);
          algorithmResult = {
            distance: distances[endNode],
            path: path.length > 0 && path[0] === startNode ? path : [],
            type: 'path'
          };
          setHighlightedPath(algorithmResult.path);
          break;
        }
        case 'bellman-ford': {
          const { distances, previous, hasNegativeCycle } = bellmanFord(graph, startNode);
          const path = getBellmanFordPath(previous, startNode, endNode);
          algorithmResult = {
            distance: distances[endNode],
            path: path.length > 0 && path[0] === startNode ? path : [],
            hasNegativeCycle,
            type: 'path'
          };
          setHighlightedPath(algorithmResult.path);
          break;
        }
        case 'prim': {
          const { mst, totalWeight } = prim(graph);
          algorithmResult = {
            mst,
            totalWeight,
            type: 'mst'
          };
          setHighlightedMST(mst);
          break;
        }
        case 'kruskal': {
          const { mst, totalWeight } = kruskal(graph);
          algorithmResult = {
            mst,
            totalWeight,
            type: 'mst'
          };
          setHighlightedMST(mst);
          break;
        }
        default:
          throw new Error('Unknown algorithm');
      }
    } catch (error) {
      console.error('Algorithm execution error:', error);
      algorithmResult = { error: error.message };
    }
    const endTime = performance.now();
    const executionTimeMs = Math.round((endTime - startTime) * 100) / 100;
    setExecutionTime(executionTimeMs);
    setResult(algorithmResult);
    setIsLoading(false);
  }, [selectedAlgorithm, startNode, endNode, createGraph]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      {/* Header */}
      <header className={`shadow-sm border-b transition-colors duration-300 ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Network className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Shortest Path Finder</h1>
                <p className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>Visualize and compare graph algorithms</p>
              </div>
            </div>
            <div className={`flex items-center gap-4 text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                <span>Real-time visualization</span>
              </div>
              <div className="flex items-center gap-1">
                <GitBranch className="w-4 h-4" />
                <span>4 algorithms</span>
              </div>
              <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <InputControls
              nodes={nodes}
              onAddNode={handleAddNode}
              onAddEdge={handleAddEdge}
              isDark={isDark}
            />
            <AlgorithmSelector
              nodes={nodes}
              selectedAlgorithm={selectedAlgorithm}
              setSelectedAlgorithm={setSelectedAlgorithm}
              startNode={startNode}
              setStartNode={setStartNode}
              endNode={endNode}
              setEndNode={setEndNode}
              onFindPath={executeAlgorithm}
              isLoading={isLoading}
              isDark={isDark}
            />
          </div>
          {/* Right Column - Visualization, Code, and Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Graph Visualization */}
            <div className={`rounded-lg p-6 shadow-md border ${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Graph Visualization
              </h3>
              <div style={{ height: '400px' }}>
                <GraphVisualization
                  nodes={nodes}
                  edges={edges}
                  highlightedPath={highlightedPath}
                  highlightedMST={highlightedMST}
                  isDark={isDark}
                />
              </div>
            </div>
            {/* Code Display */}
            {selectedAlgorithm && (
              <CodeDisplay 
                algorithm={selectedAlgorithm} 
                isDark={isDark}
              />
            )}
            {/* Results */}
            {result && (
              <ResultsDisplay
                result={result}
                algorithm={selectedAlgorithm}
                executionTime={executionTime}
                isDark={isDark}
              />
            )}
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className={`border-t mt-12 transition-colors duration-300 ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`text-center text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <p className="flex items-center justify-center gap-2">
              Built with React, Tailwind CSS, and vis-network • Graph algorithms visualization tool
            </p>
            <p className="mt-2 flex items-center justify-center gap-1">
              Created with <Heart className="w-4 h-4 text-red-500" /> by <span className="font-semibold">Komal Joshi</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
// ...existing code...