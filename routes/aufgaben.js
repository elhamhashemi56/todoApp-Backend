const express = require('express');
const router = express.Router();
const { check }  = require('express-validator')
const auth = require('../middleware/auth')
const {aufgabenGetController,aufgabenPostController,aufgabenDelController,aufgabenPutController,erledigen}=require('../controller/aufgaben_controller')

const validAufgabe = [
    check('inhalt')
      .not()
      .isEmpty()
      .withMessage('Aufgabe muss angegeben werden.')
      .trim(),
    check ("datum","bitte geben Sie hier Datum!")
      .not()
      .isEmpty()
      .isISO8601(),
    check('erledig')
      .optional()
      .isBoolean() 
]

router
    .route('/')
     .get(auth,aufgabenGetController)
     .post(auth,validAufgabe,aufgabenPostController)
     .delete((res, req, next) => {
		res.status(422).send("DELETE braucht eine ID im URL-Segment")
	})

router
    .route('/:_id')
    .delete(aufgabenDelController)
    .put(auth,aufgabenPutController)
    

router
    .route('/erledigt').get(auth,erledigen)


module.exports = router