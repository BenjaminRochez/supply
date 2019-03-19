const Ingredient = require('../models/ingredient');
const User = require('../models/user');

const {validationResult} = require('express-validator/check');

exports.createIngredient = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error
    }

    const name = req.body.name;
    const price = req.body.price;
    let creator;

    const ingredient = new Ingredient({
        name: name,
        creator: req.userId,
        price: price
    })

    ingredient.save()
        .then(result =>{
            return User.findById(req.userId);
        })
        .then(user =>{
            creator = user;
            user.ingredients.push(ingredient);
            return user.save();
        })
        .then(result =>{
            res.status(201).json({
                message: 'Ingredient created successfully!',
                ingredient: ingredient
            })
        })
        .catch(err =>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}