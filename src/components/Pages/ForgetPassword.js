import React, { useState } from "react";
import classes from "./ForgetPassword.module.css";
import Input from "../UI/Input";
import signupIcon from '../asset/signup-icon.png';
import { useNavigate } from "react-router-dom";


const ForgetPassword = () => {
      const [inputEmail, setInputEmail] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const navigate = useNavigate();
    
      const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
          const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDYqoBZCKTVh4iUeC-VLJzHdTjoISkXW-k', {
            method: "POST",
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: inputEmail,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setIsLoading(false);
            navigate('/');
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      return (
        <div className={classes.main}>
          <div className={classes.body}>
            <h1 className={classes.heading}>
              <img src={signupIcon} alt="img" className={classes.img} />
            </h1>
            <form onSubmit={submitHandler} className={classes.form}>
              <Input
                type="email"
                placeholder="Email"
                label="Enter the email with which you have registered"
                className={classes.int}
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
              <button className={classes.btn} disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Link"}
              </button>
            </form>
          </div>
        </div>
      );
    };
    
    export default ForgetPassword;
    