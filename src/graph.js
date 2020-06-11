const getChildren = function (pairs, node) {
  return pairs.filter(([from]) => from === node).map(([, to]) => to);
};

const bfs = function (pairs, source, target) {
  const visited = new Set();
  const to_visit = [];
  to_visit.push(source);
  while (to_visit.length > 0) {
    const current = to_visit.shift();
    visited.add(current);
    if (current === target) return true;
    const children = getChildren(pairs, current);
    for (const child of children) if (!visited.has(child)) to_visit.push(child);
  }
  return false;
};

module.exports = { bfs };
