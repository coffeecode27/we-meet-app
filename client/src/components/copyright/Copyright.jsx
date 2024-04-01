import React from "react";
import "./copyright.css";
import { Favorite } from "@mui/icons-material";
function Copyright() {
  return (
    <footer className="copyright">
      <div className="loveContainer">
        <span>Made with</span>
        <img src="/assets/heart.png" className="love" />
        <span>in Banda Aceh</span>
      </div>
      <p>&copy; {new Date().getFullYear()} WeMeet. All rights reserved.</p>
    </footer>
  );
}

export default Copyright;
