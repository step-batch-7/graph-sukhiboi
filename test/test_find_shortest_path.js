const assert = require('chai').assert;
const { Graph, findShortestPath } = require('./../src/graph');
const largeTestData = require('./testData.json');

describe('findShortestPath', () => {
  it('should find the shortest path in a sparsely connected small amount of nodes', () => {
    const pairs = [
      ['a', 'b', 6],
      ['a', 'd', 1],
      ['b', 'a', 6],
      ['b', 'd', 2],
      ['b', 'e', 2],
      ['b', 'c', 5],
      ['c', 'b', 5],
      ['c', 'e', 5],
      ['d', 'a', 1],
      ['d', 'b', 2],
      ['d', 'e', 1],
      ['e', 'd', 1],
      ['e', 'b', 2],
      ['e', 'c', 5],
    ];
    const graph = Graph.init(pairs);
    const expectation = ['a', 'd', 'e', 'c'];
    assert.deepStrictEqual(findShortestPath(graph, 'a', 'c'), expectation);
  });
  it('should find the shortest path in a densely connected small amount of nodes', () => {
    const pairs = [
      ['a', 'b', 5],
      ['a', 'c', 8],
      ['b', 'c', 3],
      ['b', 'd', 1],
      ['b', 'e', 2],
      ['b', 'a', 5],
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
    const expectation = ['a', 'b', 'e', 'f'];
    assert.deepStrictEqual(findShortestPath(graph, 'a', 'f'), expectation);
  });
  it('should find shortest path in a densely connected large amount of nodes', () => {
    const graph = Graph.init(largeTestData);
    const expectation = ['aa', 'll', 'ff', 'mm'];
    assert.deepStrictEqual(findShortestPath(graph, 'aa', 'mm'), expectation);
  });
});
