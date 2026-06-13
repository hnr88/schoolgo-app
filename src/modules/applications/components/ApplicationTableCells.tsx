import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

function initialsOf(first?: string | null, last?: string | null): string {
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
}

/** Student avatar chip (initials) — imagery-forward table/list cell (§3.6). */
export function ApplicationAvatar({
  firstName,
  lastName,
  className,
}: {
  firstName?: string | null;
  lastName?: string | null;
  className?: string;
}) {
  return (
    <span
      aria-hidden='true'
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-full bg-babu-50 text-xs font-semibold text-babu-700',
        className,
      )}
    >
      {initialsOf(firstName, lastName) || '—'}
    </span>
  );
}

/** School logo placeholder chip — imagery-forward school cell (§3.6). */
export function ApplicationLogo({ name, className }: { name?: string | null; className?: string }) {
  const letter = name?.trim()?.[0]?.toUpperCase();
  return (
    <span
      aria-hidden='true'
      className={cn(
        'flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-50 text-xs font-semibold text-foggy',
        className,
      )}
    >
      {letter ?? <Building2 className='size-4 stroke-[1.75]' />}
    </span>
  );
}
