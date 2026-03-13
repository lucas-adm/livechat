import {
  CreateMessageInput,
  DeleteMessageInput,
  ReadMessageInput,
  TypingInput,
  UpdateMessageInput,
} from '../dtos/in';
import {
  CreateMessageOutput,
  DeleteMessageOutput,
  PresenceOutput,
  ReadMessageOutput,
  TypingOutput,
  UpdateMessageOutput,
} from '../dtos/out';
import { createWebSocketClient } from '../ws';
import { User } from '../models';

export function createChatService() {
  const url = process.env.NEXT_PUBLIC_WEBSOCKET!;
  const socket = createWebSocketClient(url);
  const pendingSubscriptions: (() => void)[] = [];
  let isConnected = false;

  function connect(user: User | null, onConnected?: () => void) {
    socket.connect(user, () => {
      isConnected = true;
      pendingSubscriptions.forEach((fn) => fn());
      pendingSubscriptions.length = 0;
      onConnected?.();
    });
  }

  function disconnect() {
    isConnected = false;
    socket.disconnect();
  }

  function subscribeWhenConnected<T>(
    topic: string,
    callback: (output: T) => void,
  ) {
    const subscribe = () => socket.subscribe<T>(topic, callback);
    if (isConnected) return subscribe();
    return pendingSubscriptions.push(subscribe);
  }

  const createListener =
    <T>(topic: string) =>
    (callback: (output: T) => void) =>
      subscribeWhenConnected<T>(topic, callback);
  const createSender =
    <T = void>(destination: string) =>
    (payload?: T) =>
      socket.send(destination, payload);

  const sendTyping = createSender<TypingInput>('/app/typing');
  const sendMessage = createSender<CreateMessageInput>('/app/msg');
  const readMessage = createSender<ReadMessageInput>('/app/read');
  const deleteMessage = createSender<DeleteMessageInput>('/app/delete');
  const updateMessage = createSender<UpdateMessageInput>('/app/update');

  const onPresence = createListener<PresenceOutput>('/topics/presence');
  const onTyping = createListener<TypingOutput>('/topics/typing');
  const onMessage = createListener<CreateMessageOutput>('/topics/msg');
  const onRead = createListener<ReadMessageOutput>('/topics/read');
  const onDelete = createListener<DeleteMessageOutput>('/topics/delete');
  const onUpdate = createListener<UpdateMessageOutput>('/topics/update');

  return {
    connect,
    disconnect,
    sendTyping,
    sendMessage,
    readMessage,
    deleteMessage,
    updateMessage,
    onPresence,
    onTyping,
    onMessage,
    onRead,
    onDelete,
    onUpdate,
  };
}
