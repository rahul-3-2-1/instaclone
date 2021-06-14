import React,{useState} from 'react';
import {NavLink,useHistory} from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup=()=>{
    const history=useHistory();
    const [user,setUser]=useState(
        {name:"",
    username:"",
    email:"",
    password:"",
    cPassword:""
            
    });
    const update=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUser({...user,[name]:value});

    }
    const func=(mssg)=>{
        
         toast.error(
               
       mssg,{position:toast.POSITION.TOP_CENTER}
     )}
    const submit=async (e)=>{
        try{
        e.preventDefault();
        const {name,username,email,password,cPassword}=user;
        if(!name||!username||!email||!password||!cPassword)
        {
            func("All fields are mandatory");
            return;
        }
       
        const data=await fetch('/signup',{
            method:"POST",
            headers:{
                'Content-Type':"application/json",

            },
            body:JSON.stringify({
                name,username,email,password,cPassword
            })
        })
        
        const res=await data.json();
        if(data.status===422)
        {
            func(res.mssg);
            return;
        }
        
        history.push('/login');
    }
    catch(err)
    {
        console.log(err);
    }

    }
    return(
        
        <>
        <ToastContainer/>
        <div className="signin">
            <div className="inner-signup">
                <h2 className=" text-center fw-bold text-primary">Sign UP</h2>
                <form method="POST">

                    <input type="text" name="name" onChange={update} className="signintag signuptag" value={user.name} placeholder="Your Name"/>
                    <input type="text" name="username" onChange={update} className="signintag signuptag" value={user.username} placeholder="Create a username"/>
                    <input type="email" name="email" onChange={update} className="signintag signuptag" value={user.email} placeholder="Your Email"/>
                    <input type="password" name="password" onChange={update} className="signintag signuptag" value={user.password} placeholder="Password "/>
                    <input type="password" name="cPassword" onChange={update} className="signintag signuptag" value={user.cPassword} placeholder="Confirm Password"/>
                    
                    <div className="text-center"><input type="submit" onClick={submit} value="Sign UP" className="btn btn-primary"/></div>
                    <div className="text-center mt-1"><NavLink  className="text-primary register fw-bold" to='/login'> already registerd click here!</NavLink></div>
                </form>

            </div>
        </div>
        </>
    )

}

export default Signup;