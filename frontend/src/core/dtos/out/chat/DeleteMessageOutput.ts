import { Message, User } from '@/core/models';

export type DeleteMessageOutput = {
  user: User;
  text: Message['text'];
};
