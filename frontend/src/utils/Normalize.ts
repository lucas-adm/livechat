import { Message, User } from '@/core/models';

export function user(usr: User, online: boolean): User {
  return {
    ...usr,
    online: online,
  };
}

export function message(
  msg: Message,
  status: Message['text']['status'],
  content?: string | null,
): Message {
  return {
    ...msg,
    text: {
      ...msg.text,
      id: msg.text.id,
      content: content ?? msg.text.content,
      createdAt: msg.text.createdAt,
      status: status,
    },
  };
}

export const normalize = { user, message };
