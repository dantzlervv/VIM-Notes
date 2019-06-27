const MongoClient = require('mongodb').MongoClient;
const {uri,db}= require('./config');

const testConnection = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    console.log('connected');
    client.close();
};

const addNote = async note => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const usersCollection = await client.db(db).collection("Notes");
    await usersCollection.insertOne(note);
    console.log("1 document inserted");
    client.close();
};

const addList = async list => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const usersCollection = await client.db(db).collection("Lists");
    await usersCollection.insertOne(list);
    console.log("1 document inserted");
    client.close();
};

const getNotes  = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const usersCollection = await client.db(db).collection("Notes");
    const data = await usersCollection.find({}).toArray();
    client.close();
    return data;
};

const getLists  = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const usersCollection = await client.db(db).collection("Lists");
    const data = await usersCollection.find({}).toArray();
    client.close();
    return data;
};



const deleteNote = async note => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const usersCollection = await client.db(db).collection("Notes");
    await usersCollection.deleteOne(note);
    console.log('deleted one note');
    client.close();
};

const deleteList = async list => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const usersCollection = await client.db(db).collection("Lists");
    await usersCollection.deleteOne(list);
    console.log('deleted one list');
    client.close();
};





module.exports = {
    testConnection,
    addNote,
    addList,
    getNotes,
    getLists,
    deleteNote,
    deleteList
};