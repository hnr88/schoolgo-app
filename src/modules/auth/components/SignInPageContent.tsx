import { SignInCard } from '@/modules/auth/components/SignInCard';

export function SignInPageContent() {
  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16'>
      <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
        <div className='absolute inset-0 bg-gradient-to-br from-rausch-50/50 via-babu-50/20 to-arches-50/40' />
        <div className='absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full bg-rausch-200 opacity-25 blur-[160px]' />
        <div className='absolute -right-32 top-1/3 h-[500px] w-[500px] rounded-full bg-babu-200 opacity-20 blur-[140px]' />
        <div className='absolute -bottom-20 left-1/3 h-[400px] w-[400px] rounded-full bg-arches-200 opacity-25 blur-[120px]' />
        <svg className='absolute inset-0 h-full w-full opacity-[0.06]'>
          <defs>
            <pattern
              id='signin-grid'
              width='40'
              height='40'
              patternUnits='userSpaceOnUse'
              patternTransform='rotate(15)'
            >
              <circle cx='1' cy='1' r='1' fill='currentColor' />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#signin-grid)' />
        </svg>
      </div>
      <div className='relative'>
        <SignInCard />
      </div>
    </main>
  );
}
