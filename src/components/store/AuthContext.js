import React,{useState} from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuhContextProvider = (props) => {
      const initialState = localStorage.getItem("token")
  const [token, setToken] = useState(initialState);

  const userIsLoggedIn = !!token;
  const loginHandler = (token) => {
      setToken(token)
      localStorage.setItem("token",token)
      console.log("token",token)
  };
  const logoutHandler = () => {
    setToken("");
      localStorage.removeItem("token")
  };

      const cartContext = {
            token:token,
            isLoggedIn:userIsLoggedIn,
            login:loginHandler,
            logout:logoutHandler,
      }
      return (
            <AuthContext.Provider value={cartContext}>{props.children}</AuthContext.Provider>
      );
}

export default AuthContext;