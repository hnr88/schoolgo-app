'use client';

import { useTranslations } from 'next-intl';
import { ThumbsUp, ThumbsDown, Heart, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SHORTLIST_REACTIONS } from '@/modules/parent-shortlist/constants/shortlist.constants';
import type { ShortlistReaction } from '@/modules/parent-shortlist/types/shortlist.types';

const REACTION_ICONS: Record<ShortlistReaction, typeof ThumbsUp> = {
  up: ThumbsUp,
  down: ThumbsDown,
  love: Heart,
  neutral: Minus,
};

interface ReactionPickerProps {
  value: ShortlistReaction | undefined;
  onChange: (value: ShortlistReaction | undefined) => void;
}

export function ReactionPicker({ value, onChange }: ReactionPickerProps) {
  const t = useTranslations('ParentShortlist');

  return (
    <div className='flex flex-wrap gap-2'>
      {SHORTLIST_REACTIONS.map((reaction) => {
        const Icon = REACTION_ICONS[reaction];
        const isActive = value === reaction;
        return (
          <button
            key={reaction}
            type='button'
            aria-pressed={isActive}
            aria-label={t(`reaction_${reaction}`)}
            onClick={() => onChange(isActive ? undefined : reaction)}
            className={cn(
              'flex items-center gap-1.5 rounded-pill border px-3 py-2 text-xs font-medium transition-colors ease-out-quart',
              isActive
                ? 'border-primary bg-rausch-50 text-primary-strong'
                : 'border-divider bg-card text-foggy hover:bg-muted',
            )}
          >
            <Icon className='h-3.5 w-3.5' aria-hidden='true' />
            {t(`reaction_${reaction}`)}
          </button>
        );
      })}
    </div>
  );
}
