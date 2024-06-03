const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

const readProductsFromFile = () => {
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data);
};

const writeProductsToFile = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4));
};

exports.getAll = async (req, res) => {
    try {
        const products = readProductsFromFile();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter produtos' });
    }
};

exports.getById = async (req, res) => {
    try {
        const products = readProductsFromFile();
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter produto' });
    }
};

exports.create = async (req, res) => {
    try {
        const products = readProductsFromFile();
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock
        };
        products.push(newProduct);
        writeProductsToFile(products);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar produto' });
    }
};

exports.update = async (req, res) => {
    try {
        const products = readProductsFromFile();
        const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        const updatedProduct = {
            ...products[productIndex],
            ...req.body
        };
        products[productIndex] = updatedProduct;
        writeProductsToFile(products);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
};

exports.delete = async (req, res) => {
    try {
        const products = readProductsFromFile();
        const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        products.splice(productIndex, 1);
        writeProductsToFile(products);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar produto' });
    }
};
