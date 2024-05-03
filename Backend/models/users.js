const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
   password: {
        type: String,
        required: true
    },
    savedRecipes:[{type: mongoose.Schema.Types.ObjectId,ref:"Recipe"}]
    
});

const Usermodel = mongoose.model('Users', userSchema);

module.exports = Usermodel;