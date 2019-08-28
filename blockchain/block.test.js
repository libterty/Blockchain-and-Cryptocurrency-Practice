const Block = require('./block');

describe('Block', () => {
  let data, lastBlock, block;

  beforeEach(() => {
    data = 'bar';
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });
  it('sets the `data` to match the input', () => {
    expect(block.data).toEqual(data);
  });

  it('sets the `lasthash` to match the of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });

  it('generate a hash that matches the difficulty', () => {
    expect(block.hash.substring(0, block.diffculty)).toEqual(
      '0'.repeat(block.diffculty)
    );
    console.log(block.toString());
  });

  it('lowers the difficulty for slowly mined blocks', () => {
    expect(Block.adjustDiffculty(block, block.timestamp + 360000)).toEqual(
      block.diffculty - 1
    );
  });

  it('raise the difficulty for quickly mined blocks', () => {
    expect(Block.adjustDiffculty(block, block.timestamp + 1)).toEqual(
      block.diffculty + 1
    );
  });
});
