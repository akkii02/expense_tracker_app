import React, {useState } from "react";
import Input from "../UI/Input";
import { useNavigate } from "react-router-dom";
import classes from './Verification.module.css';
import { useSelector } from "react-redux";
import Header from "../Navbar/Header";

const Verification = () => {
  const token = useSelector((state) => state.auth.idToken)
  console.log("VER",token)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useNavigate();

  const switchHandler = () => {
    setIsLoggedIn((prevIsLoggedIn) => !prevIsLoggedIn);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDYqoBZCKTVh4iUeC-VLJzHdTjoISkXW-k.json",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken:token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.email === email) {
          history("/");
        } else {
          throw new Error("Email does not match.");
        }
      } else {
        throw new Error("Verification failed.");
      }
    } catch (error) {
      console.error("Verification error:", error.message);
    }
  };

  return (
    <>
    <Header/>
      {!isLoggedIn && (
        <div className={classes.main}>
          <button className={classes.verifybtn} onClick={switchHandler}>
            Verify Email ID
          </button>
        </div>
      )}
      {isLoggedIn && (
        <form onSubmit={submitHandler} className={classes.main}>
          <div className={classes.int}>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={classes.input}
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className={classes.btns}>
            Verify
          </button>
        </form>
      )}
    </>
  );
};

export default Verification;
