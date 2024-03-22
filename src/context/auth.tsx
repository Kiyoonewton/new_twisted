// Project Imports
import React, { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api, { updateAPIToken } from "@/helpers/utilities/api";

// Context
export const AuthContext = React.createContext({});

// Provider
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading] = useState(false);
  const [, setShowLoader] = useState(true);

  // Sign in a user
  const signInWithEmailPassword = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await api.post(`/auth/login`, {
          email: email,
          password: password,
        });
        const token = result.data.tokens.access.token;
        Cookies.set("uid", result.data.user.id);
        Cookies.set("user", JSON.stringify(result.data.user));
        if (rememberMe) {
          Cookies.set("tokens", JSON.stringify(result.data.tokens));
        } else {
          Cookies.set("tokens", "");
        }

        updateAPIToken(token);
        setIsLoggedIn(true);
        setCurrentUser(result.data.user);
        resolve(result.data);
      } catch (error) {
        reject(error);
      }
    });
  };

  // Create user
  const registerWithEmailPassword = () => {};

  // Sign out a user
  const signOutUser = () => {};

  const resetUserPassword = () => {};

  // Reset user password
  const refreshToken = async () => {
    try {
      const tokens = Cookies.get("tokens");
      const userDetails = Cookies.get("user");
      if (tokens && userDetails) {
        // Token expired we can refresh the token
        const res = await api.post("/auth/refresh-tokens", {
          refreshToken: JSON.parse(tokens).refresh.token,
        });

        if (res.data.user) {
          // ALL good
          Cookies.set("tokens", JSON.stringify(res.data.tokens));
          Cookies.set("user", JSON.stringify(res.data.user));
          updateAPIToken(res.data.tokens.access.token);
          setCurrentUser(res.data.user);
        }
      }
    } catch (error) {
      setCurrentUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    async function autoLogin() {
      try {
        const tokensRaw = Cookies.get("tokens");
        const uid = Cookies.get("uid");
        if (tokensRaw && uid) {
          try {
            const tokens = JSON.parse(tokensRaw);
            if (tokens.access && tokens.access.expires) {
              const expires = new Date(tokens.access.expires);
              if (new Date() < expires) {
                updateAPIToken(tokens.access.token);
                const user = await api.get(`/users/${uid}`);
                setCurrentUser(user.data);
                setIsLoggedIn(true);
                console.debug("already logged in", user.data);
              } else {
                refreshToken();
              }
            }
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    autoLogin();

    // return unsubscribe
  }, []);

  const hideLoader = (value: boolean) => {
    let showValue = value === true ? false : true;
    setShowLoader(showValue);
  };

  const value = {
    currentUser,
    loading,
    isLoggedIn,
    signInWithEmailPassword,
    registerWithEmailPassword,
    signOutUser,
    resetUserPassword,
    hideLoader,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
