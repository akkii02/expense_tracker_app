import React, { useState } from "react";
import Input from "../UI/Input";
import classes from "./Authentication.module.css";
import signupIcon from "../asset/signup-icon.webp" 


const Authentication = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("Check", inputEmail && inputPassword && confirmPassword);
    if (inputEmail>0 && inputPassword && confirmPassword){
      if (inputPassword !== confirmPassword) {
        alert("Please check Password");
      } else {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYqoBZCKTVh4iUeC-VLJzHdTjoISkXW-k",
            {
              method: "POST",
              body: JSON.stringify({
                email: inputEmail,
                password: inputPassword,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error.message);
          }
          console.log("User has successfully signed up.")
        } catch (error) {
          console.error("Error:", error.message);
        }
      }
    }else{
      alert("Please enter the valid input");
    }
    setInputEmail("");
    setInputPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={classes.auth}>
      <div className={classes.signup}>
        <div className={classes.main}>
          <h1 className={classes.heading}>
          <img src={signupIcon} alt="img" className={classes.img} />
          <br/>
            SignUp
            </h1>
          <form onSubmit={submitHandler} className={classes.form}>
            <Input
              type="email"
              placeholder="Email"
              className={classes.int}
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              className={classes.int}
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              className={classes.int}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className={classes.btn}>Sign Up</button>
          </form>
        </div>
        <button className={classes.btns}>Have an account? Login</button>
      </div>
    </div>
  );
};

export default Authentication;
