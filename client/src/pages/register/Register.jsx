import React, { useRef, useState } from "react";
import "./register.scss";
import axios from "../../axiosHook/axiosHook";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axios.post("/auth/register", {
        username: usernameRef.current.value,
        email,
        password: passwordRef.current.value,
      });
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("User registration error");
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt=""
            className="logo"
          />
          <Link to="/login">
            <button className="loginButton">Sign In</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address..." ref={emailRef} />
            <button onClick={handleStart} className="registerButton">
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="username"
              placeholder="username..."
              ref={usernameRef}
            />
            <input
              type="password"
              placeholder="password..."
              ref={passwordRef}
            />
            <button onClick={handleFinish} className="finishButton">
              Start Membership
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
