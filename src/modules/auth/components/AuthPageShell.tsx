import type { ReactNode } from 'react';
import Image from 'next/image';
import type { Portal } from '@/lib/portal-url';

interface AuthPageShellProps {
  portal: Portal;
  children: ReactNode;
}

const PORTAL_THEME: Record<
  Portal,
  {
    gradient: string;
    blob1: string;
    blob2: string;
    image: string;
    overlayGradient: string;
    panelBg: string;
    stats: Array<{ value: string; label: string }>;
  }
> = {
  parent: {
    gradient: 'bg-gradient-to-br from-rausch-50/70 via-white to-babu-50/20',
    blob1: 'bg-rausch-200',
    blob2: 'bg-babu-100',
    image: '/images/auth/parent.jpg',
    overlayGradient: 'from-rausch-500/20 to-rausch-600/30',
    panelBg: 'bg-rausch-50/40',
    stats: [
      { value: '2,400+', label: 'Schools' },
      { value: '7', label: 'Languages' },
      { value: '98%', label: 'Satisfaction' },
    ],
  },
  agent: {
    gradient: 'bg-gradient-to-br from-babu-50/70 via-white to-babu-50/20',
    blob1: 'bg-babu-200',
    blob2: 'bg-babu-100',
    image: '/images/auth/agent.jpg',
    overlayGradient: 'from-babu-600/20 to-babu-700/30',
    panelBg: 'bg-babu-50/40',
    stats: [
      { value: '850+', label: 'Agents' },
      { value: '15%', label: 'Commission' },
      { value: '24h', label: 'Response' },
    ],
  },
  school: {
    gradient: 'bg-gradient-to-br from-arches-50/70 via-white to-arches-50/20',
    blob1: 'bg-arches-200',
    blob2: 'bg-arches-100',
    image: '/images/auth/school.jpg',
    overlayGradient: 'from-arches-500/20 to-arches-600/30',
    panelBg: 'bg-arches-50/40',
    stats: [
      { value: '500+', label: 'Agents' },
      { value: '12k', label: 'Students' },
      { value: 'Free', label: 'Listing' },
    ],
  },
};

export function AuthPageShell({ portal, children }: AuthPageShellProps) {
  const theme = PORTAL_THEME[portal];

  return (
    <main className='flex min-h-screen bg-muted/50 lg:p-8'>
      <div
        className={`flex min-h-0 w-full flex-col overflow-hidden lg:flex-row lg:rounded-4xl lg:shadow-xl ${theme.gradient}`}
      >
        <div className='relative flex w-full flex-col justify-center px-6 py-12 lg:w-[45%] lg:px-16 xl:px-24'>
          <div className='pointer-events-none absolute inset-0 overflow-hidden' aria-hidden='true'>
            <svg className='absolute inset-0 h-full w-full opacity-[0.04]'>
              <defs>
                <pattern id='auth-grid' width='20' height='20' patternUnits='userSpaceOnUse'>
                  <circle cx='10' cy='10' r='0.6' fill='currentColor' />
                </pattern>
              </defs>
              <rect width='100%' height='100%' fill='url(#auth-grid)' />
            </svg>
          </div>
          <div className='relative mx-auto w-full max-w-md'>{children}</div>
        </div>

        <div className='hidden lg:flex lg:w-[55%] lg:p-12'>
          <div className='relative min-h-[600px] w-full overflow-hidden rounded-2xl shadow-2xl'>
            <Image
              src={theme.image}
              alt=''
              fill
              className='object-cover'
              priority
              sizes='55vw'
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${theme.overlayGradient} mix-blend-multiply`}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
            <div className='absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/30 to-transparent' />

            <div className='absolute bottom-8 left-8 right-8'>
              <div className='flex gap-4'>
                {theme.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className='rounded-2xl bg-white/15 px-5 py-3.5 backdrop-blur-md'
                  >
                    <p className='text-2xl font-bold text-white'>{stat.value}</p>
                    <p className='text-sm text-white/70'>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
