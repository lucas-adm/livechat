'use client';

import { User } from '@/core/models';
import { createContext, useState } from 'react';

type Payload = {
  user: User;
  typing: boolean;
};

type Props = {
  typing: Payload[] | null;
  setTyping: React.Dispatch<React.SetStateAction<Payload[] | null>>;
};

export const TypingContext = createContext<Props>({} as Props);

export const TypingProvider = ({ children }: { children: React.ReactNode }) => {
  const [typing, setTyping] = useState<Payload[] | null>(null);

  return (
    <TypingContext.Provider
      value={{
        typing,
        setTyping,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};
