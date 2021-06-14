import React,{useState,useEffect} from 'react';
import {useHistory} from "react-router-dom";

const Createpost=()=>{
    const history=useHistory();
    
  const checklogin = async () => {
    try {
      const user = await fetch("/home", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if(user.status===422)
      {
        history.push('/signup');

      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };
  useEffect(() => {
    checklogin();
  },[]);

    const [tittle,setTittle]=useState("");
    const [caption,setCaption]=useState("");
    const [img,setImg]=useState("");
   
    const update=(e)=>{
        const nm=e.target.name;
        const val=e.target.value;
        if(nm==="tittle")
        {
            setTittle(val);
        }
        else
        {
            setCaption(val);
        }
    }
    const postdetails=async (e)=>{
        try{
            e.preventDefault();
            if(!img||!tittle||!caption)
            {
              return alert("All fields are mandatory");
            }
    const data=new FormData();
    data.append("file",img);
    data.append("upload_preset","instacloneApplication");
    data.append("cloud_name","rahul88009243");
    const res=await fetch('https://api.cloudinary.com/v1_1/rahul88009243/image/upload',{
        method:"POST",
        body:data
    })
    const response=await res.json();
    
    
   
    

    await fetch('/createpost',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            tittle,
            body:caption,
            pic:response.secure_url

        })
        
    })
    
    
    history.push('/');
}
catch(err){
console.log(err);
}

    }

    return(
        <>
        <div className="d-flex createpost justify-content-center align-items-center">
            <div className="inner-divpost" style={{maxWidth:"500px"}}>
            <form>
                <input name="tittle" value={tittle} onChange={update} className="d-block w-100 mb-4" type="text" placeholder="your post title"/>
                <input name="caption"onChange={update} value={caption} className="d-block w-100 mb-4" type="text" placeholder="write your caption "/>
                
               
            <div>
    
            <input className="text-dark" type="file" onChange={(e)=>setImg(e.target.files[0])}    />
            </div>
            <div className="text-center mt-3">
            <input type="submit" onClick={postdetails} className="btn mx-auto btn-success" value="Post"/> 
            </div>
            </form>
            </div>
            </div>

        </>
    )
}

export default Createpost;