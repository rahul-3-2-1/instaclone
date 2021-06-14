
const express=require("express");
const app=express();
const cookie=require("cookie-parser");
app.use(cookie());
const PORT=process.env.PORT||8000;

const dotenv=require("dotenv");
dotenv.config({path:"./.env"});
app.use(express.json());
require('./keys');


app.use(require('./router/auth'));
app.use(require('./router/Post'));



if(process.env.NODE_ENV==="production"){
    app.use(express.stati("client/build"));
    const path=require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}



app.listen(PORT,()=>{console.log(`Connection suceesful ${port}`)});