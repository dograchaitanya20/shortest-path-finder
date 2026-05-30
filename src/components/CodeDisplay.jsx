import React, { useState } from 'react';
import { Code, ChevronDown, ChevronUp, Clock, Zap } from 'lucide-react';

const CodeDisplay = ({ algorithm, isDark }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const algorithmData = {
    'dijkstra': {
      name: "Dijkstra's Algorithm",
      timeComplexity: "O((V + E) log V)",
      spaceComplexity: "O(V)",
      code: `function dijkstra(graph, startNode) {
  const distances = {};
  const previous = {};
  const visited = new Set();
  const unvisited = new Set();

  // Initialize distances
  for (const node in graph) {
    distances[node] = node === startNode ? 0 : Infinity;
    previous[node] = null;
    unvisited.add(node);
  }

  while (unvisited.size > 0) {
    // Find unvisited node with minimum distance
    let currentNode = null;
    let minDistance = Infinity;
    
    for (const node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        currentNode = node;
      }
    }

    if (currentNode === null || distances[currentNode] === Infinity) {
      break;
    }

    unvisited.delete(currentNode);
    visited.add(currentNode);

    // Update distances to neighbors
    if (graph[currentNode]) {
      for (const neighbor of graph[currentNode]) {
        if (!visited.has(neighbor.node)) {
          const newDistance = distances[currentNode] + neighbor.weight;
          if (newDistance < distances[neighbor.node]) {
            distances[neighbor.node] = newDistance;
            previous[neighbor.node] = currentNode;
          }
        }
      }
    }
  }

  return { distances, previous };
}`
    },
    'bellman-ford': {
      name: "Bellman-Ford Algorithm",
      timeComplexity: "O(V × E)",
      spaceComplexity: "O(V)",
      code: `function bellmanFord(graph, startNode) {
  const distances = {};
  const previous = {};
  const nodes = Object.keys(graph);
  
  // Initialize distances
  for (const node of nodes) {
    distances[node] = node === startNode ? 0 : Infinity;
    previous[node] = null;
  }

  // Relax edges repeatedly
  for (let i = 0; i < nodes.length - 1; i++) {
    for (const node of nodes) {
      if (graph[node] && distances[node] !== Infinity) {
        for (const neighbor of graph[node]) {
          const newDistance = distances[node] + neighbor.weight;
          if (newDistance < distances[neighbor.node]) {
            distances[neighbor.node] = newDistance;
            previous[neighbor.node] = node;
          }
        }
      }
    }
  }

  // Check for negative cycles
  let hasNegativeCycle = false;
  for (const node of nodes) {
    if (graph[node] && distances[node] !== Infinity) {
      for (const neighbor of graph[node]) {
        const newDistance = distances[node] + neighbor.weight;
        if (newDistance < distances[neighbor.node]) {
          hasNegativeCycle = true;
          break;
        }
      }
    }
    if (hasNegativeCycle) break;
  }

  return { distances, previous, hasNegativeCycle };
}`
    },
    'prim': {
      name: "Prim's Algorithm",
      timeComplexity: "O(E log V)",
      spaceComplexity: "O(V)",
      code: `function prim(graph) {
  const nodes = Object.keys(graph);
  if (nodes.length === 0) return { mst: [], totalWeight: 0 };

  const mst = [];
  const visited = new Set();
  const edges = [];
  
  // Start with the first node
  const startNode = nodes[0];
  visited.add(startNode);
  
  // Add all edges from start node to priority queue
  if (graph[startNode]) {
    for (const neighbor of graph[startNode]) {
      edges.push({
        from: startNode,
        to: neighbor.node,
        weight: neighbor.weight
      });
    }
  }

  let totalWeight = 0;

  while (visited.size < nodes.length && edges.length > 0) {
    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);
    
    // Find minimum weight edge to unvisited node
    let edgeIndex = -1;
    for (let i = 0; i < edges.length; i++) {
      if (!visited.has(edges[i].to)) {
        edgeIndex = i;
        break;
      }
    }

    if (edgeIndex === -1) break;

    const minEdge = edges.splice(edgeIndex, 1)[0];
    visited.add(minEdge.to);
    mst.push(minEdge);
    totalWeight += minEdge.weight;

    // Add new edges from newly visited node
    if (graph[minEdge.to]) {
      for (const neighbor of graph[minEdge.to]) {
        if (!visited.has(neighbor.node)) {
          edges.push({
            from: minEdge.to,
            to: neighbor.node,
            weight: neighbor.weight
          });
        }
      }
    }
  }

  return { mst, totalWeight };
}`
    },
    'kruskal': {
      name: "Kruskal's Algorithm",
      timeComplexity: "O(E log E)",
      spaceComplexity: "O(V)",
      code: `class UnionFind {
  constructor(nodes) {
    this.parent = {};
    this.rank = {};
    
    for (const node of nodes) {
      this.parent[node] = node;
      this.rank[node] = 0;
    }
  }

  find(node) {
    if (this.parent[node] !== node) {
      this.parent[node] = this.find(this.parent[node]);
    }
    return this.parent[node];
  }

  union(node1, node2) {
    const root1 = this.find(node1);
    const root2 = this.find(node2);

    if (root1 !== root2) {
      if (this.rank[root1] < this.rank[root2]) {
        this.parent[root1] = root2;
      } else if (this.rank[root1] > this.rank[root2]) {
        this.parent[root2] = root1;
      } else {
        this.parent[root2] = root1;
        this.rank[root1]++;
      }
      return true;
    }
    return false;
  }
}

function kruskal(graph) {
  const nodes = Object.keys(graph);
  if (nodes.length === 0) return { mst: [], totalWeight: 0 };

  const edges = [];
  const visited = new Set();

  // Collect all edges
  for (const node of nodes) {
    if (graph[node]) {
      for (const neighbor of graph[node]) {
        const edgeKey = [node, neighbor.node].sort().join('-');
        if (!visited.has(edgeKey)) {
          edges.push({
            from: node,
            to: neighbor.node,
            weight: neighbor.weight
          });
          visited.add(edgeKey);
        }
      }
    }
  }

  // Sort edges by weight
  edges.sort((a, b) => a.weight - b.weight);

  const unionFind = new UnionFind(nodes);
  const mst = [];
  let totalWeight = 0;

  for (const edge of edges) {
    if (unionFind.union(edge.from, edge.to)) {
      mst.push(edge);
      totalWeight += edge.weight;
      
      if (mst.length === nodes.length - 1) {
        break;
      }
    }
  }

  return { mst, totalWeight };
}`
    }
  };

  const data = algorithmData[algorithm];
  if (!data) return null;

  return (
    <div className={`rounded-lg p-6 shadow-md border ${
      isDark 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          <Code className="w-5 h-5 text-blue-500" />
          Algorithm Implementation
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors duration-200 ${
            isDark 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isExpanded ? 'Hide Code' : 'Show Code'}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <div className={`mb-4 p-4 rounded-lg ${
        isDark ? 'bg-gray-700' : 'bg-blue-50'
      }`}>
        <h4 className={`font-medium mb-3 ${
          isDark ? 'text-white' : 'text-blue-900'
        }`}>
          {data.name}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className={`text-sm ${
              isDark ? 'text-gray-300' : 'text-blue-700'
            }`}>
              Time Complexity: <code className="font-mono font-semibold">{data.timeComplexity}</code>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-500" />
            <span className={`text-sm ${
              isDark ? 'text-gray-300' : 'text-blue-700'
            }`}>
              Space Complexity: <code className="font-mono font-semibold">{data.spaceComplexity}</code>
            </span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className={`rounded-lg p-4 overflow-x-auto ${
          isDark ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <pre className={`text-sm font-mono ${
            isDark ? 'text-gray-300' : 'text-gray-800'
          }`}>
            <code>{data.code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;