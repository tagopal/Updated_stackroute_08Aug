let express = require('express');
let app = express();

const db=require('./db');
const bodyParser=require('body-parser');
const apiv1=require('./api/v1/routing');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


db.createMongoConnection();


app.use((req,res,next)=>{
    next();
});
app.use('/api/v1',apiv1);

//write your logic here

module.exports = app;