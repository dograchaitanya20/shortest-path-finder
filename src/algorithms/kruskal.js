class UnionFind {
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

export function kruskal(graph) {
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
}