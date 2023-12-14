import React,{useState} from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuhContextProvider = (props) => {
      const initialState = localStorage.getItem("token")
      const initialEmail = localStorage.getItem("email")
  const [token, setToken] = useState(initialState);
  const [email,setEmail] = useState(initialEmail)

  const userIsLoggedIn = !!token;
  const loginHandler = (token,email) => {
      setToken(token)
      setEmail(email)
      localStorage.setItem("token",token)
      localStorage.setItem("email",email)
      console.log("token",token)
  };
  const logoutHandler = () => {
    setToken("");
    setEmail("");
      localStorage.removeItem("token")
      localStorage.removeItem("email")
  };

      const cartContext = {
            token:token,
            email:email,
            isLoggedIn:userIsLoggedIn,
            login:loginHandler,
            logout:logoutHandler,
      }
      return (
            <AuthContext.Provider value={cartContext}>{props.children}</AuthContext.Provider>
      );
}

export default AuthContext;