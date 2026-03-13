import { clsx } from 'clsx';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  isAuthor: boolean;
};

export const SpeechBubbleTail = ({ isAuthor, ...rest }: Props) => (
  <div
    aria-hidden="true"
    className={clsx(
      'absolute top-0 w-0 h-0',
      isAuthor
        ? 'border-indigo-800 -right-2 border-t-8 border-r-8 border-r-transparent'
        : 'border-indigo-800/50 -left-2 border-t-8 border-l-8 border-l-transparent',
    )}
    {...rest}
  />
);
