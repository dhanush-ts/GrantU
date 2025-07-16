import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const initialState = {
  userData: null,
  loginModalOpen: false,
  isVerified: false,
  isAuthenticated: false,
};

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setIsAuthenticated = (isAuthenticated) => {
    setState((prev) => ({ ...prev, isAuthenticated: isAuthenticated }));
  };

  const setUserData = (user) => {
    setState((prev) => ({ ...prev, userData: user }));
  };

  const setLoginModalOpen = (val) => {
    setState((prev) => ({ ...prev, loginModalOpen: val }));
  }

  const verifyUser = () => {
    setState((prev) => ({ ...prev, isVerified: true }));
  };

  const resetAuth = () => {
    setState(initialState); // logout or reset
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setUserData,
        setLoginModalOpen,
        setIsAuthenticated,
        verifyUser,
        resetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
