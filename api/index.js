const express =require ('express');
const app=express();
const cors = require ('cors');
const connection =require ('./db');
const auth = require('./router/auth')
const fetch=require('./router/fetch');

app.use(express.json());
app.use(cors());
connection();
app.use('/auth', auth)
app.use('/api',fetch);
app.listen("8083",()=>{
    console.log("Listening on port 8083");
})