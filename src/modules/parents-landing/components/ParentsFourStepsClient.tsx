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
    <div className='grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-16'>
      <div className='flex flex-col gap-6 lg:gap-8'>
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
                    'flex w-full gap-3 rounded-xl p-3 text-left transition-colors lg:gap-5 lg:rounded-2xl lg:p-5',
                    isActive ? 'bg-muted' : 'hover:bg-muted/50',
                  )}
                >
                  <div className='flex shrink-0 flex-col items-center gap-2'>
                    <span
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-full transition-colors lg:h-11 lg:w-11',
                        isActive ? 'bg-primary text-on-primary' : 'bg-rausch-50 text-primary',
                      )}
                    >
                      <Icon className='h-4 w-4 lg:h-5 lg:w-5' strokeWidth={1.75} aria-hidden='true' />
                    </span>
                    {index < steps.length - 1 && (
                      <span className='h-full w-px bg-divider' aria-hidden='true' />
                    )}
                  </div>
                  <div className='flex flex-col gap-1 pt-0.5 lg:gap-1.5 lg:pt-1'>
                    <span className='text-xs font-semibold uppercase tracking-widest text-primary'>
                      {step.stepLabel}
                    </span>
                    <h3 className='flex flex-wrap items-center gap-2 text-base font-semibold text-ink-900 lg:text-lg'>
                      {step.title}
                      {step.comingSoon && (
                        <span className='inline-flex items-center rounded-pill border border-primary/20 bg-rausch-50 px-2 py-0.5 text-xs font-semibold text-primary'>
                          {step.comingSoon}
                        </span>
                      )}
                    </h3>
                    <p
                      className={cn(
                        'max-w-md text-sm leading-relaxed transition-colors',
                        isActive ? 'text-foggy' : 'text-foggy/70',
                        isActive ? 'block' : 'hidden lg:block',
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

        <div className='flex flex-col gap-3 lg:flex-row lg:pl-5'>
          <a
            href={ctaBrowseHref}
            className='flex items-center justify-center gap-2 rounded-pill bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-brand transition-colors hover:bg-rausch-600 active:bg-rausch-700 lg:px-6 lg:py-3'
          >
            {ctaBrowseLabel}
            <span aria-hidden='true'>→</span>
          </a>
          <a
            href={ctaLearnHref}
            className='flex items-center justify-center rounded-pill border border-border bg-card px-5 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-muted lg:px-6 lg:py-3'
          >
            {ctaLearnLabel}
          </a>
        </div>
      </div>

      <div className='relative order-first mx-auto w-full max-w-sm lg:order-none lg:sticky lg:top-24 lg:max-w-lg'>
        <div className='relative aspect-4-3 overflow-hidden rounded-xl border border-border bg-muted shadow-3 lg:aspect-3-4 lg:rounded-2xl'>
          <Image
            key={active}
            src={STEP_IMAGES[active]}
            alt=''
            fill
            sizes='(max-width: 1024px) 100vw, 480px'
            className='object-cover'
            aria-hidden='true'
          />
          <div className='absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-lg border border-border bg-card/95 p-3 shadow-2 backdrop-blur-sm lg:inset-x-5 lg:bottom-5 lg:rounded-xl lg:p-4'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-babu-50 text-babu-700 lg:h-10 lg:w-10'>
              <BadgeCheck className='h-4 w-4 lg:h-5 lg:w-5' strokeWidth={2} aria-hidden='true' />
            </div>
            <div className='flex flex-col'>
              <span className='text-xs font-semibold text-ink-900 lg:text-sm'>
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
