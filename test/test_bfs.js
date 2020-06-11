const assert = require('chai').assert;
const { bfs } = require('./../src/graph');

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
    it.skip('should return true if the given node is searched', () => {
      const pairs = [[1, 1]];
      assert.isTrue(bfs(pairs, 1, 1));
    });
  });

  describe('single node not connected to itself', () => {
    it('should return false if the given node is searched', () => {
      const pairs = [[1, 2]];
      assert.isFalse(bfs(pairs, 1, 1));
    });
  });
});
