const getChildren = function (pairs, [source]) {
  return pairs.filter(([from]) => from === source).map(([, to]) => to);
};

class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(element) {
    this.queue.push(element);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return !Boolean(this.queue.length);
  }
}

class Graph {
  constructor() {
    this.connections = {};
  }

  areNodeConnected(source, dest) {
    const sourceConnections = this.connections[source];
    if (sourceConnections) return sourceConnections.includes(dest);
    return false;
  }

  getChildren(node) {
    const nodeConnections = this.connections[node];
    if (nodeConnections) return nodeConnections;
    return [];
  }

  static init(pairs) {
    const graph = new Graph();
    graph.connections = pairs.reduce((graph, pair) => {
      const [from] = pair;
      if (graph[from] == undefined) graph[from] = getChildren(pairs, pair);
      return graph;
    }, {});
    return graph;
  }
}

const bfs = function (pairs, source, target) {
  const visited = new Set();
  const to_visit = new Queue();
  to_visit.enqueue(source);
  const graph = Graph.init(pairs);

  while (!to_visit.isEmpty()) {
    const current = to_visit.dequeue();
    if (graph.areNodeConnected(current, target)) return true;
    visited.add(current);
    
    graph.getChildren(current).forEach((child) => {
      if (!visited.has(child)) to_visit.enqueue(child);
    });
  }
  return false;
};

module.exports = { bfs };
