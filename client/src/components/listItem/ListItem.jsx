import React, { useState, useEffect } from "react";
import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import axios from "../../axiosHook/axiosHook";
import { Link } from "react-router-dom";

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState(null);

  // const trailer =
  //   "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item);
        setMovie(res.data);
      } catch (err) {
        console.err(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    // access in watch.js with location.state.movie
    <Link to={{ pathname: "/watch" }} state={{movie}}>
      <div
        className="listItem"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      >
        <img src={movie?.img} alt="" />
        {isHovered && (
          <>
            <video src={movie?.trailer} autoPlay={true} muted loop></video>
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
                <Add className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie?.duration}</span>
                <span className="limit">+{movie?.limit}</span>
                <span>{movie?.year}</span>
              </div>
              <div className="desc">{movie?.desc}</div>
              <div className="genre">{movie?.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
