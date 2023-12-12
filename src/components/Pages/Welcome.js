import React, { useState } from "react";
import classes from "./Welcome.module.css";
import Input from "../UI/Input";

function Welcome() {
  const [isCompleteProfile, setIsCompleteProfile] = useState(false);
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const switchHandler = () => {
    setIsCompleteProfile((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDYqoBZCKTVh4iUeC-VLJzHdTjoISkXW-k",
        {
          method: "POST",
          body: JSON.stringify({
            displayName:fullName,
            photoUrl:profilePhoto,
            returnSecureToken:true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
const data = await response.json()
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setFullName("");
    setProfilePhoto("")
  };

  return (
    <>
      <header className={classes.header}>
        <h1>
          {isCompleteProfile
            ? "Winners never quit, Quitters never win"
            : "Welcome to Expense Tracker!!!"}
        </h1>
        <div className={classes.completeNow}>
          {isCompleteProfile
            ? "Complete the Profile"
            : "Your profile is incomplete."}
          <button className={classes.btn} onClick={switchHandler}>
            Complete now
          </button>
        </div>
      </header>
      {isCompleteProfile && (
        <form className={classes.main} onSubmit={submitHandler}>
          <h3>Contact Detail</h3>
          <div className={classes.int}>
            <Input
              label="Full Name"
              type="text"
              className={classes.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className={classes.int}>
            <Input
              label="Profile photo"
              type="text"
              className={classes.input}
              onChange={(e) => setProfilePhoto(e.target.value)}
            />
          </div>
          <button type="submit" className={classes.btns}>
            Update
          </button>
        </form>
      )}
    </>
  );
}

export default Welcome;
