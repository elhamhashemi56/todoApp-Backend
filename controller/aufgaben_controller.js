const Aufgabe=require('../modells/aufgaben_model')
const { validationResult } = require('express-validator')
const createError = require('http-errors')


//GET ************************************
const aufgabenGetController = (req,res,next) => {
    Aufgabe.find((err,docs)=>{
        if(err){
            res.status(500).send('Fehler bei GET auf /Record/:' +err)
        }else{
            res.status(200).send(docs)
        }
   })
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

module.exports={aufgabenGetController,aufgabenPostController,aufgabenDelController}