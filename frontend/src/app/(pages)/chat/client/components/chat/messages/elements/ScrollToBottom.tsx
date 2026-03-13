import { clsx } from 'clsx';
import { IconChevronDown } from '@tabler/icons-react';
import { Message } from '@/core/models';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isAtBottom: boolean;
  editing: Message | null;
};

export const ScrollToBottom = ({ isAtBottom, editing, ...rest }: Props) => (
  <button
    className={clsx(
      'select-none cursor-pointer outline-none',
      'w-fit ml-auto px-3',
      'flex items-center',
      'text-indigo-300',
      'transition-all',
      editing || isAtBottom ? 'pointer-events-none opacity-0' : 'opacity-100',
      'hover:text-indigo-400 hover:scale-125',
      'focus-visible:text-indigo-400 focus-visible:scale-125',
    )}
    {...rest}
  >
    <span>
      <IconChevronDown size={20} strokeWidth={3} className="" />
    </span>
  </button>
);
