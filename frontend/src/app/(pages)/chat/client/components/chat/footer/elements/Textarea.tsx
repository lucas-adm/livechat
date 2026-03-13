import { clsx } from 'clsx';
import { CreateMessageInput, UpdateMessageInput } from '@/core/schemas';
import { forwardRef, useEffect, useRef } from 'react';
import { Message, User } from '@/core/models';
import { useChat } from '@/hooks';
import { useFormContext } from 'react-hook-form';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: keyof (CreateMessageInput | UpdateMessageInput);
  isTypingRef: React.RefObject<boolean>;
  user: User;
  editing: Message | null;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ name, isTypingRef, user, editing, ...rest }, forwardedRef) => {
    const localRef = useRef<HTMLTextAreaElement | null>(null);
    const { register } = useFormContext<
      CreateMessageInput | UpdateMessageInput
    >();
    const { onChange, ref: registerRef, ...registerRest } = register(name);

    const { sendTyping } = useChat();

    const resize = (el: HTMLTextAreaElement) => {
      el.style.height = 'auto';
      const computed = window.getComputedStyle(el);
      const lineHeight = parseInt(computed.lineHeight);
      const maxHeight = lineHeight * 6;
      if (el.scrollHeight > maxHeight) {
        el.style.overflowY = 'auto';
        el.style.height = `${maxHeight}px`;
      } else {
        el.style.overflowY = 'hidden';
        el.style.height = `${el.scrollHeight}px`;
      }
    };

    const handleTyping = (value: string) => {
      const hasText = value.trim().length > 0;
      if (hasText && !isTypingRef.current) {
        sendTyping({ user, typing: true });
        isTypingRef.current = true;
      }
      if (!hasText && isTypingRef.current) {
        sendTyping({ user, typing: false });
        isTypingRef.current = false;
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e);
      if (!editing) handleTyping(e.target.value);
    };

    const handleInput = (e: React.InputEvent<HTMLTextAreaElement>) => {
      const target = e.currentTarget;
      resize(target);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const isDesktop =
        window.matchMedia('(hover: hover)').matches &&
        window.matchMedia('(pointer: fine)').matches;
      const textarea = localRef.current;
      if (textarea) {
        if (isDesktop) {
          if (e.shiftKey && e.key === 'Enter') return;
          if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
          }
        }
      }
      return;
    };

    useEffect(() => {
      const textarea = localRef.current;
      if (textarea) {
        textarea.focus();
        if (editing) {
          sendTyping({ user, typing: false });
          isTypingRef.current = false;
          requestAnimationFrame(() => {
            resize(textarea);
            requestAnimationFrame(
              () => (textarea.scrollTop = textarea.scrollHeight),
            );
          });
        } else {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => resize(textarea));
          });
        }
      }
    }, [editing, isTypingRef, sendTyping, user]);

    return (
      <textarea
        {...registerRest}
        ref={(el) => {
          registerRef(el);
          localRef.current = el;
          if (forwardedRef && 'current' in forwardedRef)
            forwardedRef.current = el;
        }}
        autoFocus
        autoCorrect="off"
        autoComplete="off"
        onChange={handleChange}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={editing ? 'Edite sua mensagem' : 'Escreva sua mensagem'}
        rows={1}
        className={clsx(
          'scrollbar-custom',
          'resize-none outline-none',
          'w-full',
          'text-sm text-indigo-200',
          'placeholder:truncate placeholder-indigo-200',
          'selection:bg-indigo-600 selection:text-indigo-100',
        )}
        {...rest}
      />
    );
  },
);

Textarea.displayName = 'MessageInput';
