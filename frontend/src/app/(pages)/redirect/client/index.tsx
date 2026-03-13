'use client';

import { normalize } from '@/utils';
import { useEffect } from 'react';
import { User } from '@/core/models';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks';

export const Client = ({ user }: { user: User }) => {
  const { setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    setUser(normalize.user(user, true));
    router.push('/chat');
  }, [router, setUser, user]);

  return (
    <div
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 -translate-1/2"
    >
      <span aria-hidden="true" className="animated-dots" />
      <span aria-hidden="true" className="animated-dots" />
      <span aria-hidden="true" className="animated-dots" />
    </div>
  );
};
