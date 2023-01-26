import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { LOGIN_URL, REFRESH_URL, REGISTER_URL } from "../utils/url";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const TOKENS_KEY = "TOKENS";

  const has_tokens = Boolean(localStorage.getItem(TOKENS_KEY));
  const tokens_state = has_tokens
    ? JSON.parse(localStorage.getItem(TOKENS_KEY))
    : null;
  const user_state = has_tokens
    ? jwt_decode(tokens_state.access).username
    : null;

  const [tokens, setTokens] = useState(() => tokens_state);
  const [user, setUser] = useState(() => user_state);

  const loginUser = (values, setErrors, setUserNotFound) => {
    axios
      .post(LOGIN_URL, {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        setTokens(res.data);
        setUser(jwt_decode(res.data.access).username);
        localStorage.setItem(TOKENS_KEY, JSON.stringify(res.data));
        nav("/");
      })
      .catch((err) => {
        const errorData = err.response.data;
        setUserNotFound(errorData?.detail);
        let kv = {}; // KEY VALUE PAIR FOR SETTING AN ERRORS.
        kv[Object.keys(errorData)[0]] = errorData[Object.keys(errorData)[0]];
        kv[Object.keys(errorData)[1]] = errorData[Object.keys(errorData)[1]];
        setErrors(kv);
      });
  };

  const registerUser = (values, setErrors, setUserIsExisted) => {
    axios
      .post(REGISTER_URL, {
        email: values.email,
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        setTokens(res.data);
        setUser(jwt_decode(res.data.access).username);
        localStorage.setItem(TOKENS_KEY, JSON.stringify(res.data));
        nav("/");
      })
      .catch((err) => {
        const errorData = err.response.data;
        setUserIsExisted(errorData?.detail);
        let kv = {}; // KEY VALUE PAIR FOR SETTING AN ERRORS.
        kv[Object.keys(errorData)[0]] = errorData[Object.keys(errorData)[0]];
        kv[Object.keys(errorData)[1]] = errorData[Object.keys(errorData)[1]];
        kv[Object.keys(errorData)[2]] = errorData[Object.keys(errorData)[2]];
        setErrors(kv);
      });
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem(TOKENS_KEY);
    nav("/login");
  };

  const refreshToken = () => {
    axios
      .post(REFRESH_URL, { refresh: tokens?.refresh })
      .then((res) => {
        setTokens(res.data);
        localStorage.setItem(TOKENS_KEY, JSON.stringify(res.data));
        const username = jwt_decode(res.data.access).username;
        setUser(username);
        setLoading(false);
      })
      .catch(() => {
        logout();
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loading) refreshToken();
    let intervalID = setInterval(() => {
      if (tokens) refreshToken();
    }, 60 * 1000 * 4);
    return () => clearInterval(intervalID);
  }, [tokens, loading]);

  let contextData = {
    loginUser,
    registerUser,
    logout,
    user,
    tokens,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? undefined : children}
    </AuthContext.Provider>
  );
};
