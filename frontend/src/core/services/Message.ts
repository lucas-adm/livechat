import { createHttpClient } from '../http';
import { Message } from '../models';

export function createMessageService() {
  const url: string = process.env.API!;

  const api = createHttpClient(url);

  async function findMessages() {
    return api.get<Message[]>('/messages', undefined);
  }

  return { findMessages };
}
