import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Default from "./img/userpic.jpg";

const Params = () => {
  let { userid } = useParams();
  let param = userid.substring(1);
  const [userpost, setuserPost] = useState([]);
  const [follower, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [decider, setDecider] = useState();
  const [name, setName] = useState("");
  const [profilpic, setprofilepic] = useState("");
  const details = async () => {
    try {
      
      const data = await fetch("/searchpicofuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          param,
        }),
      });
      const response2 = await data.json();
      
      const loginuser =response2.user;
      const res=response2.data
      
      
      const user=param;
      const data2 = await fetch("/searchuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body:JSON.stringify({user})
      });
      const res2 = await data2.json();

     
      setName(res2.username);
      setFollowers(res2.followers.length);
      setFollowing(res2.following.length);
      if (res2.profilepic) {
        setprofilepic(res2.profilepic);
      }
      
      setuserPost(res);
      
      
      const id = loginuser._id;
      
      
      if (id !== user) {
        if (loginuser.following.includes(param)) {
          setDecider(
            <button className="btn btn-primary" onClick={unfollow}>
              Unfollow
            </button>
          );
        } else {
          setDecider(
            <button className="btn btn-primary" onClick={followers}>
              Follow
            </button>
          );
        }
      }
      setuserPost(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    details();
  }, []);
  const unfollow = async () => {
    try {
      const data = await fetch("/unfollow", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          param,
        }),
      });
      console.log(data);
      const res = await data.json();
      console.log(res);
      details();
    } catch (err) {
      console.log(err);
    }
  };
  const followers = async () => {
    try {
      const data = await fetch("/follow", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          param,
        }),
      });
      
      const res = await data.json();
      console.log(res);
      details();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="main-profile">
        <div className="upper-sectionwidth mx-auto ">
          <div className="about-user  mt-3 d-flex justify-content-around">
            <div className="profile-img correction" >
              <img
                classname="img-profile"
                src={profilpic ? profilpic : Default}
                alt="sdfvsd"
              />
            </div>
            <div className="profile-details mt-3">
              <div className="name text-center text-dark mb-3">
                <h1>{name}</h1>
              </div>
              <div className="follower d-flex justify-content-between">
                <div className="post  ">
                  <p className="text-dark d-flex flex-column fs-3 ">
                    <p className="text-center" style={{padding:"0px",margin:"0px"}}
                  >{userpost.length}</p>
                    <p
                      
                      
                      className="fs-5 mx-2 text-secondary fw-bold    "
                    >
                      posts
                    </p>
                  </p>
                </div>
                <div className="post">
                  <p className="text-dark  fs-3  d-flex flex-column">
                    <p className="text-center" style={{margin:"0px",padding:"0px"}}>{follower}</p>
                    <p
                      
                      
                      className="fs-5 mx-2 text-secondary fw-bold   "
                    >
                      followers
                    </p>
                  </p>
                </div>
                <div className="post">
                  <p className="text-dark  d-flex flex-column fs-3 ">
                    <p className="text-center" style={{padding:"0px",margin:"0px"}}>{following}</p>
                    <p
                      
                      
                      className="fs-5 mx-2 text-secondary fw-bold    "
                    >
                      following
                    </p>

                    
                  </p>
                </div>
              </div>
              
              <div style={{marginBottom:"0px"}} className="text-center">{decider}</div>
            
            </div>
            
            
            <div className="post-section d-flex justify-content-between flex-wrap"></div>
          
          </div>
          <div className="post-section "></div>
          <div className="row  ">
            {userpost.map((item) => {
              return (
                <div className="profile-img user-post col-4 mb-3 ">
                  <img className="img-profile " src={item.pic} alt="sdfvsd" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Params;
