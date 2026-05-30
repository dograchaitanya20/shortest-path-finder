export function prim(graph) {
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
    // Sort edges by weight (simple approach for small graphs)
    edges.sort((a, b) => a.weight - b.weight);
    
    // Find the minimum weight edge that connects to an unvisited node
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

    // Add new edges from the newly visited node
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
}