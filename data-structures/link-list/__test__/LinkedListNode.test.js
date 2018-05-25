import LinkListNode from '../LinkedListNode'

describe('LinkedListNode', () => {
  it('should create a new list node with value', () => {
    const node = new LinkListNode(1)

    expect(node.value).toBe(1)
    expect(node.next).toBeNull()
  })

})