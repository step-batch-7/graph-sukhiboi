class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(element) {
    this.queue.push(element);
  }

  dequeue() {
    return this.queue.shift();
  }

  isElementAvailable(element) {
    return this.queue.includes(element);
  }

  isEmpty() {
    return !Boolean(this.queue.length);
  }
}

module.exports = Queue;
