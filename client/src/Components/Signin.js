import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const history = useHistory();
  const [user, setUser] = useState({ username: "", password: "" });
  const update = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setUser({ ...user, [name]: val });
  };
 const func=(mssg)=>{
     
      toast.error(
            
    mssg,{position:toast.POSITION.TOP_CENTER}
  )}
 const func1=(mssg)=>{
     
      toast.success(
            
    mssg,{position:toast.POSITION.TOP_CENTER}
  )
return true;}
  const senddata = async (e) => {
    try {
      e.preventDefault();
      
      const { username, password } = user;

      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const res=await data.json();
      if (data.status === 422) {
          
         func(res.mssg);
         return;
      }
      if(func1(res.mssg))
      {
      history.push("/");}
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
    <ToastContainer/>
      <div className="signin">
          
        <div className="inner-signin">
          <h2 className=" text-center fw-bold text-primary">Log IN</h2>
          <form method="POST">
            <input
              type="text"
              className="signintag"
              name="username"
              onChange={update}
              value={user.username}
              placeholder="Your username"
            />
            <input
              type="password"
              className="signintag"
              name="password"
              onChange={update}
              value={user.password}
              placeholder="Password"
            />

            <div className="text-center">
              <input
                type="submit"
                onClick={senddata}
                value="Log IN"
                className="btn btn-primary"
              />
            </div>
            <div className="text-center mt-1">
              <NavLink className="text-primary register fw-bold" to="/signup">
                {" "}
                Not registered yet click Here!
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
