import { Icon } from '@/components/page';
import { IconBrandGithub, IconSpy } from '@tabler/icons-react';

export default function Page() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 flex gap-6">
      <Icon
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`}
        icon={IconBrandGithub}
      />
      <Icon href="/redirect" icon={IconSpy} />
    </div>
  );
}
