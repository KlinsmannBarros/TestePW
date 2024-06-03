const fs = require('fs-extra');
const path = require('path');
const mealsFilePath = path.join(__dirname, '../data/meals.json');

const readMealsFromFile = () => {
    const data = fs.readFileSync(mealsFilePath, 'utf8');
    return JSON.parse(data);
};

const writeMealsToFile = (meals) => {
    fs.writeFileSync(mealsFilePath, JSON.stringify(meals, null, 4));
};

exports.getAllMeals = (req, res) => {
    try {
        const meals = readMealsFromFile();
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter refeições' });
    }
};

exports.getMealById = (req, res) => {
    try {
        const meals = readMealsFromFile();
        const meal = meals.find(m => m.id === parseInt(req.params.id));
        if (!meal) {
            return res.status(404).json({ message: 'Refeição não encontrada' });
        }
        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter refeição' });
    }
};

exports.createMeal = (req, res) => {
    try {
        const meals = readMealsFromFile();
        const newMeal = {
            id: meals.length ? meals[meals.length - 1].id + 1 : 1,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock
        };
        meals.push(newMeal);
        writeMealsToFile(meals);
        res.status(201).json(newMeal);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar refeição' });
    }
};

exports.updateMeal = (req, res) => {
    try {
        const meals = readMealsFromFile();
        const mealIndex = meals.findIndex(m => m.id === parseInt(req.params.id));
        if (mealIndex === -1) {
            return res.status(404).json({ message: 'Refeição não encontrada' });
        }
        const updatedMeal = {
            ...meals[mealIndex],
            ...req.body
        };
        meals[mealIndex] = updatedMeal;
        writeMealsToFile(meals);
        res.status(200).json(updatedMeal);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar refeição' });
    }
};

exports.deleteMeal = (req, res) => {
    try {
        const meals = readMealsFromFile();
        const mealIndex = meals.findIndex(m => m.id === parseInt(req.params.id));
        if (mealIndex === -1) {
            return res.status(404).json({ message: 'Refeição não encontrada' });
        }
        meals.splice(mealIndex, 1);
        writeMealsToFile(meals);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar refeição' });
    }
};
