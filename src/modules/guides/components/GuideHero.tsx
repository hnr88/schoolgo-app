import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { SectionContainer } from '@/modules/design-system';
import { GuideSectionNav } from '@/modules/guides/components/GuideSectionNav';
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
      <Breadcrumb>
        <nav
          aria-label='Breadcrumb'
          className='border-b border-divider bg-muted pt-16 md:pt-24'
        >
          <SectionContainer className='py-3'>
            <BreadcrumbList className='text-sm text-foggy'>
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={<Link href='/' />}
                  className='text-hof underline hover:text-ink-900'
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className='text-quill' />

              <BreadcrumbItem>
                <BreadcrumbLink
                  render={<Link href='/guides' />}
                  className='text-hof underline hover:text-ink-900'
                >
                  Guides
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className='text-quill' />

              <BreadcrumbItem>
                <BreadcrumbPage className='text-hof'>
                  {breadcrumbLabel}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </SectionContainer>
        </nav>
      </Breadcrumb>

      <section className='relative overflow-hidden border-b border-border bg-ink-900 py-16 md:py-24'>
        {image && (
          <>
            <div className='absolute inset-0' aria-hidden='true'>
              <Image
                src={image}
                alt=''
                fill
                priority
                sizes='100vw'
                className='object-cover object-center opacity-25'
              />
            </div>
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

      <GuideSectionNav navItems={navItems} />
    </>
  );
}
