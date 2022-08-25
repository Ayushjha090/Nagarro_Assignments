require('dotenv').config();
const mongoose = require('mongoose');

const dbURL = process.env.DATABASE_URL;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));

db.once('open', function(){
    console.log('Successfully connected to database');
});

module.exports = db;