const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser= require("body-parser");

mongoose.connect("mongodb+srv://moshemoshe:qazQAZ123@cluster0.fandl.mongodb.net/NodeJs_Final_Task");
const db = mongoose.connection
db.on('error',(error) => console.log(error))
db.once('open', ()=>console.log('connected to database'))

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/", function(req,res){
    res.sendFile(__dirname +"/views/index.html");
});

app.get("/costs", function(req,res){
    res.sendFile(__dirname +"/views/cost.html");
});

app.get("/reports", function(req,res){
    res.sendFile(__dirname +"/views/reports.html");
});

const userRouter = require ('./routes/users')
app.use('/',userRouter)
const costRouter = require ('./routes/costs')
app.use('/costs',costRouter)
const reportRouter = require ('./routes/getReport')
app.use('/reports',reportRouter)

app.listen(3000, ()=> console.log('server is running'))