const assert = require('chai').assert;
const { Graph, getMST } = require('./../src/graph');

describe('getMST', () => {
  it('should get the minium spanning tree from sparsely connected nodes', () => {
    const pairs = [
      ['a', 'b', 5],
      ['a', 'c', 8],
      ['b', 'c', 3],
      ['b', 'd', 1],
      ['b', 'e', 2],
      ['c', 'd', 1],
      ['c', 'b', 3],
      ['c', 'a', 8],
      ['e', 'f', 2],
      ['e', 'b', 2],
      ['d', 'f', 4],
      ['d', 'c', 1],
      ['d', 'b', 1],
      ['f', 'd', 4],
      ['f', 'e', 2],
    ];
    const graph = Graph.init(pairs);
    const expectation = [
      { source: 'a', vertex: 'b', weight: 5 },
      { source: 'b', vertex: 'd', weight: 1 },
      { source: 'd', vertex: 'c', weight: 1 },
      { source: 'b', vertex: 'e', weight: 2 },
      { source: 'e', vertex: 'f', weight: 2 },
    ];
    assert.deepStrictEqual(getMST(graph), expectation);
  });

  it('should description get minium spanning tree from densely connected small amount of nodes', () => {
    const pairs = [
      ['a', 'b', 5],
      ['a', 'a', 8],
      ['a', 'c', 10],
      ['a', 'c', 12],
      ['b', 'a', 5],
      ['b', 'c', 4],
      ['b', 'd', 11],
      ['c', 'a', 10],
      ['c', 'a', 12],
      ['c', 'b', 4],
      ['c', 'd', 5],
      ['d', 'd', 4],
      ['d', 'b', 11],
      ['d', 'c', 5],
    ];
    const graph = Graph.init(pairs);
    const expectation = [
      { source: 'a', vertex: 'b', weight: 5 },
      { source: 'b', vertex: 'c', weight: 4 },
      { source: 'c', vertex: 'd', weight: 5 },
    ];
    assert.deepStrictEqual(getMST(graph), expectation);
  });
});
