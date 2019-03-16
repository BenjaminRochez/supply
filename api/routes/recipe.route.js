const express = require('express');

const recipeController = require('../controllers/recipe.js');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /recipes/all
router.get('/posts', isAuth, recipeController.getRecipes);

module.exports = router;
 