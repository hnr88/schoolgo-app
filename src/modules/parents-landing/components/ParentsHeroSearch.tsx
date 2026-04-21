'use client';

import { Search } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';

interface ParentsHeroSearchProps {
  ariaLabel: string;
  buttonLabel: string;
  fields: {
    where: { label: string; value: string };
    yearLevel: { label: string; value: string };
    fees: { label: string; value: string };
  };
}

export function ParentsHeroSearch({
  ariaLabel,
  buttonLabel,
  fields,
}: ParentsHeroSearchProps) {
  const router = useRouter();
  const order = ['where', 'yearLevel', 'fees'] as const;

  function go() {
    router.push('/search');
  }

  return (
    <div
      role='search'
      aria-label={ariaLabel}
      className='group flex w-full max-w-3xl items-center gap-1 rounded-pill border border-border bg-card p-1.5 shadow-2 transition-shadow focus-within:shadow-3 hover:shadow-3'
    >
      {order.map((key, index) => (
        <div key={key} className='flex flex-1 items-center gap-1'>
          <button
            type='button'
            onClick={go}
            className={`flex flex-1 flex-col items-start justify-center px-5 py-3 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none ${index === 0 ? 'rounded-l-4xl rounded-r-md' : index === order.length - 1 ? 'rounded-l-md rounded-r-4xl' : 'rounded-md'}`}
          >
            <span className='text-sm font-semibold text-ink-900'>
              {fields[key].label}
            </span>
            <span className='truncate text-sm text-foggy'>{fields[key].value}</span>
          </button>
          {index < order.length - 1 && (
            <span className='h-8 w-px shrink-0 bg-divider' aria-hidden='true' />
          )}
        </div>
      ))}
      <button
        type='button'
        aria-label={buttonLabel}
        onClick={go}
        className='mr-2.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-brand transition-colors hover:bg-rausch-600 active:bg-rausch-700'
      >
        <Search className='h-5 w-5' strokeWidth={2} aria-hidden='true' />
      </button>
    </div>
  );
}
