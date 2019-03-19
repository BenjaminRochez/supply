const express = require('express');

const ingredientController = require('../controllers/ingredient.js');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /recipes/all
//router.get('/posts', isAuth, recipeController.getRecipes);


router.post('/create', isAuth, ingredientController.createIngredient);
module.exports = router;
 