import React, { useState } from "react";
import Input from "../UI/Input";
import classes from "./SignUp.module.css";
import signupIcon from "../asset/signup-icon.png";
import {Link, useNavigate} from "react-router-dom";
// import AuthContext from "../store/AuthContext";
import {useDispatch} from "react-redux";
import { authActions } from "../store/auth-slice";
import Header from "../Navbar/Header";

const SignUp = () => {
  const dispatch = useDispatch();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const history = useNavigate();
  // const authCtx = useContext(AuthContext);
  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
  
    if (inputEmail.length > 0 && inputPassword) {
      if (inputPassword) {
        let url;
        if(isLogin){
          url= "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYqoBZCKTVh4iUeC-VLJzHdTjoISkXW-k"
        }else{
          url ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYqoBZCKTVh4iUeC-VLJzHdTjoISkXW-k";
        }
  
        try {
          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
              email: inputEmail,
              password: inputPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            console.log("d",data.idToken);
            const idToken = data.idToken;
        const userId = data.email;
        dispatch(authActions.login({ idToken, userId }));
            // authCtx.login(data.idToken,data.email)
            history("/Verification");
          } else {
            const data = await response.json();
            throw new Error(data.error.message);
          }
        } catch (error) {
          alert(`Authentication failed: ${error.message}`);
        }
      }
    } else {
      alert("Please enter valid input");
    }
  
    setInputEmail("");
    setInputPassword("");
    setConfirmPassword("");
  };
  
  return (
  <>
    <Header/>
    <div className={classes.auth}>
      <div className={classes.signup}>
        <div className={classes.main}>
          <h1 className={classes.heading}>
            <img src={signupIcon} alt="img" className={classes.img} />
            <br />
            {isLogin ? "Login" : "SignUp"}
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
            {!isLogin && (
              <Input
                type="password"
                placeholder="Confirm Password"
                className={classes.int}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <button className={classes.btn}>
              {isLogin ? "Login" : "Sign Up"}
            </button>
            {isLogin && (
              <Link to="/ForgetPassword" className={classes.forgetLink}>
                Forget password
              </Link>
            )}
          </form>
        </div>
        <button className={classes.btns} onClick={switchModeHandler}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Have an account? Login"}
        </button>
      </div>
    </div>
    </>
  );
};

export default SignUp;
