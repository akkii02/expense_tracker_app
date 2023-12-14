import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";


function Header() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    authCtx.logout();
    navigate('/')
  };
  return (
    <>
      <header className={classes.header}>
        <h1>
        Welcome to Expense Tracker!!!
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
