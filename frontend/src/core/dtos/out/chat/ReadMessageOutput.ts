import { Message, User } from '@/core/models';

export type ReadMessageOutput = {
  user: User;
  text: Message['text'];
};
