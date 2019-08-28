const { MINING_REWARD } = require('../config');
const ChainUtil = require('../chain.util');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  update(senderWallet, recipient, amount) {
    // find original sender outputs object that match sender's publicKey, than we can resubstract the amount should endup with
    const senderOutput = this.outputs.find(
      output => output.address === senderWallet.publicKey
    );

    if (amount > senderOutput.amount) {
      console.log(`Amount: ${amount} exceeds balance.`);
      return;
    }
    // update amount
    senderOutput.amount = senderOutput.amount - amount;
    // give output obj to the actual transaction obj
    this.outputs.push({ amount, address: recipient });

    Transaction.signTransaction(this, senderWallet);

    return this;
  }

  // Helper fn
  static transactionWithOutputs(senderWallet, outputs) {
    const transaction = new this();
    transaction.outputs.push(...outputs);
    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }

  static newTransaction(senderWallet, recipient, amount) {
    if (amount > senderWallet.balance) {
      console.log(`Amount: ${amount} exceeds balance`);
      return;
    }

    return Transaction.transactionWithOutputs(senderWallet, [
      {
        amount: senderWallet.balance - amount,
        address: senderWallet.publicKey
      },
      { amount, address: recipient }
    ]);
  }

  static rewardTransaction(minerWallet, blockchainWallet) {
    return Transaction.transactionWithOutputs(blockchainWallet, [
      {
        amount: MINING_REWARD,
        address: minerWallet.publicKey
      }
    ]);
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
    };
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    );
  }
}

module.exports = Transaction;
