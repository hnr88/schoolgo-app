import { Link } from '@/i18n/navigation';
import { SectionContainer } from '@/modules/design-system';
import type { GuideHeroData } from '@/modules/guides/types/guides.types';

export function GuideHero({
  breadcrumbLabel,
  title,
  subtitle,
  image,
  navItems,
}: GuideHeroData) {
  return (
    <>
      <nav
        className='border-b border-divider bg-muted pt-16 md:pt-24'
        aria-label='Breadcrumb'
      >
        <SectionContainer className='flex flex-wrap items-center gap-y-1 py-3 text-sm'>
          <Link href='/' className='text-foggy underline hover:text-ink-900'>
            Home
          </Link>
          <span className='mx-2 text-quill'>/</span>
          <Link href='/guides' className='text-foggy underline hover:text-ink-900'>
            Guides
          </Link>
          <span className='mx-2 text-quill'>/</span>
          <span className='text-foggy'>{breadcrumbLabel}</span>
        </SectionContainer>
      </nav>

      <section className='relative overflow-hidden border-b border-border bg-ink-900 py-16 md:py-24'>
        {image && (
          <>
            <div
              className='absolute inset-0 bg-cover bg-center opacity-25'
              style={{ backgroundImage: `url(${image})` }}
              aria-hidden='true'
            />
            <div
              className='absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/90 to-ink-900/60'
              aria-hidden='true'
            />
          </>
        )}
        <SectionContainer className='relative'>
          <h1 className='max-w-4xl font-display text-3xl font-bold leading-tight text-background md:text-5xl lg:text-6xl'>
            {title}
          </h1>
          <p className='mt-5 max-w-3xl text-lg leading-relaxed text-background/75 md:text-xl'>
            {subtitle}
          </p>
        </SectionContainer>
      </section>

      <nav className='sticky top-20 z-30 border-b border-border bg-background md:top-22'>
        <SectionContainer className='flex gap-0 overflow-x-auto'>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className='whitespace-nowrap border-b-2 border-transparent px-5 py-3.5 text-sm font-medium text-foggy transition hover:border-quill hover:text-hof first:border-ink-900 first:text-ink-900'
            >
              {item.label}
            </a>
          ))}
        </SectionContainer>
      </nav>
    </>
  );
}
