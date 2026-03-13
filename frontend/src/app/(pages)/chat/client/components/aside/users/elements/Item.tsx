import { Avatar } from '@/components';
import { User } from '@/core/models';

type Props = React.LiHTMLAttributes<HTMLLIElement> & {
  user: User;
};

export const Item = ({ user, ...rest }: Props) => (
  <li
    className="overflow-hidden flex-none w-full p-2 rounded-xl flex items-center gap-2"
    {...rest}
  >
    <Avatar src={user.avatar} useStatus isOnline={user.online} />
    <div className="w-37 insm:w-47 flex flex-col gap-1">
      <p className="truncate font-semibold text-sm text-indigo-200">
        {user.displayName}
      </p>
      {user.bio ? (
        <p className="truncate text-xs text-indigo-300">{user.bio}</p>
      ) : null}
    </div>
  </li>
);
