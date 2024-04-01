import React, { useContext, useState } from "react";
import "./topbar.css";
import { Notifications, Chat, Person, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
const Topbar = () => {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState(""); // State to store search query
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  // Function to handle search
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/search?query=${query}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  console.log(searchResults);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Update search query as user types
    if (value === "") {
      setSearchResults([]); // Clear search results if query is empty
    } else {
      handleSearch(); // Trigger search only if query is not empty
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="topbarLogo">We Meet</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="containerSearch">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              type="text"
              className="searchInput"
              placeholder="Search for friend, post or video"
              value={query}
              onChange={handleChange}
            />
          </div>
          {searchResults.length > 0 && ( // Tampilkan daftar hasil pencarian hanya jika ada hasil
            <div className="searchResults">
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {searchResults.map((result) => (
                  <ListItem
                    key={result._id}
                    component={Link}
                    to={`/profile/${result.username}`}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={result.username}
                        src={
                          result.profilePicture
                            ? import.meta.env.VITE_PUBLIC_FOLDER +
                              result.profilePicture
                            : `${
                                import.meta.env.VITE_PUBLIC_FOLDER
                              }/person/noavatar.png`
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className="searchResult"
                      primary={result.username}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
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
