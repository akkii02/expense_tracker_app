import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";


function Header() {

  return (
    <>
      <header className={classes.header}>
        <h1>
        Welcome to Expense Tracker!!!
        </h1>
        <div className={classes.completeNow}>
          Your profile is incomplete.
          <Link to="/Profile">Complete now</Link>
        </div>
      </header>
    </>
  );
}

export default Header;
