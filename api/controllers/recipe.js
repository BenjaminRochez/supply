const Recipe = require('../models/recipe');
const User = require('../models/user');

const { validationResult } = require('express-validator/check');

exports.getRecipes = (req, res, next) => {
    //res.send('All todos')

    Recipe.find()
        .then(recipes => {
            res.status(200).json({
                message: 'Fetched recipes successfully',
                recipes: recipes
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.createRecipe = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error
    }
    const title = req.body.title;
    let creator;

    const recipe = new Recipe({
        title: title,
        creator: req.userId
    });

    recipe
        .save()
        .then(result =>{
            return User.findById(req.userId);
        })
        .then(user =>{
            creator = user;
            user.recipes.push(recipe);
            return user.save();
        })
        .then(result =>{
            res.status(201).json({
                message: 'Recipe created successfully!',
                recipe: recipe
            })
        })
        .catch(err =>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
        
}