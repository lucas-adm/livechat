import { Avatar } from '@/components';
import { Info, Options, Status } from './elements';
import { Separator } from '../../utils';
import { User } from '@/core/models';

type Props = React.HTMLAttributes<HTMLElement> & {
  user: User | null;
};

export const Header = ({ user, ...rest }: Props) => {
  if (user)
    return (
      <>
        <header
          className="relative w-full p-2 rounded-xl flex flex-col items-center gap-3"
          {...rest}
        >
          <Options hidden />
          <Avatar
            size={72}
            src={user.avatar}
            useStatus
            isOnline={user.online}
          />

          <Info name={user.displayName} bio={user.bio} />
          <Status />
        </header>
        <Separator />
      </>
    );

  return null;
};
