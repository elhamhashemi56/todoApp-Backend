const express = require('express');
const router = express.Router();
const {aufgabenGetController,aufgabenPostController,aufgabenDelController}=require('../controller/aufgaben_controller')

router
    .route('/')
     .get(aufgabenGetController)
     .post(aufgabenPostController)
     .delete((res, req, next) => {
		res.status(422).send("DELETE braucht eine ID im URL-Segment")
	})

router
    .route('/:_id')
    .delete(aufgabenDelController)


module.exports = router