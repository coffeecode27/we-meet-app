import React, { useContext, useRef, useState } from "react";
import "./share.css";
import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
  Send,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const Share = () => {
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);
  const descriptionRef = useRef();

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: descriptionRef.current.value,
    };

    if (file) {
      const data = new FormData(); // form data is an empty object (first condition)
      const fileName = Date.now() + file.name; // create unique name for uploaded file
      data.append("name", fileName); // add key and value to the object data (Formdata)
      data.append("file", file); // add key and value to the object data (Formdata)
      newPost.img = fileName; // add key and value (for img) to the object newPost (newPost)
      try {
        await axios.post("http://localhost:8000/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post("http://localhost:8000/api/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? import.meta.env.VITE_PUBLIC_FOLDER + user.profilePicture
                : `${import.meta.env.VITE_PUBLIC_FOLDER}/person/noavatar.png`
            }
            alt=""
          />
          <input
            className="shareInput"
            ref={descriptionRef}
            placeholder={`What's in your mind ${user.username}?`}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={hanldeSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="Tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Vibes</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            <span className="shareButtonText">Share</span>
            <Send className="shareIconButton" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
