import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

const Watch = () => {
  const location = useLocation();
  // console.log(location);
  const movie = location.state.movie;

  return (
    <div className="watch">
      <Link to="/" className="link">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>

      <video
        src={movie?.video}
        className="video"
        autoPlay
        progress="true"
        controls
      ></video>
    </div>
  );
};

export default Watch;
