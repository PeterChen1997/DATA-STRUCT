import LinkedListNode from './LinkedListNode'
import Comparator from '../../utils/Comparator'

class LinkedList {
  constructor(comparatorFunction) {
    /** @var LinkedListNode */    
    this.head = null
    /** @var LinkedListNode */    
    this.tail = null

    this.compare = new Comparator(comparatorFunction)
  }

  /**
   * make new node to be a head
   * @param {any} value 
   * @returns {LinkedList}
   * @memberof LinkedList
   */
  prepend(value) {
    this.head = new LinkedListNode(value, this.head)
    return this
  }

  /**
   * append a new node to the linked list
   * @param {any} value 
   * @returns {LinkedList}
   * @memberof LinkedList
   */
  append(value) {
    const newNode = new LinkedListNode(value)

    // if the head is null, make a new head
    if (!this.head) {
      this.head = newNode
      this.tail = newNode

      return this
    }
    
    // attach new node to the end of the linked list
    this.tail.next = newNode
    this.tail = newNode

    return this
  }

  /**
   * delete the value in the linked list
   * @param {any} value 
   * @memberof LinkedList
   */
  delete(value) {
    if (!this.head) {
      return null
    }

    let deletedNode = null

    // if the head is the one needed to be delete
    if(this.compare.equal(this.head.value, value)) {
      deletedNode = this.head
      this.head = this.head.next
    }

    // store the pointer node
    let currentNode = this.head

    if (currentNode != null) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }

    // if the tail is the one needed to be delete
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode
      deletedNode = this.tail
    }

    return deletedNode
  }

  /**
   * find the node
   * @param {object} { value = undefined, callback = undefined } 
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @returns {LinkedListNode}
   * @memberof LinkedList
   */
  find({ value = undefined, callback = undefined }) {
    if(!this.head) {
      return null
    }

    let currentNode = this.head

    while(currentNode) {
      // check if need to use the callback to find the node
      if (callback && callback(currentNode.value)) {
        return currentNode
      }
      
      // compare by value
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }

      currentNode = currentNode.next
    }

    return null
  }

  /**
   * delete this linkedlist's tail
   * @returns {LinkedListNode}
   * @memberof LinkedList
   */
  deleteTail() {
    // length <= 1

    if(this.head === this.tail) {
      const deletedTail = this.tail
      this.head = null
      this.tail = null  

      return deletedTail
    }

    // length > 1

    const deletedTail = this.tail
    // fix the end of this linked list
    let currentNode = this.head
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }

    this.tail = currentNode
    return deletedTail
  }

  /**
   * delete the head of this linkedlist
   * @returns {LinkedListNode}
   * @memberof LinkedList
   */
  deleteHead() {
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    
    if (this.head.next) {
      // length > 1
      this.head = this.head.next
    } else {
      // length <= 1
      this.head = null
      this.tail = null
    }

    return deletedHead
  }

  /**
   * list to node array
   * @returns {LinkedListNode[]}
   * @memberof LinkedList
   */
  toArray() {
    const nodes = []

    let currentNode = this.head
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  /**
   * let list to node string
   * @param {function} callback 
   * @returns {string} 
   * @memberof LinkedList
   */
  toString(callback) {
    return this.toArray().map(node => node.toString(callback)).toString()
  }

}

export default LinkedList