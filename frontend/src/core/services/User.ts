import { createHttpClient } from '../http';
import { OnlineIdsOutput } from '../dtos/out';
import { User } from '../models';

export function createUserService() {
  const url: string = process.env.API!;
  const api = createHttpClient(url);

  async function authViaRandomUser() {
    return api.get<User>('/users/random', undefined);
  }

  async function authViaGitHub(code: string) {
    return api.post<User>('/users/github', { code });
  }

  async function findUsers() {
    return api.get<User[]>('/users', undefined);
  }

  async function findOnlineUsers() {
    return api.get<OnlineIdsOutput>('/users/online', undefined);
  }

  return { authViaRandomUser, authViaGitHub, findUsers, findOnlineUsers };
}
