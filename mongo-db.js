/** Mongoose Modul importieren  */
const mongoose = require("mongoose");

/** Simpler Adressstring: Protokoll ://  Host : Port / Datenbank  */
let addressString = process.env.mongo || "mongodb://localhost:27017/todoDB";
let optionen = { useNewUrlParser: true, useUnifiedTopology: true };

const verbindeDB = () => {

    /** Verbindung für das Mongoose Modul herstellen mit Connect */
    mongoose.connect(addressString, optionen).then( (mongooseModul) => {
        console.log("Bin mit der todoDB verbunden");
        //console.log("Bin mit der Datenbank verbunden", mongooseModul);

    } ).catch( (fehler) => {
        console.error("Fehler mit MongoDB: "+fehler);
    } );

}

module.exports = verbindeDB;