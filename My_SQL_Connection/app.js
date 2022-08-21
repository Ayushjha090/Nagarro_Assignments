const express = require('express');
const ejs = require('ejs');
const connection = require('./database_config');
const port = 80;

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

connection.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Successfully Connected To Database!");
});

app.get('/', (req, res)=>{
    connection.query('select data from items', (err, rows)=>{
        // console.log(rows);
        const items = Object.values(JSON.parse(JSON.stringify(rows)));
        res.render('index', {items});
    });
});

app.post('/add-item', (req, res)=>{
    const {itemName} = req.body;
    connection.query(`insert into items values ('${itemName}')`, (err, res)=>{
        if(err){
            console.log(err);
            return;
        }
    });
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log("Server is up and running on port: ", port);
});
