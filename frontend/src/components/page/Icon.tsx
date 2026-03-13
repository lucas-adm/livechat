import { clsx } from 'clsx';
import Link, { LinkProps } from 'next/link';

type Props = LinkProps & {
  icon: React.ElementType;
};

export const Icon = ({ icon: Icon, ...rest }: Props) => (
  <Link
    className={clsx(
      'group',
      'outline-none',
      'p-2 rounded-full border-4 border-indigo-50',
      'bg-transparent',
      'drop-shadow-[0_0_48px] drop-shadow-transparent',
      'transition-all duration-333 ease-linear',
      'hover:border-transparent hover:bg-indigo-50 hover:drop-shadow-indigo-50',
      'focus-visible:border-transparent focus-visible:bg-indigo-50 focus-visible:drop-shadow-indigo-50',
      'focus:scale-85',
      'active:scale-85',
    )}
    {...rest}
  >
    <Icon
      size={48}
      className={clsx(
        'text-indigo-50',
        'drop-shadow-[0_0_1px] drop-shadow-transparent',
        'scale-75',
        'transition-all duration-333 ease-linear',
        'group-hover:text-indigo-600 group-hover:scale-100 group-hover:drop-shadow-indigo-400',
        'group-focus-visible:text-indigo-600 group-focus-visible:scale-100',
      )}
    />
  </Link>
);
