import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Eyebrow, SectionContainer } from '@/modules/design-system';

const LANGS: Array<{ code: string; key: string }> = [
  { code: 'en', key: 'en' },
  { code: 'zh', key: 'zh' },
  { code: 'vi', key: 'vi' },
  { code: 'ko', key: 'ko' },
  { code: 'ms', key: 'ms' },
  { code: 'th', key: 'th' },
  { code: 'id', key: 'id' },
];

export async function ParentsSevenLanguages() {
  const t = await getTranslations('ParentsSevenLanguages');
  return (
    <section className='bg-ink-900 py-20 text-background md:py-28'>
      <SectionContainer className='flex flex-col items-center gap-10 text-center'>
        <div className='flex max-w-3xl flex-col gap-3'>
          <Eyebrow
            className='self-center'
            tone='default'
          >
            <span className='text-background/70'>{t('eyebrow')}</span>
          </Eyebrow>
          <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-background md:text-5xl'>
            {t('heading')}
          </h2>
          <p className='text-body text-background/75 md:text-lg'>{t('subheading')}</p>
        </div>

        <ul className='flex flex-wrap items-center justify-center gap-3'>
          {LANGS.map((lang) => (
            <li
              key={lang.code}
              className='inline-flex items-center gap-2 rounded-pill border border-background/15 bg-background/5 px-4 py-2 text-body-sm font-medium text-background'
            >
              <Image
                src={`/ds/flags/${lang.code}.svg`}
                alt=''
                width={20}
                height={14}
                className='h-3.5 w-5 rounded-sm'
                aria-hidden='true'
              />
              {t(`languages.${lang.key}`)}
            </li>
          ))}
        </ul>
      </SectionContainer>
    </section>
  );
}
