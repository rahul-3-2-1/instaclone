const express=require("express");
const cookie=require("cookie-parser");
const User=require("../models/schema");
const Post=require('../models/post');
const middleware=require('../middle/middleware');
const bcrypt=require('bcrypt');
const validator=require('email-validator');


const router=express.Router();
router.use(cookie());


router.get('/home',middleware,async (req,res)=>{
    try{
        const {username,profilepic,followers,following}=req.rootuser;
    res.status(200).json({username ,profilepic,followers,following});
    }
    catch(err)
    {
        console.log(err);
        res.status(422).send("user not found")
    }

})

router.post('/signup',async (req,res)=>{
    try{
    const {name,username,email,password,cPassword}=req.body;
   
    
    if(!validator.validate(email))
    {
        return res.status(422).json({"mssg":"Invalid Email"})
    }

    const data1=await User.findOne({email});
    const data2=await User.findOne({username})
    
    if(data2)
    {
        return res.status(422).json({"mssg":"Username already registered"});
    }
    if(data1)
    {
       return res.status(422).json({"mssg":"Email already registered"});
    }
    if(password!==cPassword)
    {
        return res.status(422).json({"mssg":"Passwords are not matching"});
    }

    const data= new User({
        name,
        username,
        email,
        password
    })



    const dt=await data.save();
    
        res.status(202).json({mssg:"registered successfully"});
    }
    catch(err)
    {
        console.log(err);
    }

})
router.get('/logout',(req,res)=>{
    res.clearCookie('jwttoken');
res.status(200).send("user Logout");
})

router.post('/login',async (req,res)=>{
    try{
       
        
    const {username,password}=req.body;
    
    
    const user=await User.findOne({username});
   
    if(!user)
    {
       return res.status(422).json({"mssg":"username or password is wrong"});

    }
    const match=await bcrypt.compare(password,user.password);
    
    if(match)
    {
        const token =await user.token();
        if(!token)
        {
            return res.status(400).send("failed");
        }
        
        user.tokens=token;
        
        const dt=await user.save();
        res.cookie("jwttoken",token,{
            expires:new Date(Date.now()+25892000000),
            httpOnly:true
        })
        
        res.status(200).json({"mssg":"success"});
    }
    else{
        res.status(422).json({"mssg":"username or password is wrong"});
    }

}
catch(err){
    console.log(err);
}



});

router.post('/searchuser',middleware,async (req,res)=>{
    try{
        console.log("heloo from");
    const data=await User.findOne({_id:req.body.user});
    
    if(!data)
    {
        
         res.status(404).send("user not found");
    }
    else{
        res.status(200).json({"_id":data._id,"username":data.username,"profilepic":data.profilepic,"followers":data.followers,"following":data.following});
    }
    }
    catch(err)
    {
        console.log(err);
    }
})

router.post('/searchuserfromprofile',middleware,async (req,res)=>{
    try{
        
    const data=await User.findOne({username:req.body.user});
    
    if(!data)
    {
        
         res.status(404).send("user not found");
    }
    else{
        res.status(200).json({"_id":data._id,"username":data.username,"profilepic":data.profilepic,"followers":data.followers,"following":data.following});
    }
    }
    catch(err)
    {
        console.log(err);
    }
})

router.get('/searchuserwithid',middleware,async (req,res)=>{
    try{
        
    const data=await User.findById({_id:req.body.user});
    
    if(!data)
    {
        
         res.status(404).send("user not found");
    }
    else{
        res.status(200).json({"_id":data._id,"username":data.username,"profilepic":data.profilepic,"followers":data.followers,"following":data.following});
    }
    }
    catch(err)
    {
        console.log(err);
    }
})

router.patch('/follow',middleware,(req,res)=>
{
    const id=req.body.param;
    
    const data=User.findByIdAndUpdate({_id:req.rootuser._id},{$push:{following:id}},{new:true}).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err});
        }
        else{
            
           return result;
        }
    });
    const data2 =User.findByIdAndUpdate({_id:id},{$push:{followers:req.rootuser._id}},{new:true}).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err});
        }
        else{
           return result;
        }
    });
    
    res.status(200).json({data,data2});

})

router.patch('/unfollow',middleware,(req,res)=>
{
    const id=req.body.param;
    const data=User.findByIdAndUpdate({_id:req.rootuser._id},{$pullAll:{following:[id]}},{new:true}).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err});
        }
        else{
           return result
        }
    });
    const data2 =User.findByIdAndUpdate({_id:id},{$pullAll:{followers:[req.rootuser._id]}},{new:true}).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err});
        }
        else{
            return result;
        }
    });
    res.status(200).json({data,data2});

})

router.patch('/updatepic',middleware,async (req,res)=>{
    try{
  const id=req.rootuser._id;
  const pic =req.body.response;
  
  const data=await User.findByIdAndUpdate({_id:id},{profilepic:pic},{new:true});
        data.password=undefined;
        data.tokens=undefined;
  res.status(200).send(data);
    }
  catch(err)
  {
      console.log(err);
  }
})




module.exports=router;
