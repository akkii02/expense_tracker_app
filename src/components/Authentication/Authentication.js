import React, { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./Authentication.module.css";

const Authentication = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    if (inputEmail && inputPassword && confirmPassword) {
      if (inputPassword !== confirmPassword) {
        alert("Please check Password");
      } else {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_API_KEY",
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

          if (response.ok) {
            const data = await response.json();
            // throw new Error(data.error.message);
            console.log(data)
          }
          // Handle successful sign-up here
        } catch (error) {
          console.error("Error:", error.message);
          // Handle error during sign-up
        }
      }
    }
  };

  return (
    <div className={classes.auth}>
      <div className={classes.signup}>
        <div className={classes.main}>
          <h1 className={classes.heading}>SignUp</h1>
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
            <Button className={classes.btn}>Sign Up</Button>
          </form>
        </div>
        <Button className={classes.btns}>Have an account? Login</Button>
      </div>
    </div>
  );
};

export default Authentication;
