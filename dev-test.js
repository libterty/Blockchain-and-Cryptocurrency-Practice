// const Block = require('./block')

// /**
//  * Block.gensis() as first Block, foo as store data
//  */
// console.log(Block.genesis())
// const fooBlock = Block.mineBlock(Block.genesis(), 'foo')
// console.log(fooBlock)

/** dynamic diffcult test */

const Blockchain = require('./blockchain');

const bc = new Blockchain();

for (let i = 0; i < 10; i++) {
  console.log(bc.addBlock(`foo${i}`).toString());
}

/** Wallet test */
// const Wallet = require('./wallet');
// const wallet = new Wallet();
// console.log(wallet.toString());
