const mongo=require("mongoose");
const dotenv=require('dotenv');
dotenv.config({path:"./.env"})
const db=process.env.URL;
mongo.connect(db,{useCreateIndex:true,useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true}).then(()=>{
    console.log("connection  is sucessful")
}).catch((err)=>{
    console.log(err);
})

