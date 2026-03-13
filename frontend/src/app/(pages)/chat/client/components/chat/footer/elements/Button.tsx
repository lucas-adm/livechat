import { clsx } from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ElementType;
};

export const Button = ({ icon: Icon, className, ...rest }: Props) => (
  <button
    className={clsx(
      'cursor-pointer outline-none',
      'mb-0.5 p-1.75 rounded-full',
      'self-end flex items-center justify-center',
      'text-indigo-300',
      'bg-indigo-700',
      'drop-shadow',
      'transition-all',
      'hover:grayscale-15 focus-visible:grayscale-15',
      className,
    )}
    {...rest}
  >
    <figure>
      <Icon size={22} />
    </figure>
  </button>
);
