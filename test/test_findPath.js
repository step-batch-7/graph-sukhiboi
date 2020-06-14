const assert = require('chai').assert;
const { Graph, findPath } = require('./../src/graph');
const largeTestData = require('./testData.json');

describe('findPath', () => {
  const graph = Graph.init(largeTestData);

  it('should return a array of path if the path is available between 2 nodes', () => {
    const path = findPath(graph, new Set(), 'jj', 'aa');
    const expectation = ['jj', 'mm', 'cc', 'ff', 'ii', 'bb', 'aa'];
    assert.deepStrictEqual(path, expectation);
  });

  it('should return same element is given as source and target and element have a self loop', () => {
    const path = findPath(graph, new Set(), 'aa', 'aa');
    const expectation = ['aa', 'aa'];
    assert.deepStrictEqual(path, expectation);
  });

  it('should return empty array of path if the path is unavailable between 2 nodes', () => {
    const path = findPath(graph, new Set(), 'aa', 'jj');
    const expectation = [];
    assert.deepStrictEqual(path, expectation);
  });

  it("should return path as an array when same element is given as source and target and element don't have a self loop", () => {
    const path = findPath(graph, new Set(), 'ii', 'ii');
    const expectation = ['ii', 'ff', 'ii'];
    assert.deepStrictEqual(path, expectation);
  });
});
