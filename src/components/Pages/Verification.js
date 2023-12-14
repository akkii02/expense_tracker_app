import React, { useContext, useState } from "react";
import AuthContext from "../store/AuthContext";
import Input from "../UI/Input";
import { useNavigate } from "react-router-dom";
import classes from './Verification.module.css';

const Verification = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const authCtx = useContext(AuthContext);
  const history = useNavigate();

  const switchHandler = () => {
    setIsLoggedIn((prevIsLoggedIn) => !prevIsLoggedIn);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDYqoBZCKTVh4iUeC-VLJzHdTjoISkXW-k",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token,
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
