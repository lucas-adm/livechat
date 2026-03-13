import { forwardRef } from 'react';

export const UnreadsSeparator = forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>((props, ref) => (
  <li
    ref={ref}
    className="mx-auto font-medium text-xs text-indigo-300"
    {...props}
  />
));

UnreadsSeparator.displayName = 'UnreadsSeparator';
