import MinHeap from '../heap/MinHeap'
import Comparator from '../../utils/comparator/Comparator'

// like minheap but we comparing the two nodes by it's priority instead of their values
class PriorityQueue extends MinHeap {
  constructor() {
    super()
    this.priorities = {}
    this.compare = new Comparator(this.comparePriority.bind(this))
  }

  comparePriority(a, b) {
    if (this.priorities[a] === this.priorities[b]) {
      return 0
    }

    return this.priorities[a] < this.priorities[b] ? -1 : 1
  }

  add(item, priority = 0) {
    this.priorities[item] = priority
    super.add(item)

    return this
  }

  remove(item, customFindingComparator) {
    super.remove(item, customFindingComparator)
    delete this.priorities[item]

    return this
  }

  changePriority(item, priority) {
    this.remove(item, new Comparator())
    this.add(item, priority)

    return this
  }

  findByValue(item) {
    return this.find(item, new Comparator())
  }

  hasValue(item) {
    return this.findByValue(item).length > 0
  }

  comparePriority(a, b) {
    if (this.priorities[a] === this.priorities[b]) {
      return 0
    }

    return this.priorities[a] < this.priorities[b] ? -1 : 1
  }
}

export default PriorityQueue