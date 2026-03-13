import { clsx } from 'clsx';
import { forwardRef, SetStateAction } from 'react';
import { IconDotsVertical } from '@tabler/icons-react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<SetStateAction<boolean>>;
};

export const MenuTrigger = forwardRef<HTMLButtonElement, Props>(
  ({ isMenuOpen, setIsMenuOpen, ...rest }, ref) => (
    <button
      ref={ref}
      aria-label="Opções"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className={clsx(
        'cursor-pointer outline-none',
        'relative w-fit p-0.5 rounded-full',
        'flex items-center',
        'transition-colors',
        'hover:bg-black/10 focus-visible:bg-black/10',
      )}
      {...rest}
    >
      <IconDotsVertical size={18} className="text-indigo-300" />
    </button>
  ),
);

MenuTrigger.displayName = 'MenuTrigger';
