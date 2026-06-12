import { getTranslations } from 'next-intl/server';
import { Briefcase } from 'lucide-react';
import { Eyebrow } from '@/modules/design-system';
import { groupServicesByCategory } from '@/modules/agent-detail/lib/group-services';
import {
  SERVICE_CATEGORY_FALLBACK_ICON,
  SERVICE_CATEGORY_ICONS,
  isServiceCategory,
} from '@/modules/agent-detail/constants/services.constants';
import type { AgentService } from '@/modules/agent-detail/types/agent-detail.types';

interface ServicesSectionProps {
  services?: AgentService[];
}

export async function ServicesSection({ services }: ServicesSectionProps) {
  const groups = Array.isArray(services) ? groupServicesByCategory(services) : [];
  if (groups.length === 0) return null;

  const t = await getTranslations('AgentDetail.services');

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="services-heading" className="mt-2 flex items-center gap-2 text-2xl font-bold text-ink-900 md:text-3xl">
        <Briefcase className="h-6 w-6 text-primary" aria-hidden="true" />
        {t('heading')}
      </h2>
      <p className="mt-2 text-body-sm text-foggy">{t('subheading')}</p>

      <div className="mt-6 flex flex-col gap-8">
        {groups.map((group) => {
          const Icon = isServiceCategory(group.category)
            ? SERVICE_CATEGORY_ICONS[group.category]
            : SERVICE_CATEGORY_FALLBACK_ICON;
          const categoryLabel = isServiceCategory(group.category)
            ? t(`category.${group.category}`)
            : t('category.other');

          return (
            <div key={group.category}>
              <h3 className="flex items-center gap-2 text-body font-semibold text-ink-900">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                {categoryLabel}
              </h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {group.services.map((service, i) => (
                  <li
                    key={`${service.serviceName}-${i}`}
                    className="rounded-lg border border-divider bg-card p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-body-sm font-semibold text-ink-900">{service.serviceName}</p>
                      {service.isFree ? (
                        <span className="shrink-0 rounded-pill bg-babu-50 px-2 py-0.5 text-caption font-semibold text-babu-700">
                          {t('free')}
                        </span>
                      ) : null}
                    </div>
                    {service.description ? (
                      <p className="mt-1 text-body-sm text-foggy">{service.description}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
