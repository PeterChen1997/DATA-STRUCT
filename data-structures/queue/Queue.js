import LinkedList from '../link-list/LinkedList'

class Queue {
  constructor() {
    this.linkedList = new LinkedList()
  }

  isEmpty() {
    return !this.linkedList.tail
  }

  peek() {
    return this.linkedList.head ? this.linkedList.head.value : null
  }

  enqueue(value) {
    this.linkedList.append(value)
  }

  dequeue() {
    const removedHead = this.linkedList.deleteHead()
    return removedHead ? removedHead.value : null
  }

  toString(callback) {
    return this.linkedList.toString(callback)
  }
}

export default Queue