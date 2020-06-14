const largeTestData = require('./../test/testData.json');

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
      const [source] = pair;
      const neighbors = pairs
        .filter(([from]) => from === source)
        .map(([, to]) => to);
      if (graph[source] == undefined) graph[source] = neighbors;
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

const findPath = function (graph, visited, source, target) {
  visited.add(source);
  const neighbors = graph
    .getNeighbors(source)
    .filter((neighbor) => !visited.has(neighbor));
  for (neighbor of neighbors) {
    const result = findPath(graph, visited, neighbor, target);
    if (result) return [source, ...result];
  }
  if (neighbors.includes(target)) return [source, target];
};

const main = function () {
  const graph = Graph.init(largeTestData);
  const source = 'jj';
  const target = 'aa';
  console.log(bfs(largeTestData, source, target));
  const path = findPath(graph, new Set(), 'jj', 'aa');
  console.log(path);
};

main();

module.exports = { bfs, findPath };
