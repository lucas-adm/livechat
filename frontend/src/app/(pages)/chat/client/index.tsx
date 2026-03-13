'use client';

import { Aside, Chat, Separator } from './components';
import { clsx } from 'clsx';
import { Message, User } from '@/core/models';
import { normalize } from '@/utils';
import { useChat, useMessages, useUser } from '@/hooks';
import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  users: User[];
  onlineUsers: User['id'][];
  messages: Message[];
};

export const Client = ({ users, onlineUsers, messages: msgs }: Props) => {
  const { onMessage, onRead, onDelete, onUpdate } = useChat();
  const { user } = useUser();
  const { messages, setMessages } = useMessages();
  const [editing, setEditing] = useState<Message | null>(null);
  const [firstUnreadId, setFirstUnreadId] = useState<string | null | undefined>(
    undefined,
  );
  const insideAudioRef = useRef<HTMLAudioElement | null>(null);
  const outsideAudioRef = useRef<HTMLAudioElement | null>(null);

  const unreads: number = useMemo(() => {
    if (messages)
      return messages
        .filter((m) => !user || m.user.id !== user.id)
        .filter((m) => !m.text.read).length;
    return 0;
  }, [messages, user]);

  useEffect(() => {
    insideAudioRef.current = new Audio('/sounds/notification/inside.mp3');
    outsideAudioRef.current = new Audio('/sounds/notification/outside.mp3');
    if (insideAudioRef.current) insideAudioRef.current.volume = 0.25;
    if (outsideAudioRef.current) outsideAudioRef.current.volume = 0.25;
  }, []);

  useEffect(
    () => setMessages(msgs.map((m) => normalize.message(m, 'sent'))),
    [msgs, setMessages],
  );

  useEffect(() => {
    document.title = unreads > 0 ? `Chat (${unreads})` : 'Chat';
  }, [unreads]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (unreads === 0) return setFirstUnreadId(null);
      if (firstUnreadId) return;
      if (messages) {
        const firstUnread = messages.find(
          (m) => !m.text.read && (user ? m.user.id !== user.id : true),
        );
        if (firstUnread) return setFirstUnreadId(firstUnread.text.id);
      }
    }, 666);
    return () => clearTimeout(timer);
  }, [firstUnreadId, messages, unreads, user]);

  useEffect(() => {
    onMessage((output) => {
      const isFromCurrentUser = user && user.id === output.user.id;
      setMessages((prev) =>
        prev
          ? prev.some((m) => m.text.id === output.text.id)
            ? prev
            : isFromCurrentUser
              ? prev.map((m) =>
                  m.text.clientId === output.text.clientId
                    ? normalize.message(output, 'sent')
                    : m,
                )
              : [...prev, normalize.message(output, 'sent')]
          : [normalize.message(output, 'sent')],
      );
      if (insideAudioRef.current && outsideAudioRef.current) {
        if (isFromCurrentUser) return;
        const hidden = document.hidden;
        const audio = hidden ? outsideAudioRef.current : insideAudioRef.current;
        audio.play();
      }
    });
  }, [onMessage, setMessages, user]);

  useEffect(() => {
    onRead((output) => {
      setMessages((prev) =>
        prev
          ? prev.map((m) =>
              m.text.id === output.text.id
                ? normalize.message(output, 'sent')
                : m,
            )
          : prev,
      );
    });
  }, [onRead, setMessages]);

  useEffect(() => {
    onDelete((output) => {
      setMessages((prev) =>
        prev
          ? prev.some((m) => m.text.id === output.text.id)
            ? prev.map((m) =>
                m.text.id === output.text.id
                  ? normalize.message(output, 'sent')
                  : m,
              )
            : [...prev, normalize.message(output, 'sent')]
          : [normalize.message(output, 'sent')],
      );
    });
  }, [onDelete, setMessages]);

  useEffect(() => {
    onUpdate((output) => {
      setMessages((prev) =>
        prev
          ? prev.some((m) => m.text.id === output.text.id)
            ? prev.map((m) =>
                m.text.id === output.text.id
                  ? normalize.message(output, 'sent')
                  : m,
              )
            : [...prev, normalize.message(output, 'sent')]
          : [normalize.message(output, 'sent')],
      );
    });
  }, [onUpdate, setMessages]);

  useEffect(() => {
    const cancelEditing = (e: KeyboardEvent) => {
      if (editing) if (e.key === 'Escape') setEditing(null);
    };
    window.addEventListener('keydown', cancelEditing);
    return () => window.removeEventListener('keydown', cancelEditing);
  }, [editing]);

  if (messages && firstUnreadId !== undefined)
    return (
      <section
        className={clsx(
          'overflow-clip',
          'relative w-full max-w-270 h-full max-h-180 inmd:max-h-full',
          'mx-auto rounded-2xl inmd:rounded-none border border-black/5',
          'flex',
        )}
      >
        <Aside user={user} users={users} onlineUsers={onlineUsers} />
        <div className="w-full h-full p-3 insm:px-2 flex flex-col gap-3 bg-black/10 insm:bg-transparent">
          <Chat.Header />
          <Separator />
          <div
            className={clsx(
              'overflow-clip',
              'relative w-full min-h-0 h-full',
              'px-8 py-4 insm:p-0 rounded-2xl',
              'flex flex-col gap-3',
              'bg-indigo-900/25 insm:bg-transparent',
            )}
          >
            <div
              aria-hidden="true"
              style={{
                backgroundImage: `url('/pattern.jpg')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'repeat',
              }}
              className="select-none pointer-events-none insm:hidden absolute inset-0 opacity-2"
            />
            <Chat.Blur editing={editing} />
            <Chat.List
              user={user}
              messages={messages}
              editing={editing}
              setEditing={setEditing}
              firstUnreadId={firstUnreadId}
            />
            <Chat.Footer editing={editing} setEditing={setEditing} />
          </div>
        </div>
      </section>
    );

  return null;
};
