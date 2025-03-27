import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../../utils/services";
import { baseUrl } from "../../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if the user is authenticated
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User");
    if (user) {
      setUser(JSON.parse(user));
      setIsAuthenticated(true); // If user exists in localStorage, set isAuthenticated to true
    }
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(
        `${baseUrl}/users/register`,
        registerInfo
      );

      setIsRegisterLoading(false);

      if (response.error) {
        return setRegisterError(response);
      }
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
      setIsAuthenticated(true); // Set authentication state to true after successful registration
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(
        `${baseUrl}/users/login`, loginInfo
      );

      setIsLoginLoading(false);

      if (response.error) {
        setLoginError(response.error.msg || "An unknown error took place");
        return;
      }

      localStorage.setItem("User", JSON.stringify(response)); // Store user data in localStorage
      setUser(response);
      setIsAuthenticated(true); // Set authentication state to true after successful login
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
    setIsAuthenticated(false); // Set authentication state to false after logout
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated, // Pass authentication state to the context
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
