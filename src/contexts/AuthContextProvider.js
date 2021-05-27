import { createContext, useState } from "react";
import localStorageService from "../services/localStorageService";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  // // const [state,dispatch] = useReducer(reducer, initialState)
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   localStorageService.getToken()
  // );
  // const [isAuthenticated, setIsAuthenticated] = useState(localStorageService.getToken())

  const payload = localStorageService.getToken()
    ? jwtDecode(localStorageService.getToken())
    : false;
  const [user, setUser] = useState(payload);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
