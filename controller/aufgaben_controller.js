const Aufgabe=require('../modells/aufgaben_model')


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
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({
        //         fehlerBeiValidierung: errors.array()
        //     })
        // }
        aufnahme = new Aufgabe(req.body)
        await aufnahme.save()
        res.status(200).send(aufnahme)
        
    } catch (fehler) {
        next(fehler)
    }
}

// DELETE **********************************
const aufgabenDelController= (req,res,next) =>{
    const {_id} = req.params

    if(!_id){
        res.status(422).send('weiß nicht welche Aufgabe ich löschen soll. ID fehlt')
    }

    Aufgabe.deleteOne({_id},(fehler,ergebnis)=>{
        if (fehler) {
            res.status(500).send("Fehler beim Löschen: " + fehler);
        } else {
            res.status(200).send(ergebnis);
        }
    })
}

module.exports={aufgabenGetController,aufgabenPostController,aufgabenDelController}