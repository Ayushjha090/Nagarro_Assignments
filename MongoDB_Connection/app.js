const express = require('express');
const ejs = require('ejs');
const {MongoClient} = require('mongodb');
const port = 8000;

const app = express();
const url = 'mongodb://localhost:27017';

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

const client = new MongoClient(url);
const db = client.db('nagarroPracticeDB');
const collection = db.collection('items');

async function DBConnect(){
    await client.connect();
    return "Successfully connected to database!";
}

DBConnect()
    .then(console.log)
    .catch(console.error)

app.get('/', async (req, res)=>{
    const result = await collection.find({}).toArray();
    res.render('index', {items: result});
});

app.post('/add-item', async (req, res)=>{
    const {itemName} = req.body;
    await collection.insertOne({data: itemName});
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`);
});