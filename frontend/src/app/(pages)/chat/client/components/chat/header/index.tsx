import { Photo, Title } from './elements';

export const Header = () => (
  <header className="p-2 flex items-center gap-3">
    <Photo alt="" src="/hero.png" size={64} />
    <Title>chat dos campeões</Title>
  </header>
);
