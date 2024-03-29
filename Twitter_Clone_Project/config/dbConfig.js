const harperive = require('harperive');
require('dotenv').config();

const DB_CONFIG = {
    harperHost: process.env.INSTANCE_URL,
    username: process.env.INSTANCE_USERNAME,
    password: process.env.INSTANCE_PASSWORD,
    schema: process.env.INSTANCE_SCHEMA,
};

const Client = harperive.Client;
const db = new Client(DB_CONFIG);

module.exports = db;