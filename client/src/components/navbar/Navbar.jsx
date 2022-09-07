import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";
import "./navbar.scss";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  // when scrolling, set isScrolled to true; otherwise, false
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    // set onscroll to intial state to prevent infinite loop
    return () => (window.onscroll = null);
  };

  //   console.log(isScrolled);

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt=""
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>

          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>

          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>

          <span>New and Popular</span>
          <span>My List</span>
        </div>

        <div className="right">
          <Search className="icon" />
          <span>{user?.username.toUpperCase()}</span>
          <Notifications className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
