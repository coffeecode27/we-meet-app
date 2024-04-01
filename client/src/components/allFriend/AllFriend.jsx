import React from "react";
import "./allFriend.css";

const AllFriend = ({ user }) => {
  return (
    <li className="leftbarFriend">
      <img
        src={import.meta.env.VITE_PUBLIC_FOLDER + user.profilePicture}
        alt=""
        className="leftbarFriendImg"
      />
      <span className="leftbarFriendName">{user.username}</span>
    </li>
  );
};

export default AllFriend;
