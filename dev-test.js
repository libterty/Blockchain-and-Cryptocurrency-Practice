const Block = require('./block')

/**
 * Block.gensis() as first Block, foo as store data
 */
console.log(Block.genesis())
const fooBlock = Block.mineBlock(Block.genesis(), 'foo')
console.log(fooBlock)