const assert = require('chai').assert;
const { bfs } = require('./../src/graph');
const largeTestData = require('./testData.json');

describe('#bfs()', () => {
  describe('nodes sparsely connected', () => {
    const pairs = [
      [1, 2],
      [3, 2],
    ];

    it('should return false is the path not available between distinct nodes', () => {
      assert.isFalse(bfs(pairs, 1, 4));
    });

    it('should return true if path available between distinct nodes', () => {
      assert.isTrue(bfs(pairs, 1, 2));
    });

    it('should return false if given node is searched', () => {
      assert.isFalse(bfs(pairs, 1, 1));
    });
  });

  describe('single node connected to itself', () => {
    it('should return true if the given node is searched', () => {
      const pairs = [[1, 1]];
      assert.isTrue(bfs(pairs, 1, 1));
    });
  });

  describe('moderate amount of nodes densely connected', () => {
    const pairs = [
      [1, 2],
      [1, 4],
      [2, 1],
      [2, 3],
      [2, 5],
      [2, 7],
      [2, 8],
      [3, 2],
      [3, 4],
      [3, 10],
      [3, 9],
      [4, 1],
      [4, 3],
      [5, 6],
      [5, 2],
      [5, 7],
      [5, 7],
      [5, 8],
      [6, 5],
      [7, 5],
      [7, 2],
      [7, 8],
      [8, 2],
      [8, 5],
      [8, 7],
    ];

    it('should return true if path exists', () => {
      assert.isTrue(bfs(pairs, 1, 6));
    });

    it("should return false if path doesn't exists", () => {
      assert.isFalse(bfs(pairs, 1, 11));
    });

    it('should return true if path exists and is complex', () => {
      assert.isTrue(bfs(pairs, 6, 10));
    });
  });

  describe('moderate amount of node with complex connections', () => {
    const pairs = largeTestData;

    it('should return true if there is a connection', () => {
      assert.isTrue(bfs(pairs, 'jj', 'aa'));
    });
    it('should return false if there is no connection', () => {
      assert.isFalse(bfs(pairs, 'mm', 'jj'));
    });
    it("should return true if there's a path with nodes having self loops", () => {
      assert.isTrue(bfs(pairs, 'ee', 'mm'));
    });
  });
});
