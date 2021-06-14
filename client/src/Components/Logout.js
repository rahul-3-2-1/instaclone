import React,{useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const Logout=()=>{
    const history=useHistory();
    const logout=async ()=>{
        try{
        const data=await fetch('/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",

            },
            credentials: "include",
        })
        const res= data.json();
        console.log(res);
        
        if(data.status===200)
        {
            history.push('/signup')
        }
    }
    catch(err)
    {
        console.log(err);
    }
    }
    useEffect(()=>{
logout();
    })
return(<>

</>)
}
export default Logout;