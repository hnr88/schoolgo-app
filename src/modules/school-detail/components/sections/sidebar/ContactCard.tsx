import { Mail, MapPin, Phone, User } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

interface ContactRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function ContactRow({ icon, label, value }: ContactRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-rausch-50 text-primary">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-caption text-foggy">{label}</p>
        <p className="break-words text-body-sm font-semibold text-ink-900">{value}</p>
      </div>
    </div>
  );
}

export async function ContactCard({ school }: { school: SchoolDetail }) {
  const t = await getTranslations('SchoolDetail.sidebar.contact');

  const addressParts = [school.suburb, school.state, school.postcode].filter(Boolean);
  const address = addressParts.length > 0 ? addressParts.join(', ') : null;

  return (
    <section aria-labelledby="contact-heading" className="rounded-lg border border-border bg-card p-6 shadow-1">
      <h2 id="contact-heading" className="text-xl font-semibold text-ink-900">{t('heading')}</h2>

      <div className="mt-4 space-y-3">
        {school.admissionsEmail && (
          <ContactRow
            icon={<Mail className="h-4 w-4" aria-hidden="true" />}
            label={t('emailLabel')}
            value={
              <a href={`mailto:${school.admissionsEmail}`} className="text-primary underline">
                {school.admissionsEmail}
              </a>
            }
          />
        )}

        {school.admissionsPhone && (
          <ContactRow
            icon={<Phone className="h-4 w-4" aria-hidden="true" />}
            label={t('phoneLabel')}
            value={
              <a href={`tel:${school.admissionsPhone}`} className="text-primary underline">
                {school.admissionsPhone}
              </a>
            }
          />
        )}

        {address && (
          <ContactRow
            icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
            label={t('addressLabel')}
            value={address}
          />
        )}

        <ContactRow
          icon={<User className="h-4 w-4" aria-hidden="true" />}
          label={t('principalRole')}
          value="—"
        />
      </div>
    </section>
  );
}
