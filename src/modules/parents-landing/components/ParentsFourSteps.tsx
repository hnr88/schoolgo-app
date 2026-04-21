import { getTranslations } from 'next-intl/server';
import { loadSchools, computeSchoolStats } from '@/lib/schools';
import { SectionContainer } from '@/modules/design-system';
import { ParentsFourStepsClient } from '@/modules/parents-landing/components/ParentsFourStepsClient';

const STEP_KEYS = ['browse', 'shortlist', 'prepare', 'apply'] as const;

export async function ParentsFourSteps() {
  const t = await getTranslations('ParentsFourSteps');
  const tc = await getTranslations('Common');
  const schools = await loadSchools();
  const stats = computeSchoolStats(schools);

  const steps = STEP_KEYS.map((key, index) => ({
    key,
    stepLabel: tc('step', { number: index + 1 }),
    title: t(`steps.${key}.title`),
    description: t(
      `steps.${key}.description`,
      key === 'browse' ? { count: stats.totalSchools } : undefined,
    ),
    comingSoon: key === 'apply' ? t('steps.apply.comingSoon') : undefined,
    visual: {
      title: t(`visuals.${key}.title`),
      subtitle: t(`visuals.${key}.subtitle`),
    },
  }));

  return (
    <section className='py-20 md:py-28'>
      <SectionContainer>
        <div className='mb-10 flex flex-col gap-3'>
          <span className='text-xs font-semibold uppercase tracking-widest text-primary'>
            {t('eyebrow')}
          </span>
          <h2 className='max-w-lg font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 md:text-5xl'>
            {t('heading')}
          </h2>
          <p className='max-w-md text-base text-foggy'>
            {t('subheading')}
          </p>
        </div>

        <ParentsFourStepsClient
          steps={steps}
          ctaBrowseLabel={t('ctaBrowse')}
          ctaLearnLabel={t('ctaLearn')}
          ctaBrowseHref='/search'
          ctaLearnHref='#how-it-works'
          badgeTitle={t('badge.cricosVerified')}
          badgeSubtitle={t('badge.updated')}
        />
      </SectionContainer>
    </section>
  );
}
