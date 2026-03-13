import { IconDotsVertical } from '@tabler/icons-react';

type Props = React.HTMLAttributes<HTMLElement> & {
  size?: number;
};

export const Options = ({ size = 18, ...rest }: Props) => (
  <button
    className="cursor-pointer absolute top-0 right-0 w-fit p-1 rounded-full transition-colors hover:bg-neutral-200"
    {...rest}
  >
    <IconDotsVertical size={size} />
  </button>
);
