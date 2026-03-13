import { clsx } from 'clsx';

type Props = React.HTMLAttributes<HTMLParagraphElement> & {
  typing: string[] | null;
};

export const Typing = ({ typing, ...rest }: Props) => {
  if (typing)
    return (
      <p
        className={clsx(
          'select-none pointer-events-none',
          'absolute -top-6 left-4',
          'text-xs text-indigo-300',
          'flex-1',
          'transition-opacity ease-linear',
          typing.length > 0 ? 'opacity-100' : 'opacity-0',
        )}
        {...rest}
      >
        {typing.length > 0
          ? typing.length === 1
            ? `${typing[0]} está digitando...`
            : `Estão digitando...`
          : null}
      </p>
    );

  return null;
};
