import { Message, User } from '@/core/models';

export type UpdateMessageOutput = {
  user: User;
  text: Message['text'];
};
