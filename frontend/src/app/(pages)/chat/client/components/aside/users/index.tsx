import { Item, Title } from './elements';
import { normalize } from '@/utils';
import { Separator } from '../../utils';
import { useChat, useUser } from '@/hooks';
import { useEffect, useMemo, useState } from 'react';
import { User } from '@/core/models';
import { useUsers } from '@/hooks/Users';

type Props = React.HTMLAttributes<HTMLUListElement> & {
  users: User[];
  onlineUsers: User['id'][];
};

export const List = ({ users: usrs, onlineUsers, ...rest }: Props) => {
  const { onPresence } = useChat();
  const { user } = useUser();
  const { users, setUsers } = useUsers();

  const [onlineIds, setOnlineIds] = useState<User['id'][]>(onlineUsers);
  const { online, offline } = useMemo(() => {
    if (users) {
      const normalized = users.map((u) =>
        normalize.user(u, onlineIds.includes(u.id)),
      );
      const online = normalized
        .filter((u) => u.online)
        .sort((a, b) => a.displayName.localeCompare(b.displayName));
      const offline = normalized
        .filter((u) => !u.online)
        .sort((a, b) => a.displayName.localeCompare(b.displayName));
      return { online, offline };
    }
    return { online: [], offline: [] };
  }, [onlineIds, users]);

  useEffect(() => {
    if (user) setUsers(usrs.filter((u) => u.id !== user.id));
    else setUsers(usrs);
  }, [setUsers, user, usrs]);

  useEffect(() => {
    onPresence((output) => {
      setOnlineIds((prev) =>
        output.online
          ? [...prev, output.user.id]
          : prev.filter((id) => id !== output.user.id),
      );
      setUsers((prev) =>
        prev
          ? prev.some((u) => u.id === output.user.id)
            ? prev.map((u) =>
                u.id === output.user.id
                  ? normalize.user(output.user, output.online)
                  : u,
              )
            : [...prev, normalize.user(output.user, output.online)]
          : [normalize.user(output.user, output.online)],
      );
    });
  }, [onPresence, onlineIds, setUsers]);

  if (users)
    return (
      <ul
        className="overflow-scroll scrollbar-hidden flex flex-col gap-3"
        {...rest}
      >
        <Title users={online} title="Online" />
        {online.map((u) => (
          <Item key={u.id} user={u} />
        ))}
        {online.length > 0 ? <Separator /> : null}
        <Title users={offline} title="Offline" className="saturate-50" />
        {offline.map((u) => (
          <Item key={u.id} user={u} />
        ))}
      </ul>
    );
  return null;
};
