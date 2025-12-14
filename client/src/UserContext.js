import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

  const signin = (id) => {
    localStorage.setItem('userId', id);
    setUserId(id);
  };

  const signout = () => {
    localStorage.removeItem('userId');
    setUserId('');
  };

  return (
    <UserContext.Provider value={{ userId, signin, signout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
