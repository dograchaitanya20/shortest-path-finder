export function bellmanFord(graph, startNode) {
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
}

export function getPath(previous, startNode, endNode) {
  const path = [];
  let currentNode = endNode;

  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  return path[0] === startNode ? path : [];
}