import { useContext } from 'react';
import { MessagesContext } from '@/contexts';

export const useMessages = () => useContext(MessagesContext);
