'use client';

import { useTranslations } from 'next-intl';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { TrainingLesson } from '@/modules/agent-training/types/agent-training.types';

export function LessonsList({ lessons }: { lessons: TrainingLesson[] }) {
  const t = useTranslations('AgentTraining');

  if (lessons.length === 0) {
    return <p className='text-sm text-foggy'>{t('noLessons')}</p>;
  }

  return (
    <Accordion className='w-full'>
      {lessons.map((lesson, index) => (
        <AccordionItem key={lesson.documentId} value={lesson.documentId}>
          <AccordionTrigger className='text-sm font-semibold text-ink-900'>
            <span className='flex items-center gap-2'>
              <span className='text-foggy tabular-nums'>{index + 1}.</span>
              {lesson.title}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            {lesson.content ? (
              <p className='whitespace-pre-wrap text-sm text-foggy'>{lesson.content}</p>
            ) : (
              <p className='text-sm text-muted-foreground'>{t('noLessonContent')}</p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
