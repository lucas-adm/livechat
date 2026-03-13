import { User } from './User';

export type Message = {
  user: User;
  text: {
    id: string;
    clientId: string;
    creator: string;
    content: string | null;
    createdAt: string;
    updatedAt: string | null;
    read: boolean;
    updated: boolean;
    deleted: boolean;
    status: 'sending' | 'sent' | 'deleting' | null;
  };
};

export function mockMessage(user: User, content: string): Message {
  const id = crypto.randomUUID().toString();
  return {
    user: user,
    text: {
      id: id,
      clientId: id,
      creator: user.id,
      content: content,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      read: false,
      updated: false,
      deleted: false,
      status: null,
    },
  };
}
