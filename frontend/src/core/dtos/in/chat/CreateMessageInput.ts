import { User } from '@/core/models';

export type CreateMessageInput = {
  user: User;
  clientId: string;
  content: string;
};
