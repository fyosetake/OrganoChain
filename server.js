const fs = require('fs');
const express = require('express');
const path = require('path');
const OrganicProduct = require('./src/OrganicProduct'); // Importe a classe OrganicProduct

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const productsFile = path.join(__dirname, '/data/products.json');

let products = [];

try {
  const fileData = fs.readFileSync(productsFile, 'utf-8');
  products = JSON.parse(fileData);
} catch (error) {
  console.error('Erro ao ler o arquivo JSON:', error);
}

app.post('/register-product', (req, res) => {
  const { productName, gtin, category, origin } = req.body;

  const productId = products.length + 1;
  const newProduct = new OrganicProduct(productId, productName, gtin, category, origin);

  products.push(newProduct);

  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));

  console.log('Produto registrado:', productName);
  res.status(201).send({ message: 'Produto registrado com sucesso.' });
});

app.post('/add-stage/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const { stage, details } = req.body;

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).send({ message: 'Produto não encontrado.' });
  }

  product.addStage(stage, details);

  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));

  console.log(`Estágio "${stage}" adicionado ao produto ${product.productName}`);
  res.status(201).send({ message: 'Estágio adicionado com sucesso.' });
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

app.get('/registrarProduto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registrarProduto.html'));
});

app.listen(port, () => {
  console.log(`Servidor web rodando em http://localhost:${port}`);
});
