import { Client } from './client';
import { createUserService } from '@/core/services';

type Props = {
  searchParams: Promise<{ code: string | undefined }>;
};

export default async function Page({ searchParams }: Props) {
  const { code } = await searchParams;
  const { authViaRandomUser, authViaGitHub } = createUserService();

  if (code) {
    const response = await authViaGitHub(code);
    return <Client user={response.data} />;
  }

  const response = await authViaRandomUser();
  return <Client user={response.data} />;
}
