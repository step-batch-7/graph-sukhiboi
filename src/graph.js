const largeTestData = require('./../test/testData.json');

class Graph {
  constructor() {
    this.connections = {};
  }

  areNodesConnected(source, dest) {
    const sourceConnections = this.connections[source];
    if (sourceConnections)
      return sourceConnections.map((node) => node.vertex).includes(dest);
    return false;
  }

  getNeighbors(node) {
    const nodeConnections = this.connections[node];
    if (nodeConnections) return nodeConnections;
    return [];
  }

  static init(pairs) {
    const graph = new Graph();
    graph.connections = pairs.reduce((data, [source]) => {
      const connections = pairs
        .filter(([from]) => from == source)
        .reduce((connections, [, to, weight]) => {
          return [...connections, { vertex: to, weight }];
        }, []);
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
    const neighbors = graph.getNeighbors(current).map((node) => node.vertex);
    neighbors.forEach((neighbor) => {
      if (!visited.has(neighbor)) to_visit.push(neighbor);
    });
  }
  return false;
};

const findPath = function (graph, visited, source, target) {
  visited.add(source);
  const connections = graph.getNeighbors(source).map((node) => node.vertex);
  const neighbors = connections.filter((neighbor) => !visited.has(neighbor));
  if (graph.areNodesConnected(source, target)) return [source, target];
  for (neighbor of neighbors) {
    const result = findPath(graph, visited, neighbor, target);
    if (result.length) return [source, ...result];
  }
  return [];
};

const getMST = function (graph) {
  const toVisit = Object.keys(graph.connections);
  const visited = [toVisit.shift()];
  const tree = [];

  while (toVisit.length) {
    let closestNode = { weight: Infinity };
    for (node of visited) {
      const neighbors = graph
        .getNeighbors(node)
        .filter((neighbor) => toVisit.includes(neighbor.vertex));
      for (neighbor of neighbors)
        if (neighbor.weight < closestNode.weight)
          closestNode = { source: node, ...neighbor };
    }
    visited.push(closestNode.vertex);
    tree.push(closestNode);
    toVisit.splice(toVisit.indexOf(closestNode.vertex), 1);
  }
  return tree;
};

module.exports = { Graph, bfs, findPath, getMST };
