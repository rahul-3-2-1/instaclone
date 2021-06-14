import React, { useEffect, useState } from "react";

import Default from "./img/userpic.jpg";

const Profile = () => {
  const [userpost, setuserPost] = useState([]);
  const [follower, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const [profilpic, setprofilepic] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const profilepic = async () => {
    try {
      const data = await fetch("/mypost", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const res = await data.json();

      const data2 = await fetch("/home", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const res2 = await data2.json();

      setName(res2.username);
      setFollowers(res2.followers.length);
      setFollowing(res2.following.length);
      if (res2.profilepic) {
        setprofilepic(res2.profilepic);
      }

      setuserPost(res);
    } catch (err) {
      console.log(err);
    }
  };
  const updatepic = async (file) => {
    setImg(file);
    if (img) {
      try {
        const data = new FormData();
        data.append("file", img);
        data.append("upload_preset", "instacloneApplication");
        data.append("cloud_name", "rahul88009243");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/rahul88009243/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const response = await res.json();

        await fetch("/updatepic", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ response: response.secure_url }),
        });

        profilepic();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (img) {
      updatepic();
    }
  }, [img]);
  useEffect(() => {
    profilepic();
  }, []);
  return (
    <>
      <div className="main-profile">
        <div className="upper-sectionwidth mx-auto ">
          <div className="about-user position-relative  mt-3 d-flex justify-content-around">
            <div className="profile-img correction">
              <img
                classname="img-profile"
                src={profilpic ? profilpic : Default}
                alt="sdfvsd"
              />
            </div>

            <div className="position-absolute upload-pic">
              <label for="getFile" className="btn btn-success">
                update profile pic
              </label>
              <input
                className="text-light"
                style={{ display: "none" }}
                id="getFile"
                onChange={(e) => updatepic(e.target.files[0])}
                type="file"
                placeholder="submit"
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
            </div>
            
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

export default Profile;
