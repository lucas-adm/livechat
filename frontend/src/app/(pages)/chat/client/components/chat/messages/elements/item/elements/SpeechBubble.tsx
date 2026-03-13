import { clsx } from 'clsx';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  isAuthor: boolean;
};

export const SpeechBubble = ({ isAuthor, ...rest }: Props) => (
  <div
    className={clsx(
      'relative w-fit p-2 rounded-xl flex flex-col gap-2',
      isAuthor
        ? 'bg-indigo-800 rounded-tr-none'
        : 'bg-indigo-800/50 rounded-tl-none',
    )}
    {...rest}
  />
);
