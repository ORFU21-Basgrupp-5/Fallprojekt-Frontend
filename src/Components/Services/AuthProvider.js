import { createContext, useContext,useEffect, useState } from "react";
import { DeleteCookie } from "./cookie";
const AuthContext = createContext();

// context that we can use from anypage, if this is true, private routing
// becomes active. 
// you can set this state on anypage, so if you want user to get logedout set this to false.
const AuthProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
   if(loginStatus === false)
   DeleteCookie('token');
  }, [loginStatus]);


  return (
    <AuthContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);