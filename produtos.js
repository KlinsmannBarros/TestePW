const productsRouter = require('express').Router();
const controller = require('../controllers/products');
const authMiddleware = require('../middlewares/auth/auth');

// Rota para listar todos os produtos
productsRouter.get('/', authMiddleware, controller.getAll);

// Rota para obter um produto por ID
productsRouter.get('/:id', authMiddleware, controller.getById);

// Rota para criar um novo produto
productsRouter.post('/', authMiddleware, controller.create);

// Rota para atualizar um produto existente
productsRouter.put('/:id', authMiddleware, controller.update);

// Rota para deletar um produto
productsRouter.delete('/:id', authMiddleware, controller.delete);

module.exports = productsRouter;
