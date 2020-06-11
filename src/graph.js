const getChildren = function (pairs, [source]) {
  return pairs.filter(([from]) => from === source).map(([, to]) => to);
};

const parse = function (pairs) {
  return pairs.reduce((graph, pair) => {
    const [from] = pair;
    if (graph[from] == undefined) {
      graph[from] = getChildren(pairs, pair);
    }
    return graph;
  }, {});
};

const bfs = function (pairs, source, target) {
  const visited = new Set();
  const to_visit = [source];
  const graph = parse(pairs);
  while (to_visit.length > 0) {
    const current = to_visit.shift();
    if (graph[current] && graph[current].includes(target)) return true;
    visited.add(current);
    const children = graph[current] != undefined ? graph[current] : [];
    for (const child of children) if (!visited.has(child)) to_visit.push(child);
  }
  return false;
};

module.exports = { bfs };
