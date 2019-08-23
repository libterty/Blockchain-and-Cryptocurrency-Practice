const { DIFFCULTY, MINE_RATE } = require('../config')
const ChainUtil = require('../chain.util')
// const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, diffculty) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
    this.diffculty = diffculty || DIFFCULTY
  }

  toString() {
    return `Block -
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash.substring(0, 10)}
        hash     : ${this.hash.substring(0, 10)}
        Nonce    : ${this.nonce}
        Diffculty: ${this.diffculty}
        Data     " ${this.data}
      `
  }

  /** identifier enable us to enter directly without having new instance, you can directly use etc. Block.gensis() in other file  */
  static genesis() {
    return new this('Genesis time', '-----', 'f1r57-h45h', [], 0, DIFFCULTY) // this of the block itself
  }

  static mineBlock(lastBlock, data) {
    let hash, timestamp
    const lastHash = lastBlock.hash
    let { diffculty } = lastBlock // Assgin a diffuclty of its last block
    let nonce = 0

    do {
      nonce++
      timestamp = Date.now()
      diffculty = Block.adjustDiffculty(lastBlock, timestamp) // Recalculating diffculty base on timestamp of the nearly mine block
      hash = Block.hash(timestamp, lastHash, data, nonce, diffculty)
    } while (hash.substring(0, diffculty) !== '0'.repeat(diffculty))

    return new this(timestamp, lastHash, hash, data, nonce, diffculty)
  }

  static hash(timestamp, lastHash, data, nonce, diffculty) {
    return ChainUtil.hash(
      `${timestamp}${lastHash}${data}${nonce}${diffculty}`
    ).toString()
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce, diffculty } = block
    return Block.hash(timestamp, lastHash, data, nonce, diffculty)
  }

  static adjustDiffculty(lastBlock, currentTime) {
    let { diffculty } = lastBlock
    diffculty =
      lastBlock.timestamp + MINE_RATE > currentTime
        ? diffculty + 1
        : diffculty - 1
    return diffculty
  }
}

module.exports = Block
