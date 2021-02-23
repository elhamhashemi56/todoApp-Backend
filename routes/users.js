const express = require('express');
const router = express.Router();
const { check }  = require('express-validator')
const auth = require('../middleware/auth')


const {userGetController,
       userPostController,
       userEinloggen
      }=require('../controller/users_controller')

const validUser = [
  check('vorname')
    .not()
    .isEmpty()
    .withMessage('Vorname muss angegeben werden.')
    .trim(),
  check('nachname')
    .not()
    .isEmpty()
    .withMessage('Nachname muss angegeben werden.')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('E-Mail-Format ist ungültig.')
    .trim()
    .normalizeEmail(),
  check('password')
    .not()
    .isEmpty()
    .isStrongPassword()
    .withMessage('Password nicht invalid.')
    .trim(),
    
];

router
    .route('/')
        .get(userGetController)
        .post(validUser, userPostController)
        

router.route('/login').post(userEinloggen)


module.exports = router;
