const mongoose = require("mongoose");

const { Schema } = mongoose;
// ist identisch mit: const Schema = mongoose.Schema;

const Aufgabe = new Schema({
    inhalt : String,
   
    
});

module.exports = mongoose.model('aufgaben', Aufgabe ,'aufgaben') ;