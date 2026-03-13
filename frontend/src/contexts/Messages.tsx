'use client';

import { createContext, useState } from 'react';
import { Message } from '@/core/models';

type MessagesContextProps = {
  messages: Message[] | null;
  setMessages: React.Dispatch<React.SetStateAction<Message[] | null>>;
};

export const MessagesContext = createContext<MessagesContextProps>(
  {} as MessagesContextProps,
);

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<Message[] | null>(null);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        setMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
