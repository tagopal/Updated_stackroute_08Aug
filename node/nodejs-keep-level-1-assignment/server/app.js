let express = require('express');
let app = express();
const db=require('./db');
const apiv1=require('./api/v1/routing');
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//creates mongodb connection
db.createMongoConnection();

app.use('/api/v1',apiv1);
//write your logic here

module.exports = app;