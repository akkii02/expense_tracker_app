import React from "react";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
// import AuthContext from "../store/AuthContext";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";


function Header() {
  const dispatch = useDispatch()
  // const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authActions.logout())
    // authCtx.logout();
    navigate('/')
  };
  return (
    <>
      <header className={classes.header}>
        <h1>
        Expense Tracker
        </h1>
        <div className={classes.main}>
        <button onClick={logoutHandler} className={classes.logout}>Logout</button>
        <div className={classes.completeNow}>
          Your profile is incomplete.
          <Link to="/Profile">Complete now</Link>
        </div>
        </div>
      </header>
    </>
  );
}

export default Header;
