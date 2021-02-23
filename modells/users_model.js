const mongoose = require("mongoose");

const { Schema } = mongoose;
// ist identisch mit: const Schema = mongoose.Schema;

const User = new Schema({
    vorname: String,
    nachname: String,
    email: String,
    password:String,
    
    
});

module.exports = mongoose.model('users', User) ;