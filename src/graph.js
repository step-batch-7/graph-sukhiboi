const Queue = require('./queue');

const getChildren = function (pairs, node) {
  return pairs.filter(([from]) => from === node).map(([, to]) => to);
};

const bfs = function (pairs, source, target) {
  const visited = new Queue();
  const to_visit = new Queue();
  to_visit.enqueue(source);
  while (!to_visit.isEmpty()) {
    const node = to_visit.dequeue();
    visited.enqueue(node);
    const children = getChildren(pairs, node);
    if (node === target) return true;
    children.forEach((child) => {
      if (!visited.isElementAvailable(child)) to_visit.enqueue(child);
    });
  }
  return false;
};

module.exports = { bfs };
