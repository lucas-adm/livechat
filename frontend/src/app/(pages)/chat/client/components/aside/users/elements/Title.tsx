import { clsx } from 'clsx';
import { User } from '@/core/models';

type Props = Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'> & {
  users: User[];
  title: string;
};

export const Title = ({ users, title, className, ...rest }: Props) => {
  if (users.length === 0) return null;
  return (
    <li
      className={clsx('pl-4', 'font-medium text-sm text-indigo-400', className)}
      {...rest}
    >
      {title} {users.length}
    </li>
  );
};
