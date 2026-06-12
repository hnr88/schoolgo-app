'use client';

import { useTranslations } from 'next-intl';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AGENT_VISIBILITY_SECTIONS } from '@/modules/agent-profile/constants/agent-builder.constants';
import type { AgentVisibilityPanelProps } from '@/modules/agent-profile/types/agent-profile.types';

/**
 * Per-section visibility toggle panel — one switch per public section, writing
 * the `sectionVisibility` json the public profile reads to decide which sections
 * render. A section is hidden unless its toggle is on (absent/false = hidden).
 * Controlled: emits the single toggled key the builder merges and persists.
 * Custom sections are excluded here — they carry their own per-item `isVisible`.
 */
export function VisibilityPanel({ visibility, onChange, disabled }: AgentVisibilityPanelProps) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-1'>
        <h3 className='text-base font-semibold text-foreground'>{t('visibilityTitle')}</h3>
        <p className='text-sm text-muted-foreground'>{t('visibilityIntro')}</p>
      </div>

      <ul className='flex flex-col divide-y divide-border'>
        {AGENT_VISIBILITY_SECTIONS.map(({ key, labelKey }) => {
          const id = `visibility-${key}`;
          return (
            <li key={key} className='flex items-center justify-between gap-4 py-3'>
              <Label htmlFor={id} className='text-sm font-normal text-foreground'>
                {t(labelKey)}
              </Label>
              <Switch
                id={id}
                checked={visibility[key] ?? false}
                disabled={disabled}
                onCheckedChange={(checked) => onChange({ [key]: checked })}
                aria-label={t(labelKey)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
