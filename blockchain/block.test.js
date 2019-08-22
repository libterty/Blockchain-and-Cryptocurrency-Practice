const Block = require('./block')
const { DIFFCULTY } = require('../config')

describe('Block', () => {
  let data, lastBlock, block

  beforeEach(() => {
    data = 'bar'
    lastBlock = Block.genesis()
    block = Block.mineBlock(lastBlock, data)
  })
  it('sets the `data` to match the input', () => {
    expect(block.data).toEqual(data)
  })

  it('sets the `lasthash` to match the of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash)
  })

  it('generate a hash that matches the difficulty', () => {
    expect(block.hash.substring(0, DIFFCULTY)).toEqual('0'.repeat(DIFFCULTY))
    console.log(block.toString())
  })
})
