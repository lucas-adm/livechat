import { clsx } from 'clsx';
import { IconCheck, IconCircleDotted, IconEraser } from '@tabler/icons-react';
import { Message } from '@/core/models';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  msg: Message;
};

export const Status = ({ msg, ...rest }: Props) => {
  if (msg.text.deleted) return null;

  if (msg.text.status === 'sending')
    return (
      <span {...rest}>
        <figure className="text-indigo-700">
          <IconCircleDotted size={18} />
        </figure>
      </span>
    );

  if (msg.text.status === 'sent')
    return (
      <span {...rest}>
        <figure
          className={clsx(
            msg.text.read ? 'text-indigo-400' : 'text-indigo-700',
          )}
        >
          <IconCheck size={18} />
        </figure>
      </span>
    );

  if (msg.text.status === 'deleting')
    return (
      <span {...rest}>
        <figure className="text-indigo-700">
          <IconEraser size={18} />
        </figure>
      </span>
    );

  return null;
};
