import { clsx } from 'clsx';
import { Message } from '@/core/models';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  editing: Message | null;
};

export const Blur = ({ editing, ...rest }: Props) => (
  <div
    className={clsx(
      'pointer-events-none select-none z-1',
      'absolute inset-0',
      'transition-all duration-333 ease-linear',
      editing ? 'backdrop-blur-xs' : 'backdrop-blur-none',
    )}
    {...rest}
  />
);
