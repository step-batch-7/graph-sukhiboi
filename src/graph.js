const getNeighbors = function (pairs, [source]) {
  return pairs.filter(([from]) => from === source).map(([, to]) => to);
};

class Graph {
  constructor() {
    this.connections = {};
  }

  areNodesConnected(source, dest) {
    const sourceConnections = this.connections[source];
    if (sourceConnections) return sourceConnections.includes(dest);
    return false;
  }

  getNeighbors(node) {
    const nodeConnections = this.connections[node];
    if (nodeConnections) return nodeConnections;
    return [];
  }

  static init(pairs) {
    const graph = new Graph();
    graph.connections = pairs.reduce((graph, pair) => {
      const [from] = pair;
      if (graph[from] == undefined) graph[from] = getNeighbors(pairs, pair);
      return graph;
    }, {});
    return graph;
  }
}

const bfs = function (pairs, source, target) {
  const visited = new Set();
  const to_visit = [];
  to_visit.push(source);
  const graph = Graph.init(pairs);

  while (to_visit.length > 0) {
    const current = to_visit.shift();
    if (graph.areNodesConnected(current, target)) return true;
    visited.add(current);

    graph.getNeighbors(current).forEach((neighbor) => {
      if (!visited.has(neighbor)) to_visit.push(neighbor);
    });
  }
  return false;
};

module.exports = { bfs };
