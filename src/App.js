import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/Authentication/SignUp';
import { useContext } from 'react';
import AuthContext from './components/store/AuthContext';
import Root from './components/Pages/Root';
import Profile from './components/Pages/Profile';
import Verification from './components/Pages/Verification';

function App() {
const authCtx = useContext(AuthContext)
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={!authCtx.isLoggedIn ? <SignUp/> : <Root/>} />
    <Route path='/Verification' element={<Verification/>} />
    <Route path='/Profile' element={<Profile/>} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
