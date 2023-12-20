import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './components/Authentication/SignUp';
// import { useContext } from 'react';
// import AuthContext from './components/store/AuthContext';
import Root from './components/Pages/Root';
import Profile from './components/Pages/Profile';
import Verification from './components/Pages/Verification';
import ForgetPassword from './components/Pages/ForgetPassword';
import './App.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import classes from "./new.module.css";
function App() {
// const authCtx = useContext(AuthContext)
const isLoggedIn =  useSelector((state)=>state.auth.isLoggedIn)
console.log("APPP",isLoggedIn)
const isTheme = useSelector((state)=>state.theme.isDarkTheme)
useEffect(() => {
  document.body.classList.toggle(classes.dark, isTheme);
  return () => {
    document.body.classList.remove(classes.dark);
  };
}, [isTheme]);
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={!isLoggedIn ? <SignUp/> : <Root/>} />
    <Route path='/ForgetPassword' element={<ForgetPassword/>} />
    <Route path='/Verification' element={<Verification/>} />
    <Route path='/Profile' element={<Profile/>} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
