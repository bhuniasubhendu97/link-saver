import { Link2 } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link2 className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-bold text-foreground font-headline">
        LinkWise
      </h1>
    </div>
  );
}
