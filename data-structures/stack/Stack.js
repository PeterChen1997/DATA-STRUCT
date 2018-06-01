import LinkedList from '../link-list/LinkedList'

class Stack {
  constructor() {
    this.linkedList = new LinkedList()
  }

  isEmpty() {
    return !this.linkedList.tail
  }

  peek() {
    return !this.isEmpty() ? this.linkedList.tail.value : null
  }

  push(value) {
    this.linkedList.append(value)
  }

  pop() {
    const removedElement = this.linkedList.deleteTail()
    return removedElement ? removedElement.value : null
  }

  toArray() {
    return this.linkedList
      .toArray()
      .map(node => node.value)
      .reverse()
  }

  toString(callback) {
    return this.linkedList.toString(callback)
  }
}

export default Stack