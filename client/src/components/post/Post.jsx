import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import { MoreVert, Favorite, ModeComment } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id)); // result true or false
  }, [post.likes, currentUser._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(`http://localhost:8000/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {}

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? import.meta.env.VITE_PUBLIC_FOLDER + user.profilePicture
                    : `${
                        import.meta.env.VITE_PUBLIC_FOLDER
                      }/person/noavatar.png`
                }
                alt=""
              />
            </Link>

            <span className="postUsername">
              {user.username || post.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            className="postImg"
            src={import.meta.env.VITE_PUBLIC_FOLDER + post.img}
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${import.meta.env.VITE_PUBLIC_FOLDER}/like.png`}
              className="postLikeIcon"
              onClick={likeHandler}
              alt=""
            />
            <img
              src={`${import.meta.env.VITE_PUBLIC_FOLDER}/heart.png`}
              className="postLikeIcon"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <ModeComment className="postCommentIcon" />
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
