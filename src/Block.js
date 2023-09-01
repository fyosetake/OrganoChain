const crypto = require('crypto');

class Block {
  constructor(index, timestamp, product, stage, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.product = product;
    this.stage = stage;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash)
      .digest('hex');
  }
  
  addProduct(product) {
    this.data.products.push(product);
  }
}

module.exports = Block;