import { clsx } from 'clsx';

export const Separator = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLHRElement>) => (
  <hr className={clsx('border-indigo-400/5', className)} {...rest} />
);
