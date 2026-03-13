import { useContext } from 'react';
import { WebSocketContext } from '@/contexts';

export const useChat = () => useContext(WebSocketContext);
