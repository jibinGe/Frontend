import React, { createContext, useState } from 'react';
const UserContext = createContext();

// Create a UserProvider component to provide the user details
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const userContextValue = {
    user,
    updateUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };