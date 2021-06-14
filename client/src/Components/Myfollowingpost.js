import React,{useState,useEffect} from "react";
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faHeart as fasheart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as farheart} from '@fortawesome/free-regular-svg-icons';


const Myfollowingpost = () => {
  const [data,setData]=useState([]);
  const [id,setId]=useState("");
  const [text,setText]=useState("");
  const dolike=async(userpost)=>{
    try{
      const like=await fetch('/like',{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({

          userpost
        })
        
        
      })
      const data=await like.json();
      
      
      console.log(data);
      post();
    }
    catch(err){
      console.log(err);
    }

  }
  const addcomment=async (text,postId)=>{
    try{
      if(text==="")
      return;
      const data=await fetch('/comment',{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify({text,postId})
        
      })
      const res=await data.json();
    
      setText("");
      post();


    }catch(err)
    {
      console.log(err);
    }
  }
  const checkout=(arr,id,userid)=>{
    console.log(id,"      ",arr);
    if(arr.includes(id))
    return <FontAwesomeIcon style={{cursor:"pointer"}} onClick={()=>{dolike(userid)}} className="text-danger mx-2 fs-2" icon={fasheart}/>
    else
    return <FontAwesomeIcon style={{cursor:"pointer" }} onClick={()=>{dolike(userid)}} className="fs-2 mx-2 text-dark" icon={farheart}/>
  }
  
  const post=async ()=>{
    const data=await fetch('/followingpost',{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    const postdata=await data.json();
    
    const res=postdata.data;
     setId(postdata.id);
    
    const res2=res.reverse();
    
    setData(res2);

  }
  useEffect(()=>{
    post();
  },[])
  
  
  
  return (
    <>
      <div className="home mx-auto mt-5 d-flex flex-column " style={{ maxWidth: "600px" }}>
        {data.map(item=>{
          return(
            <div>
          <div style={{marginBottom:"5rem"}} className="card box" >
          <div  className="d-flex px-2 my-2 align-item-center justify-content-start">  <div style={{width:"40px",height:"40px"}}><img style={{maxWidth:"100%" ,minWidth:"100%",borderRadius:"50%"}} src={item.postedBy.profilepic} alt="no pic" /></div> <h3 className="text-dark mx-2">{item.postedBy.username}</h3></div> 
              <div className="separate"></div>
            <img src={item.pic} className="card-img-top" alt="..." />
            <div className="separate"></div>
            <div>
            { checkout(item.likes,id,item._id)} 
            <span className="fs-1 text-dark ">{item.likes.length}</span>
            </div>
            
            <div className="card-body">
              <h5 className="text-dark fs-3">{item.tittle}</h5>
              <p style={{fontStyle:"italic",fontWeight:"lighter"}} className="text-dark ">
               {item.body}
              </p>
              {
                item.comments.map(comment=>{
                  return(
                    <div className="d-flex ">
                      <h6 style={{padding:"0px",margin:"0px"}} className="text-dark  ">{comment.id} :</h6>
                      <p style={{fontStyle:"oblique",padding:"0px",paddingTop:"-0.1px"}} className="text-dark mx-2">{comment.text}</p>
                      </div>
                  )
                })
                
              }
              <form onSubmit={(e)=>{e.preventDefault();addcomment(text,item._id)}}>
                <input className="comment" value={text} onChange={(e)=>setText(e.target.value)} placeholder="comment something"/>
              </form>
            </div>
          </div>
        </div>
          )
        })}
        </div>
        
    </>
  );
};

export default Myfollowingpost;
