const express = require('express');
const app = express();
const db = require('./db/');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(_dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/notes/create', function(req, res) {
    res.render('pages/notes/create');
});

app.get('/notes/edit', function(req, res) {
    res.render('pages/notes/edit');
});

app.get('/lists/create', function(req, res) {
    res.render('pages/lists/create');
});

app.get('/lists/edit', function(req, res) {
    res.render('pages/lists/edit');
});




db.testConnection();

app.listen(3000);
console.log('all is good');