import React from "react";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
// import AuthContext from "../store/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import DarkThemeIcon from "../asset/brightness-and-contrast.png";
import { toggleTheme } from "../store/themeSlice";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const isDarkThemeEnable = useSelector(
    (state) => state.theme.isDarkThemeEnable
  );
  // console.log("isDarkTheme",isTheme)

  const logoutHandler = () => {
    dispatch(authActions.logout());
    // authCtx.logout();
    navigate("/");
  };
  const toggleHandler = () => {
    dispatch(toggleTheme({ isDarkTheme: true }));
  };
  return (
    <>
      <header className={classes.header}>
        <h1>Expense Tracker</h1>
        
          <div className={classes.nav}>
            {isLoggedIn && (
              <>
                <button onClick={logoutHandler} className={classes.logout}>
                  Logout
                </button>
                <div className={classes.verify}>
                  <Link to="/Verification">Verify Email</Link>
                </div>
                <div className={classes.completeNow}>
                  Your profile is incomplete.
                  <Link to="/Profile">Complete now</Link>
                </div>
              </>
            )}
            {isDarkThemeEnable && (
              <button className={classes.toggleBtn} onClick={toggleHandler}>
                <img src={DarkThemeIcon} className={classes.icon} />
              </button>
            )}
          </div>
      </header>
    </>
  );
}

export default Header;
