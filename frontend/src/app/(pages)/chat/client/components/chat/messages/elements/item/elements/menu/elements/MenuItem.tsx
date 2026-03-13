import { clsx } from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ElementType;
  action: string;
};

export const MenuItem = ({ icon: Icon, action, ...rest }: Props) => (
  <button
    type="button"
    className={clsx(
      'cursor-pointer outline-none',
      'p-2',
      'flex items-center justify-center gap-2',
      'text-indigo-100',
      'hover:bg-black/10 focus-visible:bg-black/10',
    )}
    {...rest}
  >
    <span aria-hidden="true">
      <Icon size={12} />
    </span>
    <span className="text-xs">{action}</span>
  </button>
);
