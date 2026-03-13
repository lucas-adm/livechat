import { Message, User } from '@/core/models';

export type CreateMessageOutput = {
  user: User;
  text: Message['text'];
};
