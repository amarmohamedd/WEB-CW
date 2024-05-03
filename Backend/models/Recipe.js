const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String},
    ingredients: { type: String},
    imageUrl: { type: String},
    cookingTime: { type: Number},
    userId: {
        type: String,
        ref: 'users', 
        required: true,
    },
});

const RecipeModel = mongoose.model('Recipes', RecipeSchema); 

module.exports = RecipeModel
