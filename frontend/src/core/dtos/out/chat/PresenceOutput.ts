import { User } from '@/core/models';

export type PresenceOutput = {
  user: User;
  online: boolean;
};
