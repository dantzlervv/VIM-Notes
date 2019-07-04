var express = require('express');
var app = express();
const db = require('./db/');
const bodyParser = require('body-parser');
const ObjectId = require("mongodb").ObjectId;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');


app.get('/', async function (req, res) {
    const notes = await db.getNotes();
    const lists = await db.getLists();
    res.render('pages/index', {notes, lists});
});

app.get('/notes/create', function(req, res) {
    res.render('pages/notes/create');
});
app.get('/lists/create', function(req, res) {
    res.render('pages/lists/create');
});

app.get('/notes/edit/:id', async function (req, res) {
    const query = { _id: ObjectId(req.params.id) };
    let result = null;
    try {
        result = await db.getNote(query);
    } catch (err) {
        if (result) console.log(err);
    }
    const note = {
        _id: query._id,
        noteTitle: result.noteTitle,
        noteTextContent: result.noteTextContent
    };
    res.render('pages/notes/edit', {note});
});
app.get('/lists/edit/:id', async function (req, res) {
    const query = { _id: ObjectId(req.params.id) };
    let result = null;
    try {
        result = await db.getList(query);
    } catch (err) {
        if (result) console.log(err);
    }
    if(result.listItemChecked){
            result.listItemChecked = Array.isArray(result.listItemChecked) ? result.listItemChecked : new Array(result.listItemChecked);
    }
    if(result.listItem){
        result.listItem = Array.isArray(result.listItem) ? result.listItem : new Array(result.listItem);
    }
    const list = {
        _id: query._id,
        listName: result.listName,
        listItemChecked: result.listItemChecked,
        listItem: result.listItem
    };
    res.render('pages/lists/edit', {list});
});

db.testConnection();
app.listen(3000);
console.log('all is good');

app.post('/notes/create', async function (req, res) {
    console.log("post ok");
    const note = {
        noteTitle: req.body.noteTitle,
        noteTextContent :req.body.noteTextContent
    };
    let result = null;
    try {
        result = await db.addNote(note);
    } catch (err) {
        console.log(err);
    }
    const notes = await db.getNotes();
    const lists = await db.getLists();
    res.render('pages/', {notes, lists});
});

app.put("/notes/edit/:id", async function (req, res) {
    console.log("put ok");
    const query = { _id: ObjectId(req.params.id) };
    const newData = {
        _id: query._id,
        noteTitle: req.body.noteTitle,
        noteTextContent: req.body.noteTextContent
    };
    let result = null;
    try {
        result = await db.updateNote(query, newData);
    } catch (err) {
        console.log(err);
    }
    const notes = await db.getNotes();
    const lists = await db.getLists();
    res.render('pages/', {notes, lists});
});

app.delete("/notes/edit/:id", async function (req, res) {
    console.log("delete ok");
    const query = { _id: ObjectId(req.params.id) };
    let result = null;
    try {
        result = await db.deleteNote(query);
    } catch (err) {
        console.log(err);
    }
    const notes = await db.getNotes();
    const lists = await db.getLists();
    res.render('pages/', {notes, lists});
});

app.post('/lists/create', async function (req, res) {
    console.log("post ok");
    const list = {
        listName: req.body.listName,
        listItemChecked: req.body.taskName,
        listItem: req.body.taskName0
    };
    let result = null;
    try {
        result = await db.addList(list);
    } catch (err) {
        console.log(err);
    }
    const notes = await db.getNotes();
    const lists = await db.getLists();
    res.render('pages/', {notes, lists});
});

app.put("/lists/edit/:id", async function (req, res) {
    console.log("put ok");
    const query = { _id: ObjectId(req.params.id) };
    const newData = {
        _id: query._id,
        listName: req.body.listName,
        listItemChecked: req.body.taskName,
        listItem: req.body.taskName0
    };
    let result = null;
    try {
        result = await db.updateList(query, newData);
    } catch (err) {
        console.log(err);
    }
    const notes = await db.getNotes();
    const lists = await db.getLists();
    res.render('pages/', {notes, lists});
});

app.delete("/lists/edit/:id", async function (req, res) {
    console.log("delete ok");
    const query = { _id: ObjectId(req.params.id) };
    let result = null;
    try {
        result = await db.deleteList(query);
    } catch (err) {
        console.log(err);
    }
    const notes = await db.getNotes();
    const lists = await db.getLists();
    res.render('pages/', {notes, lists});
});