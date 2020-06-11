const getChildren = function (pairs, node) {
  return pairs.filter(([from]) => from === node).map(([, to]) => to);
};

const bfs = function (pairs, source, target) {
  const visited = new Set();
  const to_visit = [];
  visited.add(source);
  to_visit.push(source);
  while (to_visit.length > 0) {
    const current = to_visit.shift();
    const isVisited = visited.has(current);
    if (!isVisited && current === target) return true;
    visited.add(current);
    const children = getChildren(pairs, current);
    for (const child of children) {
      if (!visited.has(child)) {
        to_visit.push(child);
      }
    }
  }
  return false;
};

module.exports = { bfs };
