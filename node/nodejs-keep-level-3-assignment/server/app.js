let express = require('express');
let app = express();
const http = require('http');
const db=require('./db');
const bodyParser=require('body-parser');
const api1=require('./api/v1/routing');

const server = http.createServer(app);
const io = require('socket.io')(server);
require('./api/v1/notify')(io);

io.on('connection', function(socket){
});

app.set('socketio', io);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


db.createMongoConnection();


app.use((req,res,next)=>{
    next();
});
app.use('/api/v1',api1);


module.exports = { server,io,app };