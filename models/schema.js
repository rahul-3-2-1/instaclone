const mongo=require("mongoose");
const bcrypt=require("bcrypt");
const {ObjectId}=mongo.Schema.Types;
const jwt =require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config({path:"../.env"})


const userSchema= new mongo.Schema(
    {
        name:{
            type:String,
            required:true

        },
        username:{
            type:String,
            required:true,
            unique:true
            
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true

        },
        cPassword:{
            type:String,
            

        },profilepic:{type:String
        },
        
        followers:[{type:ObjectId,ref:"User"}],
        following:[{type:ObjectId,ref:"User"}],
        tokens:{type:String

        }

    }
)

userSchema.pre('save',async function(next){
    if(this.isModified("password"))
    {
        this.password=await bcrypt.hash(this.password,10);
        this.cPassword=undefined;
        
    }
    next();

})
userSchema.methods.token=async function(){
    try{
        let tok=jwt.sign({_id:this._id},process.env.SECRETKEY);
       
        
        return tok;

    }
    catch(err){
        return err;


    }

}

module.exports=mongo.model("User",userSchema);


