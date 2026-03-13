'use client';

import { createContext, useEffect, useState } from 'react';
import { User } from '@/core/models';

type UserContextProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps,
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    function mount() {
      setIsMounted(true);
    }
    mount();
  }, []);

  if (isMounted)
    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </UserContext.Provider>
    );

  return null;
};
