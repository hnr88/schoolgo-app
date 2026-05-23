import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import '@/app/globals.css';

export default function RootNotFound() {
  return (
    <html lang='en'>
      <body>
        <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6'>
          <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
            <div className='absolute inset-0 bg-gradient-to-br from-babu-50/40 via-background to-rausch-50/20' />
            <div className='absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-babu-200 opacity-20 blur-[160px]' />
            <div className='absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-rausch-100 opacity-25 blur-[140px]' />
          </div>

          <div className='relative flex max-w-lg flex-col items-center text-center'>
            <Link href='/' className='mb-10' aria-label='SchoolGo home'>
              <Image
                src='/logos/logo-red.png'
                alt='SchoolGo'
                width={160}
                height={36}
                className='h-9 w-auto'
              />
            </Link>

            <p className='mb-4 font-display text-8xl font-bold tracking-tight text-babu-500/20 sm:text-9xl'>
              404
            </p>

            <h1 className='font-display text-3xl font-bold text-ink-900 sm:text-4xl'>
              Page not found
            </h1>
            <p className='mt-3 text-base leading-relaxed text-foggy'>
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            <div className='mt-10 flex flex-col gap-3 sm:flex-row'>
              <Link
                href='/'
                className='inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-on-primary shadow-brand hover:bg-rausch-600'
              >
                Go home
              </Link>
              <Link
                href='/search'
                className='inline-flex items-center justify-center rounded-xl border border-border bg-card px-8 py-3 text-sm font-semibold text-hof hover:bg-muted'
              >
                <Search className='mr-2 h-4 w-4' />
                Search schools
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
