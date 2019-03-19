// express path
const path = require('path');
// express framework
const express = require('express');
// bodyParser to parse req
const bodyParser = require('body-parser');
// Mongoose for the db
const mongoose = require('mongoose');
// Multer for file management
const multer = require('multer');

// ROUTES
const authRoute = require('./routes/auth.route');
const recipesRoute = require('./routes/recipe.route'); 
const ingredientsRoute = require('./routes/ingredient.route');
//------------------------------
// APP INIT
//------------------------------

const app = express();

//------------------------------
// FILES
//------------------------------

//------------------------------
// APP CONFIG
//------------------------------
app.use(bodyParser.json());
// Headers
app.use((req, res, next) =>{
    // cors
    res.setHeader('Access-Control-Allow-Origin', '*')
    // methods
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    // allowed headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


//------------------------------
// ROUTES
//------------------------------
app.use('/auth', authRoute);
app.use('/recipes', recipesRoute); 
app.use('/ingredients', ingredientsRoute);
//------------------------------
// ERRORS MANAGEMENT
//------------------------------
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});
//------------------------------
// DB CONNECTION
//------------------------------
mongoose
    .connect('mongodb+srv://benjamin:TfvElkidhn9ZEQnV@senpai-ty4s4.mongodb.net/messages?retryWrites=true',  { useNewUrlParser: true })
    .then(res =>{
        app.listen(8080);
    })
    .catch(err => console.log(err));