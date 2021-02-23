const User = require("../modells/users_model");
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

//GET ************************************
const userGetController = (req, res, next) => {

    User.find((err, docs) => {
        if (err) {
            res.status(500).send("Fehler bei GET auf /User/:" + err);
        } else {
            res.status(200).send(docs);
        }
    });

}
//POST ************************************
const userPostController = async (req, res, next) => {
    try {
        const neueDaten = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                fehlerBeiValidierung: errors.array()
            })
        }
        
        let schonVorhandenUser = await User.find({ email: neueDaten.email })
		if (schonVorhandenUser.length >= 1) {
			return res.status(409).send('Es gib schon einen Nutzer mit dieser Email')
		}

		let passwortGehashed = await bcrypt.hash(neueDaten.password, 10)
        let erstelleNutzer = await User.create({ ...neueDaten, password: passwortGehashed })
		res.status(201).send(erstelleNutzer);

    } catch (fehler) {
        next(fehler)
    }
}



// Loggin ***********************************

    const userEinloggen = async (req,res,next) =>{
        let nutzer=req.body
        try{
            let userVonDatenbank=await User.findOne({email:nutzer.email})
            console.log(userVonDatenbank);
            if(userVonDatenbank === null){
               return res.status(401).send('Du hast noch nicht angemeldet')
            }

            let vergleichVonPasswort=await bcrypt.compare(nutzer.password,userVonDatenbank.password)
            console.log(vergleichVonPasswort);
            if(vergleichVonPasswort){
                console.log('du bist im if');
                let token = jwt.sign({
                    email: userVonDatenbank.email,
                    userId: userVonDatenbank._id,
                }, process.env.JWT , {expiresIn: '3h'});

                console.log(token);
                res.status(200).json({
                    nachricht:'Du bist eingelogt',
                    token:token
                })
                   
            }else{
                res.status(401).send('password ist invalid')
            }

        }catch(error){
               res.status(401).send('Du konntest nicht eingeloggt werden.error von catch'+error)
        }

    }
    

module.exports={userGetController,userPostController,userEinloggen }
    
   