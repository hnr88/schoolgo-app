import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader } from '@/modules/design-system';

const LANGS: Array<{ code: string; key: string }> = [
  { code: 'en', key: 'en' },
  { code: 'zh', key: 'zh' },
  { code: 'ko', key: 'ko' },
  { code: 'ms', key: 'ms' },
  { code: 'vi', key: 'vi' },
  { code: 'th', key: 'th' },
  { code: 'id', key: 'id' },
];

export async function ParentsSevenLanguages() {
  const t = await getTranslations('ParentsSevenLanguages');
  return (
    <section className='bg-ink-900 py-20 text-background md:py-28'>
      <SectionContainer className='flex flex-col items-center gap-10 text-center'>
        <SectionHeader
          align='center'
          theme='dark'
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <ul className='flex flex-wrap items-center justify-center gap-3'>
          {LANGS.map((lang) => (
            <li
              key={lang.code}
              className='inline-flex items-center gap-2 rounded-pill border border-background/15 bg-background/5 px-4 py-2 text-body-sm font-medium text-background'
            >
              <Image
                src={`/flags/${lang.code}.svg`}
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
