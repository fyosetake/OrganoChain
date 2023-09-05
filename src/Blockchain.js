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
    // Carregue a blockchain a partir dos dados fornecidos (data)
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
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;