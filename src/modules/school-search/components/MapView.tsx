import { Plus, Minus, GraduationCap } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { MOCK_SCHOOLS } from '@/modules/school-search/constants/school.constants';

const MAP_PINS = MOCK_SCHOOLS.map((s) => ({
  id: s.id,
  label: s.name,
  top: s.state === 'VIC' ? '62%' : s.state === 'NSW' ? '52%' : '32%',
  left: s.state === 'VIC' ? '68%' : s.state === 'NSW' ? '82%' : '72%',
}));

export async function MapView() {
  const t = await getTranslations('SchoolSearch.map');

  return (
    <div className='w-full h-full bg-surface-container-low rounded-3xl relative overflow-hidden shadow-sm'>
      <div
        className='absolute inset-0 opacity-30'
        style={{
          backgroundImage:
            'linear-gradient(var(--outline-variant) 1px, transparent 1px), linear-gradient(90deg, var(--outline-variant) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden='true'
      />
      <div
        className='absolute inset-0 bg-surface-container-low/60'
        aria-hidden='true'
      />

      <div className='absolute top-6 left-6'>
        <span className='text-xs font-bold text-on-surface-variant uppercase tracking-widest'>
          {t('title')}
        </span>
      </div>

      {MAP_PINS.map((pin) => (
        <div
          key={pin.id}
          className='absolute group cursor-pointer -translate-x-1/2 -translate-y-1/2'
          style={{ top: pin.top, left: pin.left }}
        >
          <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-xl ring-4 ring-surface-container-lowest/50'>
            <GraduationCap className='w-5 h-5' aria-hidden='true' />
          </div>
          <div className='absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-surface-container-lowest px-3 py-1 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none'>
            <span className='text-caption font-bold text-on-surface'>{pin.label}</span>
          </div>
        </div>
      ))}

      <div className='absolute bottom-6 left-6 flex flex-col gap-2'>
        <button
          type='button'
          aria-label={t('zoomIn')}
          className='w-10 h-10 bg-surface-container-lowest rounded-xl shadow-lg flex items-center justify-center text-on-surface hover:text-primary transition-colors'
        >
          <Plus className='w-4 h-4' aria-hidden='true' />
        </button>
        <button
          type='button'
          aria-label={t('zoomOut')}
          className='w-10 h-10 bg-surface-container-lowest rounded-xl shadow-lg flex items-center justify-center text-on-surface hover:text-primary transition-colors'
        >
          <Minus className='w-4 h-4' aria-hidden='true' />
        </button>
      </div>
    </div>
  );
}
