// ========== Import Dependencies ==========
const createError = require('http-errors');
const express = require('express');
const path = require('path');


// ========== Define App ==========
const app = express();


// ========== Configuration JSON Body Data ==========
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// ========== Configuration Templating Engine ==========
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));


// ========== Define Static Files Path ==========
app.use(express.static(path.join(__dirname, 'public')));


// ========== Define Routes ==========
app.use('/', require('./app/routes/index'));


// ========== Define a Function to Catch Errors ==========
app.use((req, res, next) => next(createError(404)));

app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});


app.listen(3000);