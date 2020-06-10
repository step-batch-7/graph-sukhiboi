const Queue = require('./queue');

const getChildren = function (pairs, node) {
  return pairs.filter(([from]) => from === node).map(([, to]) => to);
};

const bfs = function (pairs, source, target) {
  const visited = new Queue();
  const to_visit = new Queue();
  visited.enqueue(source);
  to_visit.enqueue(source);
  while (!to_visit.isEmpty()) {
    const current = to_visit.dequeue();
    if (current === target) return true;
    const children = getChildren(pairs, current);
    for (const child of children) {
      if (!visited.isElementAvailable(child)) {
        visited.enqueue(child);
        to_visit.enqueue(child);
      }
    }
  }
  return false;
};

module.exports = { bfs };
