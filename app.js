var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aufgabenRouter = require('./routes/aufgaben');

var app = express();
const verbindeDB = require("./mongo-db");
verbindeDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const corsHeader = require("./middleware/cors");
app.use(corsHeader);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/aufgaben',aufgabenRouter)

//Fehlebehandlung

app.get('*',(req,res,next)=>{
    let fehler=new Error('Diesen Pfad gibt es nicht')
    fehler.statusCode=404
    next(fehler)
})

// usere Fehler middle ware: 
app.use((error, req,res,next) => {
    console.log('Unser FehlerMiddleware', error);
    // status im header setzen:
    res.status(error.statusCode)
    res.send({
      error: {
        status: error.statusCode,
        mitteilung: error.message 
      }
    })
  })

module.exports = app;
