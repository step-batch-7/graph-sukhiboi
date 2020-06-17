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

  getEdges() {
    const edges = Object.keys(this.connections).reduce((edges, edge) => {
      const neighbors = this.getNeighbors(edge);
      const closeEdges = neighbors.reduce((closeEdges, { vertex, weight }) => {
        return [...closeEdges, { source: edge, vertex, weight }];
      }, []);
      return [...edges, ...closeEdges];
    }, []);
    return edges;
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

const getMSTByKruskal = function (graph) {
  const edges = graph.getEdges();
  const sortedEdges = edges.sort((a, b) => a.weight - b.weight);
  const mst = [];

  const creteCycle = function (tree, edge) {
    const isSelfLoop = edge.source === edge.vertex;
    if (isSelfLoop) return true;
    const isSourceAvailable = tree.some(({ source, vertex }) => {
      return source === edge.source || vertex === edge.source;
    });
    const isVertexAvailable = tree.some(({ source, vertex }) => {
      return source === edge.vertex || vertex === edge.vertex;
    });
    return isSourceAvailable && isVertexAvailable;
  };

  while (sortedEdges.length) {
    const edge = sortedEdges.shift();
    if (!creteCycle(mst, edge)) mst.push(edge);
  }
  return mst;
};

module.exports = { Graph, bfs, findPath, getMST, getMSTByKruskal };
