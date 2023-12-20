import React,{useState, useEffect} from 'react';
import classes from './Profile.module.css';
// import AuthContext from '../store/AuthContext';
import Input from '../UI/Input';
import { useSelector } from 'react-redux';

const Profile = () => {
      const [fullName, setFullName] = useState("");
      const [profilePhoto, setProfilePhoto] = useState("");
      // const authCtx = useContext(AuthContext);
      const token = useSelector((state)=>state.idToken)

      const fetchData = async () => {
            try {
              const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDYqoBZCKTVh4iUeC-VLJzHdTjoISkXW-k`,
                {
                  method: 'POST',
                  body: JSON.stringify({
                    idToken:token,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
              const data = await response.json();
              
              if (data.users && data.users.length > 0) {
                const user = data.users[0];
                setFullName(user.displayName || ''); 
                setProfilePhoto(user.photoUrl || '');
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          };
        

      const submitHandler = async (e) => {
            e.preventDefault();
        
            try {
              const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDYqoBZCKTVh4iUeC-VLJzHdTjoISkXW-k",
                {
                  method: "POST",
                  body: JSON.stringify({
                    idToken: token,
                    displayName: fullName,
                    photoUrl: profilePhoto,
                    returnSecureToken: true,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error("Error submitting form:", error);
            }
            setFullName("");
            setProfilePhoto("");
          };
        
          useEffect(()=>{
            fetchData()           
          },[token])
      return (
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
      );
}
export default Profile;