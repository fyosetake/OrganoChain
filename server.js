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

app.post('/add-stage', (req, res) => {
  const { productId, stage, details } = req.body;

  // Encontre o produto com base no productId
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return res.status(404).send({ message: 'Produto não encontrado.' });
  }

  // Crie uma cópia dos estágios existentes do produto e adicione o novo estágio
  const updatedStages = [...product.stages, { stage, details }];

  // Crie uma nova instância de OrganicProduct com os valores atuais do produto
  const updatedProduct = new OrganicProduct(
    product.id,
    product.productName,
    product.gtin,
    product.category,
    product.origin,
    updatedStages // Defina os novos estágios no construtor
  );

  // Encontre o índice do produto original e substitua-o pelo novo produto na matriz de produtos
  const index = products.findIndex(p => p.id === parseInt(productId));
  if (index !== -1) {
    products[index] = updatedProduct;
  }

  // Atualize o arquivo JSON com os produtos
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));

  console.log(`Estágio "${stage}" adicionado ao produto ${updatedProduct.productName}`);
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

app.listen(port, () => {
  console.log(`Servidor web rodando em http://localhost:${port}`);
});
