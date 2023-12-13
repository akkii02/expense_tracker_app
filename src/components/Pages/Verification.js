import React, { useContext, useState } from "react";
import AuthContext from "../store/AuthContext";
import Input from "../UI/Input";
import { useNavigate } from "react-router-dom";
import classes from './Verification.module.css';

const Verification = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email,setEmail] = useState('');
  const authCtx = useContext(AuthContext);
  const history = useNavigate();
  const switchHandler = () => {
    setIsLoggedIn(authCtx.isLoggedIn);
  };
  const submitHandler = async(e) => {
      e.preventDefault();
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDYqoBZCKTVh4iUeC-VLJzHdTjoISkXW-k",
      {
            method:"POST",
            body:JSON.stringify({
                  requestType:"VERIFY_EMAIL",
                  idToken:authCtx.token,
            }),
            headers:{
                  "Content-Type" : "application/json"
            }
      })
      const data = await response.json();
      if(data.email===email){
            history("/Welcome")
      }
      if(!data.ok){
            throw new Error("verification Failed!",data.error.message);
      }
  }
  return (
    <>
      {!isLoggedIn && <button onClick={switchHandler}>Verify Email ID</button>}
      {isLoggedIn &&
       <form onSubmit={submitHandler} className={classes.main} >
             <div className={classes.int}>
            <Input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className={classes.input}/>
             </div>
             <button className={classes.btns}>Verify</button>
       </form>
       }
    </>
  );
};
export default Verification;
