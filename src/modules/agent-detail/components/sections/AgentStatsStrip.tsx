import { getTranslations } from 'next-intl/server';
import { SectionContainer } from '@/modules/design-system';
import type { AgentDetail } from '@/modules/agent-detail/types/agent-detail.types';

function compactNumber(value: number | null | undefined): string | null {
  if (value == null) return null;
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

interface StatCell {
  key: string;
  label: string;
  value: string;
  note?: string | null;
}

interface CellProps {
  label: string;
  value: string;
  note?: string | null;
}

function StatCellView({ label, value, note }: CellProps) {
  return (
    <div className="px-4 py-5 text-center md:px-6 md:py-6" aria-label={`${label}: ${value}`}>
      <p className="text-caption font-semibold uppercase text-foggy">{label}</p>
      <p className="mt-2 text-xl font-bold text-ink-900">{value}</p>
      {note ? <p className="mt-2 text-body-sm text-foggy">{note}</p> : null}
    </div>
  );
}

function buildCells(agent: AgentDetail, t: Awaited<ReturnType<typeof getTranslations>>): StatCell[] {
  const cells: StatCell[] = [];
  const metrics = agent.sections.successMetrics;
  const yearEstablished = agent.sections.legalIdentity?.yearEstablished ?? null;
  const responsiveness = agent.sections.responsiveness;

  if (yearEstablished != null) {
    const years = new Date().getUTCFullYear() - yearEstablished;
    cells.push({
      key: 'experience',
      label: t('experience'),
      value: years > 0 ? t('yearsValue', { years }) : t('establishedValue', { year: yearEstablished }),
      note: years > 0 ? t('sinceNote', { year: yearEstablished }) : null,
    });
  }
  const partnerCount =
    metrics?.partnerSchoolsCount ?? agent.sections.partnerSchools?.length ?? null;
  if (partnerCount != null && partnerCount > 0) {
    cells.push({
      key: 'partners',
      label: t('partnerSchools'),
      value: compactNumber(partnerCount) ?? '—',
    });
  }
  const placed = metrics?.studentsPlacedTotal ?? null;
  if (placed != null && placed > 0) {
    cells.push({
      key: 'placed',
      label: t('studentsPlaced'),
      value: compactNumber(placed) ?? '—',
      note: metrics?.studentsPlacedAsOfYear ? t('asOfNote', { year: metrics.studentsPlacedAsOfYear }) : null,
    });
  }
  const languages = agent.sections.spokenLanguages?.length ?? 0;
  if (languages > 0) {
    cells.push({
      key: 'languages',
      label: t('languages'),
      value: String(languages),
    });
  }
  if (responsiveness?.medianResponseTimeHours != null) {
    cells.push({
      key: 'response',
      label: t('responseTime'),
      value: t('responseHours', { hours: responsiveness.medianResponseTimeHours }),
      note: t('platformMeasured'),
    });
  }

  return cells;
}

export async function AgentStatsStrip({ agent }: { agent: AgentDetail }) {
  const t = await getTranslations('AgentDetail.stats');
  const cells = buildCells(agent, t);
  if (cells.length === 0) return null;

  return (
    <SectionContainer
      size="wide"
      className="relative z-10 -mt-[var(--space-12)] md:-mt-[var(--space-16)] lg:-mt-[var(--space-20)]"
    >
      <div className="grid grid-cols-2 divide-x divide-y divide-divider overflow-hidden rounded-lg border border-divider bg-card shadow-2 md:grid-cols-5 md:divide-y-0">
        {cells.map((cell) => (
          <StatCellView key={cell.key} label={cell.label} value={cell.value} note={cell.note} />
        ))}
      </div>
    </SectionContainer>
  );
}
