'use client';

import { createChatService } from '@/core/services';
import { createContext, useEffect, useRef, useState } from 'react';
import { useUser } from '@/hooks';

type ChatSocket = ReturnType<typeof createChatService>;

export const WebSocketContext = createContext<ChatSocket>({} as ChatSocket);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const [socket] = useState<ChatSocket>(() => createChatService());
  const connectedRef = useRef(false);

  useEffect(() => {
    if (connectedRef.current) return;
    connectedRef.current = true;
    socket.connect(user ? user : null);
    return () => {
      connectedRef.current = false;
      socket.disconnect();
    };
  }, [socket, user]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
