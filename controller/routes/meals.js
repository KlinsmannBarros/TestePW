const express = require('express');
const controller = require('../controllers/meals');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, controller.getAllMeals);
router.get('/:id', authMiddleware, controller.getMealById);
router.post('/', authMiddleware, controller.createMeal);
router.put('/:id', authMiddleware, controller.updateMeal);
router.delete('/:id', authMiddleware, controller.deleteMeal);

module.exports = router;
