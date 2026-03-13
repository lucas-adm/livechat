import { Avatar } from '@/components';
import { clsx } from 'clsx';
import {
  Content,
  DisplayName,
  Menu,
  SpeechBubble,
  SpeechBubbleTail,
  Status,
  Time,
} from './elements';
import { Message } from '@/core/models';
import { useChat } from '@/hooks';
import { useEffect, useRef } from 'react';

type Props = React.LiHTMLAttributes<HTMLLIElement> & {
  message: Message;
  editing: Message | null;
  setEditing: React.Dispatch<React.SetStateAction<Message | null>>;
  isAuthor: boolean;
};

export const Item = ({
  message,
  editing,
  setEditing,
  isAuthor,
  ...rest
}: Props) => {
  const { readMessage } = useChat();

  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (isAuthor) return;
    if (message.text.read) return;
    const el = ref.current;
    if (el) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            readMessage({ id: message.text.id });
            observer.disconnect();
          }
        },
        { threshold: 0.6 },
      );
      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [isAuthor, message.text.id, message.text.read, readMessage]);

  return (
    <li
      ref={ref}
      className={clsx(
        'overflow-hidden flex-none w-full p-2 flex items-center gap-2',
        editing && editing.text.id === message.text.id
          ? 'z-1'
          : 'z-0 transition-all duration-999',
        isAuthor ? 'justify-end' : 'justify-start',
      )}
      {...rest}
    >
      {isAuthor ? null : <Avatar src={message.user.avatar} />}
      <SpeechBubble isAuthor={isAuthor}>
        <SpeechBubbleTail isAuthor={isAuthor} />
        <header className="flex items-center justify-between gap-3">
          <DisplayName>{message.user.displayName}</DisplayName>
          <Menu msg={message} setEditing={setEditing} isAuthor={isAuthor} />
        </header>
        <Content content={message.text.content} />
        <footer className="flex items-center justify-between gap-1">
          <Time msg={message} />
          <Status msg={message} />
        </footer>
      </SpeechBubble>
    </li>
  );
};
