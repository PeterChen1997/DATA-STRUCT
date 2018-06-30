import Comparator from '../../utils/comparator/Comparator'

class MinHeap {
  constructor(comparatorFunction) {
    this.heapContainer = []
    this.compare = new Comparator(comparatorFunction)
  }

  getLeftChildIndex(parentIndex) {
    return  (2 * parentIndex) + 1
  }

  getRightChildIndex(parentIndex) {
    return (2 * parentIndex) + 2
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)]
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(indexOne, indexTwo) {
    const temp = this.heapContainer[indexTwo]
    this.heapContainer[indexTwo] = this.heapContainer[indexOne]
    this.heapContainer[indexOne] = temp
  }

  peek() {
    if (this.heapContainer.length === 0) {
      return null
    }

    return this.heapContainer[0]
  }

  poll() {
    if (this.heapContainer.length === 0) {
      return null
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.shift()
    }

    const item = this.heapContainer[0]

    // move the last element from the end to the head
    this.heapContainer[0] = this.heapContainer.pop()
    this.heapifyDown()

    return item
  }

  add(item) {
    this.heapContainer.push(item)
    this.heapifyUp()
    return this
  }

  remove(item, customFindingComparator) {
    // find number of items to remove
    const customComparator = customFindingComparator || this.compare
    const numberOfItemsToRemove = this.find(item, customComparator).length

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration++) {
      const indexToRemove = this.find(item, customComparator).pop()

      // move the end one
      if (indexToRemove === (this.heapContainer.length - 1)) {
        this.heapContainer.pop()
      } else {
        // move the element to the last one
        this.heapContainer[indexToRemove] = this.heapContainer.pop()

        const parentItem = this.hasParent(indexToRemove) ? this.parent(indexToRemove) : null
        const leftChild = this.hasLeftChild(indexToRemove) ? this.leftChild(indexToRemove) : null;

        // no parent or the parent is less than it ,then heapdown
        if (leftChild !== null && (parentItem === null || this.compare.lessThan(parentItem, this.heapContainer[indexToRemove]))) {
          this.heapifyDown(indexToRemove)
        } else {
          this.heapifyUp(indexToRemove)
        }
      }
    }

    return this
  }

  find(item, customComparator) {
    const foundItemIndices = []
    const comparator = customComparator || this.compare
    
    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex++) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex)
      }
    }

    return foundItemIndices
  }

  heapifyUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1

    while(
      this.hasParent(currentIndex) &&
      this.compare.lessThan(this.heapContainer[currentIndex], this.parent(currentIndex))
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex))
      currentIndex = this.getParentIndex(currentIndex)
    }
  }

  heapifyDown(customStartIndex) {
    let currentIndex = customStartIndex || 0
    let nextIndex = null
    
    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) && 
        this.compare.lessThan(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) {
        nextIndex = this.getRightChildIndex(currentIndex)
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex)
      }
      if (this.compare.lessThan(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break;
      }

      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex;
    }
  }

  isEmpty() {
    return !this.heapContainer.length
  }

  toString() {
    return this.heapContainer.toString()
  }
}

export default MinHeap