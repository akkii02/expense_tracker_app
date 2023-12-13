import React from "react";
import classes from "./Welcome.module.css";
import { Link } from "react-router-dom";


function Welcome() {

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

export default Welcome;
