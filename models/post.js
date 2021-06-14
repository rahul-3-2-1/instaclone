const mongo=require("mongoose");
const {ObjectId}=mongo.Schema.Types;

const postSchema=new mongo.Schema({
    tittle:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        required:true
    },
    likes:[{type:ObjectId,ref:"User"}],
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    comments:[{
        text:{type:String},
        id:{type:String}
    }]
})


const Post=mongo.model("post",postSchema);
module.exports=Post;



