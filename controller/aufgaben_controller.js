const Aufgabe=require('../modells/aufgaben_model')
const { validationResult } = require('express-validator')
const createError = require('http-errors')


//GET ************************************
const aufgabenGetController = async(req,res,next) => {
    
    try{
        let userAufgaben=await Aufgabe.find({userid :req.tokenNutzer.userId})
        res.status(200).send(userAufgaben)
    }catch(error){
        console.log(error);
        let nachricht=createError(404,'du kannst nicht diese aufgabe laden')
        next(nachricht)
    }
}

//POST ************************************
const aufgabenPostController= async(req,res,next) =>{
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                fehlerBeiValidierung: errors.array()
            })
        }
        aufnahme = new Aufgabe(req.body)
        aufnahme.userid=req.tokenNutzer.userId
        await aufnahme.save()
        res.status(200).send(aufnahme)
        
    } catch (fehler) {
        next(fehler)
    }
}

// DELETE **********************************
const aufgabenDelController=async(req,res,next) =>{

    try {
		const { _id } = req.params;
		let antwort = await Aufgabe.deleteOne({ _id})
		if (antwort.deletedCount > 0) {
			res.status(200).send('erfolgreich gelöscht')
		} else {
			res.send('Es gab keinen Eintrag zum Löschen!')
		}
	} catch (error) {
		let fehler = createError(404, `Konnte die Aufnahme mit dem ID ${req.params.id}  nicht löschen`)
		next(fehler)
    }
    
}

//ERLEDIGEN ************************************
const erledigen = async(req,res,next) => {
    
    try{
        let userAufgaben=await Aufgabe.find({erledig:true})
        res.status(200).send(userAufgaben)
    }catch(error){
        console.log(error);
        let nachricht=createError(404,'du kannst nicht diese aufgabe laden')
        next(nachricht)
    }
}

module.exports={aufgabenGetController,aufgabenPostController,aufgabenDelController,erledigen}