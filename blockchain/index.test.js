const Blockchain = require('./index')
const Block = require('./block')

describe('Blockcahin', () => {
  // set a instance before every each of unit test
  let bc, bc2

  beforeEach(() => {
    // refreshing blockchain as new one to avoid polluting
    bc = new Blockchain()
    bc2 = new Blockchain()
  })

  it('start with genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis())
  })

  it('adds a new block', () => {
    const data = 'foo'
    bc.addBlock(data)

    expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
  })

  /** Ensure vaild a valid chain */
  it('validates a valid chain', () => {
    bc2.addBlock('foo')

    expect(bc.isValidChain(bc2.chain)).toBe(true)
  })

  /** invalid a corrupt chain */
  it('invalidates a chain with a corrupt genesis block', () => {
    bc2.chain[0].data = 'Bad data'

    expect(bc.isValidChain(bc2.chain)).toBe(false)
  })

  /** invalid not a gensis block */

  it('invalidates a corrupt chain', () => {
    bc2.addBlock('foo')
    bc2.chain[1].data = 'Not foo'

    expect(bc.isValidChain(bc2.chain)).toBe(false)
  })

  it('replaces the chain with a valid chain', () => {
    bc2.addBlock('goo')
    bc.replaceChain(bc2.chain)

    expect(bc.chain).toEqual(bc2.chain)
  })

  it('does not replace the chain with one of less than or equal to length', () => {
    bc.addBlock('foo')
    bc.replaceChain(bc2.chain)

    expect(bc.chain).not.toEqual(bc2.chain)
  })
})
