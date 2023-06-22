const express =require ('express');
const app=express();
const cors = require ('cors');
const connection =require ('./db');
const fetch=require('./router/controller');

app.use(express.json());
app.use(cors());
connection();
app.use('/api',fetch);
app.listen("8083",()=>{
    console.log("Listening on port 8083");
})