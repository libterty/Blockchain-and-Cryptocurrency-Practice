const { DIFFCULTY } = require('../config')
const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(timestamp, lastHash, hash, data, nonce) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
  }

  toString() {
    return `Block -
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash.substring(0, 10)}
        hash     : ${this.hash.substring(0, 10)}
        Nonce    : ${this.nonce}
        Data     " ${this.data}
      `
  }

  /** identifier enable us to enter directly without having new instance, you can directly use etc. Block.gensis() in other file  */
  static genesis() {
    return new this('Genesis time', '-----', 'f1r57-h45h', [], 0) // this of the block itself
  }

  static mineBlock(lastBlock, data) {
    let hash, timestamp
    const lastHash = lastBlock.hash
    let nonce = 0
    do {
      nonce++
      timestamp = Date.now()
      hash = Block.hash(timestamp, lastHash, data, nonce)
    } while (hash.substring(0, DIFFCULTY) !== '0'.repeat(DIFFCULTY))
    return new this(timestamp, lastHash, hash, data, nonce)
  }

  static hash(timestamp, lastHash, data, nonce) {
    return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString()
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce } = block
    return Block.hash(timestamp, lastHash, data, nonce)
  }
}

module.exports = Block
