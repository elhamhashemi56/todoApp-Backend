const mongoose = require("mongoose");

const { Schema } = mongoose;
// ist identisch mit: const Schema = mongoose.Schema;

const Aufgabe = new Schema({
    inhalt : String,
    datum: Date,
    erledig:Boolean,
    userid:String
   
    
});

module.exports = mongoose.model('aufgaben', Aufgabe ,'aufgaben') ;