import { Logo } from './logo';

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-card">
      <div className="container mx-auto">
        <Logo />
      </div>
    </header>
  );
}
