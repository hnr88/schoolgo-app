import { Link } from '@/i18n/navigation';
import type { GuideWorkflowData } from '@/modules/guides/types/guides.types';

export function GuideWorkflow({
  title,
  subtitle,
  steps,
  footer,
}: GuideWorkflowData) {
  return (
    <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card">
      <div className="bg-ink-900 px-6 py-5">
        <h3 className="text-lg font-semibold text-background">{title}</h3>
        <p className="mt-1 text-sm text-background/70">{subtitle}</p>
      </div>
      <div className="grid gap-0 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {steps.map((step) => (
          <div key={step.title} className="p-6">
            <p className="mb-3 text-sm font-semibold text-ink-900">
              {step.title}
            </p>
            <ul className="space-y-2 text-sm text-hof">
              {step.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-muted px-6 py-5">
        <p className="text-sm text-hof">{footer.text}</p>
        <Link
          href={footer.buttonHref}
          className="inline-block rounded-md bg-ink-900 px-6 py-2.5 font-medium text-background transition hover:bg-ink-900/90"
        >
          {footer.buttonLabel}
        </Link>
      </div>
    </div>
  );
}
