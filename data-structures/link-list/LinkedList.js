import LinkedListNode from './LinkedListNode'

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
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

    // if the head needed to be delete
    if(this.)
  }

}

export default LinkedList