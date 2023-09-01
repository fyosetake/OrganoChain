const Blockchain = require('./Blockchain');
const Block = require('./Block');
const OrganicProduct = require('./OrganicProduct');

const organoChain = new Blockchain();
const product1 = new OrganicProduct(1, 'Maçã', '1234567890123', 'Frutas', 'Fazenda Santa Maria');

product1.addStage({ stage: 'Plantio', details: 'Espaldeira' });
const block1 = new Block(1, new Date().toString(), product1.getName(), { stage: 'Plantio', details: 'Espaldeira' });
organoChain.addBlock(block1);

console.log('É um \"blockchain\" válido? ' + organoChain.isChainValid());
console.log(JSON.stringify(organoChain, null, 2));