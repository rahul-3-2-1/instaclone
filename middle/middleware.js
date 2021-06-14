const jwt=require('jsonwebtoken');
const cookie=require("cookie-parser");
const User=require('../models/schema');
const dotenv=require('dotenv');
dotenv.config({path:"../.env"})


const middleware=async (req,res,next)=>{

    try{
       
          
        const token=req.cookies.jwttoken;
        if(!token)
        {
            return res.status(422).send("user not found");
        }
       
        
       
        const verify= jwt.verify(token, process.env.SECRETKEY);
        
        
        const rootuser=await User.findOne({_id:verify._id,tokens:token});
        if(!rootuser)
        {
         throw new Error("user not found");
           

        }
        
        req.rootuser=rootuser;
        req.usrid=rootuser._id;
        next();
        
    }
        catch(err)
        {
            console.log(err);
            res.status(422).json({name:"user not found"});
        }
        

    }
module.exports=middleware;

