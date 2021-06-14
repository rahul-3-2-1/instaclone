import '../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import React,{useEffect} from 'react';
import {Switch,Route,useHistory} from 'react-router-dom';
import Home from "./Components/Home";
import Profile from './Components/Profile';
import Logout from './Components/Logout';
import Params from './Components/Params';

import Navbar from './Components/Navbar' 
import Myfollowingpost from './Components/Myfollowingpost';
import Error from './Components/Error';

function App() {
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
  });

  return (
    
    <>
     <Navbar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path='/profile' component={Profile}/>
      <Route exact path='/logout' component={Logout}/>
      <Route exact path='/profile/:userid' component={Params}/>
      <Route exact path='/followingpost' component={Myfollowingpost}/>
      <Route component={Error}/>
            </Switch>
    </>
    
  
   
  );
}

export default App;
