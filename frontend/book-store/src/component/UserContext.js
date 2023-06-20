import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      return storedUserId;
    } else {
      const newUserId = uuidv4();
      localStorage.setItem('userId', newUserId);
      return newUserId;
    }
  });

  return (
    <UserContext.Provider value={userId}>
      {children}
    </UserContext.Provider>
  );
};
