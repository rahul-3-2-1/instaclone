const express=require("express");
const router=express.Router();
const middleware=require('../middle/middleware');
const Post=require('../models/post');
const mongo=require('mongoose');



router.get('/allpost',middleware,async (req,res)=>{
    try{
    const data=await Post.find().populate("postedBy","_id username profilepic");
    
    const id=req.rootuser._id;
    res.status(200).json({"id":id,"data":data});
    }
    catch(err)
    {
        console.log(err);
    }
})

router.patch("/comment",middleware,async (req,res)=>{
    try{
        console.log("rahul");
    const {text,postId}=req.body;
    const id=req.rootuser.username;
    const data=await Post.findByIdAndUpdate({_id:postId},{$push:{comments:{text,id}}},{new:true}).populate("postedBy","_id username");
    res.status(200).json({"data":data});

    }
catch(err)
{
    console.log(err);
}


})
router.get('/followingpost',middleware,async (req,res)=>{
    try{
        const id=req.rootuser._id;
    const data=await Post.find({postedBy:{$in:req.rootuser.following}}).populate("postedBy","_id username profilepic");
    
    
    res.status(200).json({"id":id,"data":data});
    }
    catch(err)
    {
        console.log(err);
    }
})
router.post('/createpost',middleware,async (req,res)=>{
    try{
        
    const {tittle,body,pic}=req.body;
    
    
    if(!tittle||!body||!pic)
    {
        
        return res.status(422).json({error:"please add all fields"});
    }
    
    req.rootuser.password=undefined;
    const data=req.rootuser;
    const post= new Post({
        tittle,
        body,
        pic,
        postedBy:data
        
    })
    const dt =await post.save();
    
    res.status(200).send(dt);
}
catch(err)
{
    console.log(err);
    res.status(500).send("err");
}

})


router.get('/mypost',middleware,async (req,res)=>{
    try{
    const data=await Post.find({postedBy:req.rootuser._id}).populate("postedBy","_id username followers following profilepic")
    res.status(200).send(data);
    }
    catch(err)
    {

        console.log(err);
        res.status(500).send("error");
    }

})

router.patch('/like',middleware,async (req,res)=>{
    // const temp=await Post.findOneAndUpdate({postedBy:req.body.userpost});
    
    // console.log(temp);
    const id=req.rootuser._id;
    const check=await Post.findById({_id:req.body.userpost});
    // const flag=check.likes.include(id);
    // if(flag)
    // return res.status(200).send("already existed");
    const like=check.likes;
    if(like.includes(id))
    {
        Post.updateOne({_id:req.body.userpost},{$pullAll:{likes:[id]}},{new:true}
            ).exec((err,result)=>{
                if(err)
                {
                    return res.status(422).json({error:err});
                }
                else{
                    res.status(200).json(result);
                }
            });
    }
    else{
    const data=Post.findByIdAndUpdate({_id:req.body.userpost},{$push:{likes:req.rootuser._id}},{new:true}
    ).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err});
        }
        else{
            res.status(200).json(result);
        }
    })
}
    

})
router.post("/searchpicofuser",middleware,async (req,res)=>{
    try{
        const user=req.rootuser;
        user.password=undefined
        
    const data=await Post.find({postedBy:req.body.param});
    
    res.status(200).json({user,data});
    }catch(err)
    {
        console.log(err);
    }
})




module.exports=router;

