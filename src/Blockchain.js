const Block = require('./Block');

class Blockchain {
  constructor(product) {
    this.product = product;
    this.chain = [this.createGenesisBlock()];
    this.currentTransactions = [];
  }

  createGenesisBlock() {
    return new Block(0, new Date().toString(), 'Genesis Block', '0');
  }

  loadBlockchain(data) {
    if (Array.isArray(data)) {
      this.chain = data;
    }
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    const { chain } = this;
    chainLength = chain.length;

    for (let i = 1; i < chainLength; i++) {
      const currentBlock = chain[i];
      const previousBlock = chain[i - 1];

      const isCurrentBlockValid = currentBlock.hash === currentBlock.calculateHash();
      const isPreviousBlockValid = currentBlock.previousHash === previousBlock.hash;

      if (!(isCurrentBlockValid && isPreviousBlockValid)) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;