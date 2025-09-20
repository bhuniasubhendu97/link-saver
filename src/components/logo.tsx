import { Link2 } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-primary rounded-lg">
        <Link2 className="h-6 w-6 text-primary-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground font-heading tracking-tight">
        LinkWise
      </h1>
    </div>
  );
}
