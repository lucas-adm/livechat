import { formatTime } from '@/utils';
import { Message } from '@/core/models';

type Props = React.HTMLAttributes<HTMLParagraphElement> & {
  msg: Message;
};

export const Time = ({ msg, ...rest }: Props) => (
  <p className="text-2xs text-indigo-400" {...rest}>
    {msg.text.updated && msg.text.updatedAt
      ? `${formatTime(msg.text.createdAt)} (Editada ${formatTime(msg.text.updatedAt)})`
      : formatTime(msg.text.createdAt)}
  </p>
);
