const express = require('express');
const router = express.Router();
const { check }  = require('express-validator')
const {aufgabenGetController,aufgabenPostController,aufgabenDelController}=require('../controller/aufgaben_controller')

const validAufgabe = [
    check('inhalt')
      .not()
      .isEmpty()
      .withMessage('Aufgabe muss angegeben werden.')
      .trim(),
      check ("datum","bitte geben Sie hier Datum!")
      .not()
      .isEmpty()
      .isISO8601() 


]

router
    .route('/')
     .get(aufgabenGetController)
     .post(validAufgabe,aufgabenPostController)
     .delete((res, req, next) => {
		res.status(422).send("DELETE braucht eine ID im URL-Segment")
	})

router
    .route('/:_id')
    .delete(aufgabenDelController)


module.exports = router