'use client';

import { createContext, useState } from 'react';
import { User } from '@/core/models';

type UserProps = {
  users: User[] | null;
  setUsers: React.Dispatch<React.SetStateAction<User[] | null>>;
};

export const UsersContext = createContext<UserProps>({} as UserProps);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[] | null>(null);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
