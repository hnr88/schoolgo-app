'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ParentsFourStepsClientProps } from '@/modules/parents-landing/types/parents-landing.types';
import { ICONS, STEP_IMAGES } from '../constants/four-steps.constants';

export function ParentsFourStepsClient({
  steps,
  ctaBrowseLabel,
  ctaLearnLabel,
  ctaBrowseHref,
  ctaLearnHref,
}: ParentsFourStepsClientProps) {
  const [active, setActive] = useState(0);
  const activeStep = steps[active];

  return (
    <div className='grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16'>
      <div className='flex flex-col gap-8'>
        <ol className='flex flex-col gap-1'>
          {steps.map((step, index) => {
            const Icon = ICONS[index];
            const isActive = index === active;
            return (
              <li key={step.key}>
                <button
                  type='button'
                  onClick={() => setActive(index)}
                  className={cn(
                    'flex w-full gap-5 rounded-2xl p-5 text-left transition-colors',
                    isActive ? 'bg-muted' : 'hover:bg-muted/50',
                  )}
                >
                  <div className='flex shrink-0 flex-col items-center gap-2'>
                    <span
                      className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-full transition-colors',
                        isActive ? 'bg-primary text-on-primary' : 'bg-rausch-50 text-primary',
                      )}
                    >
                      <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
                    </span>
                    {index < steps.length - 1 && (
                      <span className='h-full w-px bg-divider' aria-hidden='true' />
                    )}
                  </div>
                  <div className='flex flex-col gap-1.5 pt-1'>
                    <span className='text-xs font-semibold uppercase tracking-widest text-primary'>
                      {step.stepLabel}
                    </span>
                    <h3 className='flex flex-wrap items-center gap-2 text-lg font-semibold text-ink-900'>
                      {step.title}
                      {step.comingSoon && (
                        <span className='inline-flex items-center rounded-pill border border-primary/20 bg-rausch-50 px-2.5 py-0.5 text-xs font-semibold text-primary'>
                          {step.comingSoon}
                        </span>
                      )}
                    </h3>
                    <p
                      className={cn(
                        'max-w-md text-sm leading-relaxed transition-colors',
                        isActive ? 'text-foggy' : 'text-foggy/70',
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>

        <div className='flex flex-wrap gap-3 pl-5'>
          <a
            href={ctaBrowseHref}
            className='inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-brand transition-colors hover:bg-rausch-600 active:bg-rausch-700'
          >
            {ctaBrowseLabel}
            <span aria-hidden='true'>→</span>
          </a>
          <a
            href={ctaLearnHref}
            className='inline-flex items-center rounded-pill border border-border bg-card px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-muted'
          >
            {ctaLearnLabel}
          </a>
        </div>
      </div>

      <div className='relative mx-auto w-full max-w-lg lg:sticky lg:top-24'>
        <div className='relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-muted shadow-3'>
          <Image
            key={active}
            src={STEP_IMAGES[active]}
            alt=''
            fill
            sizes='(max-width: 1024px) 100vw, 480px'
            className='object-cover'
            aria-hidden='true'
          />
          <div className='absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-xl border border-border bg-card/95 p-4 shadow-2 backdrop-blur-sm'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-babu-50 text-babu-700'>
              <BadgeCheck className='h-5 w-5' strokeWidth={2} aria-hidden='true' />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-semibold text-ink-900'>
                {activeStep.visual.title}
              </span>
              <span className='text-xs text-foggy'>{activeStep.visual.subtitle}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
