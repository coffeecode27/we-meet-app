import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import OnlineFriend from "../onlineFriend/OnlineFriend";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false); // Inisialisasi nilai diubah menjadi false
  console.log(followed);

  useEffect(() => {
    // Memperbarui nilai followed berdasarkan data dari local storage saat komponen di-mount
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user && user._id) {
          console.log(user._id);
          console.log(currentUser);
          const friendList = await axios.get(
            `http://localhost:8000/api/users/friends/${user._id}`
          );
          setFriends(friendList.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user, currentUser]);

  const followHandler = async () => {
    try {
      if (user && user._id) {
        if (followed) {
          await axios.put(
            `http://localhost:8000/api/users/${user._id}/unfollow`,
            {
              userId: currentUser._id,
            }
          );
          dispatch({ type: "UNFOLLOW", payload: user._id });
        } else {
          await axios.put(
            `http://localhost:8000/api/users/${user._id}/follow`,
            {
              userId: currentUser._id,
            }
          );
          dispatch({ type: "FOLLOW", payload: user._id });
          console.log(currentUser);
        }
        // Memperbarui nilai followed berdasarkan data dari local storage setelah perubahan status follow/unfollow
        setFollowed(!followed);

        // Simpan data pengguna ke local storage setelah perubahan status follow/unfollow
        localStorage.setItem("user", JSON.stringify(currentUser));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Agus Grab</b> and <b>3 other friends</b> have birthday today
          </span>
        </div>
        <img className="rightbarAd" src="/assets/quote.jpg" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <OnlineFriend key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={followHandler}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Current City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Hometown:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <div className="rightbarFollowing" key={friend._id}>
              <Link to={`/profile/${friend.username}`}>
                <img
                  src={
                    friend.profilePicture
                      ? import.meta.env.VITE_PUBLIC_FOLDER +
                        friend.profilePicture
                      : import.meta.env.VITE_PUBLIC_FOLDER +
                        "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
