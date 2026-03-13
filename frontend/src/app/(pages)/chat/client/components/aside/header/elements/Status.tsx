export const Status = (props: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    aria-hidden="true"
    className="px-2 py-1 rounded tracking-wider text-xs text-indigo-300 bg-indigo-100/5"
    {...props}
  >
    online
  </span>
);
