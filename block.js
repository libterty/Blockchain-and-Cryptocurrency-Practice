const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
    }

    toString() {
        return `Block -
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash.substring(0, 10)}
        hash     : ${this.hash.substring(0, 10)}
        Data     " ${this.data}
      `
    }

    /** identifier enable us to enter directly without having new instance, you can directly use etc. Block.gensis() in other file  */
    static genesis() {
        return new this('Genesis time', '-----', 'f1r57-h45h', []) // this of the block itself
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now()
        const lastHash = lastBlock.hash
        const hash = Block.hash(timestamp, lastHash, data)

        return new this(timestamp, lastHash, hash, data)
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString()
    }
}

module.exports = Block