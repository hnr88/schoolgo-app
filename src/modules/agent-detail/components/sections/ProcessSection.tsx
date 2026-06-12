import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/modules/design-system';
import { byOrder } from '@/modules/agent-detail/lib/agent-detail-sections';
import type { ProcessStep } from '@/modules/agent-detail/types/agent-detail.types';

function byStepNumber(a: ProcessStep, b: ProcessStep): number {
  const left = a.stepNumber ?? Number.POSITIVE_INFINITY;
  const right = b.stepNumber ?? Number.POSITIVE_INFINITY;
  if (left !== right) return left - right;
  return byOrder(a, b);
}

export async function ProcessSection({ steps }: { steps?: ProcessStep[] | null }) {
  const items = (steps ?? []).filter((s) => s.title || s.description).sort(byStepNumber);
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.process');

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="process-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>

      <ol className="mt-6 space-y-4">
        {items.map((step, i) => (
          <li key={i} className="flex items-start gap-4 rounded-lg border border-divider bg-muted p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-babu-500 text-body-sm font-bold text-on-primary">
              {step.stepNumber ?? i + 1}
            </span>
            <div className="min-w-0">
              {step.title ? <p className="text-body-sm font-semibold text-ink-900">{step.title}</p> : null}
              {step.description ? (
                <p className="mt-1 text-body-sm leading-relaxed text-foggy">{step.description}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
