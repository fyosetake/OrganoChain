const fs = require('fs');
const express = require('express');
const path = require('path');
const OrganicProduct = require('./src/OrganicProduct');
const Blockchain = require('./src/Blockchain');
const Block = require('./src/Block');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const productsFile = path.join(__dirname, '/data/products.json');
const blockchainFile = path.join(__dirname, '/data/blockchain.json');

let products = [];

try {
  const fileData = fs.readFileSync(productsFile, 'utf-8');
  products = JSON.parse(fileData);
} catch (error) {
  console.error('Erro ao ler o arquivo JSON:', error);
}

let blockchains = [];

try {
  const blockchainData = fs.readFileSync(blockchainFile, 'utf-8');
  blockchains = JSON.parse(blockchainData);
} catch (error) {
  console.error('Erro ao ler o arquivo JSON:', error);
}

app.post('/register-product', (req, res) => {
  const { productName, gtin, category, origin } = req.body;

  const productId = products.length + 1;
  const newProduct = new OrganicProduct(productId, productName, gtin, category, origin);

  products.push(newProduct);

  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));

  const organoChain = new Blockchain(newProduct);
  organoChain.createGenesisBlock();
  
  blockchains.push(organoChain);

  fs.writeFileSync(blockchainFile, JSON.stringify(blockchains, null, 2));

  console.log('Produto registrado:', productName);
  res.status(201).send({ message: 'Produto registrado com sucesso.' });
});

app.post('/add-stage', (req, res) => {
  const { productId, stage, details } = req.body;

  // Encontre o produto com base no productId
  const product = products.find(p => p.id === parseInt(productId));

  // Encontre o Blockchain com base no productId
  const blockchain = blockchains.find(b => b.product.id === parseInt(productId));

  if (!product) {
    return res.status(404).send({ message: 'Produto não encontrado.' });
  }
  
  if (!blockchain) {
    return res.status(404).send({ message: 'Blockchain não encontrado.' });
  }

  // Crie uma cópia dos estágios existentes do produto e adicione o novo estágio
  const updatedStages = [...product.stages, { stage, details }];

  // Encontre o índice do produto original e substitua-o pelo novo produto na matriz de produtos
  const index = products.findIndex(p => p.id === parseInt(productId));
  if (index !== -1) {
    products[index].stages = updatedStages;
  }

  // Encontre o índice do blockchain original e substitua-o pelo atual
  const indexBlockchain = blockchains.findIndex(b => b.product.id === parseInt(productId));
  if (indexBlockchain !== -1) {
    const newBlock = new Block(blockchain.chain.length, new Date().toString(), stage, blockchain.chain[blockchain.chain.length - 1].hash);
    blockchains[indexBlockchain].chain.push(newBlock);
  }

  // Atualize o arquivo JSON com os produtos
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));

  // Atualize o arquivo JSON com os blockchains
  fs.writeFileSync(blockchainFile, JSON.stringify(blockchains, null, 2));

  //console.log(`Estágio "${stage}" adicionado ao produto ${updatedProduct.productName}`);
  res.redirect('/RegistrarPonto');
});

app.get('/get-products', (req, res) => {
  res.json({ products });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registrarProduto.html'));
});

app.get('/registrarProduto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registrarProduto.html'));
});

app.get('/registrarPonto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registrarPonto.html'));
});

app.get('/get-blockchain-data', (req, res) => {
  try {
      const blockchainData = fs.readFileSync(blockchainFile, 'utf-8');
      const blockchains = JSON.parse(blockchainData);
      res.json(blockchains);
  } catch (error) {
      console.error('Erro ao ler o arquivo JSON:', error);
      res.status(500).json({ error: 'Erro ao obter os dados do blockchain' });
  }
});

app.listen(port, () => {
  console.log(`Servidor web rodando em http://localhost:${port}`);
});
