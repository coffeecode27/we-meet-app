import React, { useContext } from "react";
import "./topbar.css";
import { Notifications, Chat, Person, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Topbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="topbarLogo">We Meet</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="Search for friend, post or video"
          />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Timeline</span>
          <span className="topbarLink">Profile</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>

        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? import.meta.env.VITE_PUBLIC_FOLDER + user.profilePicture
                : `${import.meta.env.VITE_PUBLIC_FOLDER}/person/noavatar.png`
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
};
<div>Topbar</div>;

export default Topbar;
