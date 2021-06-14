import React,{useState} from 'react';
import {NavLink,useHistory} from 'react-router-dom';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Navbar=()=>{
  const history=useHistory();
  const [user,setUser]=useState('');
  
  
  
  const func=(mssg)=>{
      toast.error(mssg,{position:toast.POSITION.TOP_CENTER})
  }
  const sendrequest=async (e)=>{
    try{
    e.preventDefault();
    const data=await fetch('/searchuserfromprofile',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({user})

    })
    if(data.status===404)
    {
     func("User not Found");
     return;
    }
    const res=await data.json();
    

    
    
    
    
    
    // const res=await data.json();
    const url=`profile/:${res._id}`;
      history.push(url);
        
      
   
    

    }
    catch(err)
    {
      console.log(err);
    }

  }
    return(
        <>
        <ToastContainer/>
      <nav className="navbar navbar-expand-lg navbar-light  bg-secondary">
  <div className="container-fluid">
  <h4 className="navbrand fw-bold fs-2 text-light">Instagram</h4>
    <button className="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon text-light"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <div className="pt-2 ">
          <FontAwesomeIcon className="text-light" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"   icon={faSearch}/>
          </div>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light "exact activeClassName="active"  aria-current="page" to="/">AllPost</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light"exact activeClassName="active"  to="/createpost">Createpost</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light"exact activeClassName="active"  to="/followingpost">Followingpost</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light"exact activeClassName="active"  to="/profile">Profile</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light"exact activeClassName="active"  to="/logout">Logout</NavLink>
        </li>
       
        
      </ul>
       
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form>
      <div class="modal-body">
        <input placeholder="enter username" value={user} onChange={(e)=>setUser(e.target.value)} className="d-block w-100 h-100 "/>
      </div>
      <div class="modal-footer">
        
        <button type="submit" onClick={sendrequest} class="btn btn-primary">Search</button>
      </div>
      </form>
    </div>
  </div>
</div>
      
    </div>
  </div>
</nav>
        </>
    )

}
export default Navbar;