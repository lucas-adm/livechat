import { Client } from './client';
import { createMessageService, createUserService } from '@/core/services';

export default async function Page() {
  const { findUsers, findOnlineUsers } = createUserService();
  const { findMessages } = createMessageService();

  const users = await findUsers();
  const onlineUsers = await findOnlineUsers();
  const messages = await findMessages();

  return (
    <Client
      users={users.data}
      onlineUsers={onlineUsers.data}
      messages={messages.data}
    />
  );
}
