//Example
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to
// Should return true.
const Queue = require('./queue');

const getChildren = function (pairs, node) {
  return pairs.reduce((children, pair) => {
    const [from, to] = pair;
    if (from === node) return [...children, to];
    return children;
  }, []);
};

const bfs = function (pairs, source, target) {
  const visited = new Queue();
  const to_visit = new Queue();
  to_visit.enqueue(source);
  while (!to_visit.isEmpty()) {
    const node = to_visit.dequeue();
    visited.enqueue(node);
    const children = getChildren(pairs, node);
    children.forEach((child) => {
      if (!visited.isElementAvailable(child)) to_visit.enqueue(child);
    });
    if (node === target) return true;
  }
  return false;
};

module.exports = { bfs };
