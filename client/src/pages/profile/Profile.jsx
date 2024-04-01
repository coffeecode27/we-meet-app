import React, { useEffect, useState } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { username } = useParams();

  console.log("user", user);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? import.meta.env.VITE_PUBLIC_FOLDER + user.coverPicture
                    : import.meta.env.VITE_PUBLIC_FOLDER + `person/noBanner.jpg`
                }
                alt=""
              />

              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? import.meta.env.VITE_PUBLIC_FOLDER + user.profilePicture
                    : `${
                        import.meta.env.VITE_PUBLIC_FOLDER
                      }/person/noavatar.png`
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
