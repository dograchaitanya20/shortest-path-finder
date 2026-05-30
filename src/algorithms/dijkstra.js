export function dijkstra(graph, startNode) {
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