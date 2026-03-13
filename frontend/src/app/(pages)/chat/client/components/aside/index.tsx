import { clsx } from 'clsx';
import { Header } from './header';
import { List } from './users';
import { User } from '@/core/models';
import { useRef, useState } from 'react';

type Props = React.HTMLAttributes<HTMLElement> & {
  user: User | null;
  users: User[];
  onlineUsers: User['id'][];
};

export const Aside = ({ user, users, onlineUsers, ...rest }: Props) => {
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragDirection, setDragDirection] = useState<
    'horizontal' | 'vertical' | null
  >(null);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    setIsDragging(false);
    setDragDirection(null);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null || startY.current === null) return;
    const diffX = e.touches[0].clientX - startX.current;
    const diffY = e.touches[0].clientY - startY.current;
    if (dragDirection === null) {
      if (Math.abs(diffX) < 5 && Math.abs(diffY) < 5) return;
      const direction =
        Math.abs(diffX) > Math.abs(diffY) ? 'horizontal' : 'vertical';
      setDragDirection(direction);
      if (direction === 'horizontal') setIsDragging(true);
      return;
    }
    if (dragDirection === 'vertical') return;
    if (!open && diffX > 0) setDragOffset(Math.min(diffX, window.innerWidth));
    else if (open && diffX < 0) setDragOffset(diffX);
  };

  const onTouchEnd = () => {
    if (dragDirection === 'horizontal') {
      if (startX.current === null) return;
      const screenWidth = window.innerWidth;
      let finalPosition: number;
      if (open) finalPosition = screenWidth + dragOffset;
      else finalPosition = dragOffset;
      const shouldOpen = open
        ? finalPosition > screenWidth * 0.75
        : finalPosition > screenWidth * 0.25;
      setOpen(shouldOpen);
    }
    setIsDragging(false);
    setDragOffset(0);
    setDragDirection(null);
    startX.current = null;
    startY.current = null;
  };

  const getTransform = () => {
    if (!isDragging) return undefined;
    if (open) return `translateX(${dragOffset}px)`;
    else return `translateX(calc(-100% + ${dragOffset}px))`;
  };

  return (
    <>
      {open ? null : (
        <div
          aria-hidden="true"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="insm:z-1 insm:fixed insm:left-0 insm:top-0 insm:h-full insm:w-1/2"
        />
      )}
      <aside
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ transform: getTransform() }}
        className={clsx(
          'insm:fixed insm:top-0 insm:left-0 insm:w-full insm:h-full insm:z-3',
          isDragging ? null : 'insm:transition-transform insm:duration-300',
          isDragging
            ? null
            : open
              ? 'insm:translate-x-0'
              : 'insm:-translate-x-full',
          'w-66 h-full p-3 border-r border-indigo-400/5',
          'flex-none flex flex-col gap-3',
          'bg-black/10 insm:bg-indigo-900',
        )}
        {...rest}
      >
        <Header user={user} />
        <List users={users} onlineUsers={onlineUsers} />
      </aside>
    </>
  );
};
