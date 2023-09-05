const crypto = require('crypto');

class Block {
  constructor(index, timestamp, stage, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.stage = stage;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(this.index + this.timestamp + this.stage + this.previousHash)
      .digest('hex');
  }  
}

module.exports = Block;