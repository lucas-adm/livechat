import { Button, Textarea, Typing } from './elements';
import { createMessageData, UpdateMessageInput } from '@/core/schemas';
import { CreateMessageInput } from '@/core/schemas';
import {
  CreateMessageInput as CreationPayload,
  UpdateMessageInput as EditionPayload,
} from '@/core/dtos/in';
import { FormProvider, useForm } from 'react-hook-form';
import {
  IconArrowRight,
  IconCheck,
  IconPaperclip,
  IconSticker2,
  IconX,
} from '@tabler/icons-react';
import { Message, mockMessage, User } from '@/core/models';
import { normalize } from '@/utils';
import { useChat, useMessages, useTyping, useUser } from '@/hooks';
import { useEffect, useMemo, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = React.HTMLAttributes<HTMLElement> & {
  editing: Message | null;
  setEditing: React.Dispatch<React.SetStateAction<Message | null>>;
};

export const Footer = ({ editing, setEditing, ...rest }: Props) => {
  const createMessage = useForm<CreateMessageInput | UpdateMessageInput>({
    resolver: zodResolver(createMessageData),
  });

  const { trigger, getValues, reset } = createMessage;

  const { user } = useUser();
  const { sendTyping, onTyping, sendMessage, updateMessage } = useChat();
  const { typing, setTyping } = useTyping();
  const { setMessages } = useMessages();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isTypingRef = useRef<boolean>(false);

  const typingUsers: string[] | null = useMemo(() => {
    if (typing) {
      if (user)
        return typing
          .filter((t) => t.typing && t.user.id !== user.id)
          .map((t) => t.user.displayName);
      return typing.filter((t) => t.typing).map((t) => t.user.displayName);
    }
    return null;
  }, [typing, user]);

  useEffect(() => {
    onTyping((output) => {
      setTyping((prev) =>
        prev
          ? prev.some((u) => u.user.id === output.user.id)
            ? prev.map((u) => (u.user.id === output.user.id ? output : u))
            : [...prev, output]
          : [output],
      );
    });
  }, [onTyping, setTyping]);

  useEffect(() => {
    if (editing) reset({ content: editing.text.content ?? '' });
    else reset({ content: '' });
  }, [editing, reset]);

  const sendCreateMessage = (user: User, data: CreateMessageInput) => {
    const normalized = normalize.message(
      mockMessage(user, data.content),
      'sending',
    );
    const payload: CreationPayload = {
      user,
      clientId: normalized.text.clientId,
      ...data,
    };
    sendTyping({ user, typing: false });
    sendMessage(payload);
    setMessages((prev) => (prev ? [...prev, normalized] : [normalized]));
    reset({ content: '' });
    isTypingRef.current = false;
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    return;
  };

  const sendUpdateMessage = (
    user: User,
    editing: Message,
    data: UpdateMessageInput,
  ) => {
    const normalized = normalize.message(editing, 'sending', data.content);
    const payload: EditionPayload = { id: editing.text.id, ...data };
    sendTyping({ user, typing: false });
    updateMessage(payload);
    setMessages((prev) =>
      prev
        ? prev.some((m) => m.text.id === editing.text.id)
          ? prev.map((m) => (m.text.id === editing.text.id ? normalized : m))
          : [...prev, normalized]
        : [normalized],
    );
    setEditing(null);
    reset({ content: '' });
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    return;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await trigger();
    if (user && isValid) {
      const data = getValues();
      if (editing) sendUpdateMessage(user, editing, data);
      else sendCreateMessage(user, data);
    }
    return null;
  };

  const handleManualSubmit = async () => {
    const isValid = await trigger();
    if (user && isValid) {
      const data = getValues();
      if (editing) sendUpdateMessage(user, editing, data);
      else sendCreateMessage(user, data);
    }
  };

  return (
    <footer className="z-2 relative" {...rest}>
      <Typing typing={typingUsers} />
      {user ? (
        <FormProvider {...createMessage}>
          <form onSubmit={handleFormSubmit} className="flex gap-3">
            <fieldset className="w-full p-2 rounded-3xl border border-white/5 flex items-center gap-2 bg-indigo-800 drop-shadow">
              <Button
                type="button"
                tabIndex={-1}
                icon={IconSticker2}
                className="mb-0! py-0 text-indigo-500! bg-transparent"
              />
              <Textarea
                ref={textareaRef}
                name="content"
                isTypingRef={isTypingRef}
                user={user}
                editing={editing}
              />
              <Button
                type="button"
                tabIndex={-1}
                icon={IconPaperclip}
                className="mb-0! py-0 text-indigo-500! bg-transparent"
              />
            </fieldset>
            {editing ? (
              <>
                <Button
                  type="button"
                  icon={IconX}
                  onClick={() => setEditing(null)}
                />
                <Button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleManualSubmit}
                  icon={IconCheck}
                />
              </>
            ) : (
              <Button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleManualSubmit}
                icon={IconArrowRight}
              />
            )}
          </form>
        </FormProvider>
      ) : null}
    </footer>
  );
};
