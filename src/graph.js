const largeTestData = require('./../test/testData.json');

class Graph {
  constructor() {
    this.connections = {};
  }

  areNodesConnected(source, dest) {
    const sourceConnections = this.connections[source];
    if (sourceConnections) return Object.keys(sourceConnections).includes(dest);
    return false;
  }

  getNeighbors(node) {
    const nodeConnections = this.connections[node];
    if (nodeConnections) return Object.keys(nodeConnections);
    return [];
  }

  static init(pairs) {
    const graph = new Graph();
    graph.connections = pairs.reduce((data, [source]) => {
      const connections = pairs
        .filter(([from]) => from == source)
        .reduce((connections, [, to, weight]) => {
          connections[to] = weight;
          return connections;
        }, {});
      const isSourceIncluded = Object.keys(data).includes(source);
      if (!isSourceIncluded) data[source] = connections;
      return data;
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

    const neighbors = graph.getNeighbors(current);
    neighbors.forEach((neighbor) => {
      if (!visited.has(neighbor)) to_visit.push(neighbor);
    });
  }
  return false;
};

const findPath = function (graph, visited, source, target) {
  visited.add(source);
  const connections = graph.getNeighbors(source);
  const neighbors = connections.filter((neighbor) => !visited.has(neighbor));
  if (graph.areNodesConnected(source, target)) return [source, target];
  for (neighbor of neighbors) {
    const result = findPath(graph, visited, neighbor, target);
    if (result.length) return [source, ...result];
  }
  return [];
};

const main = function () {
  const graph = Graph.init(largeTestData);
  const source = 'mm';
  const target = 'aa';
  console.log(bfs(largeTestData, source, target));
  const path = findPath(graph, new Set(), source, target);
  console.log(path);
};

main();

module.exports = { Graph, bfs, findPath };
