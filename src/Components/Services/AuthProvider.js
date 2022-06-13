import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false);
  console.log({ loginStatus });
  return (
    <AuthContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);