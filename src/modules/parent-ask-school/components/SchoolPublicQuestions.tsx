'use client';

import { useTranslations } from 'next-intl';
import { MessageCircleQuestion } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PUBLIC_ONLY } from '@/lib/deliverable-config';
import { Button } from '@/components/ui/button';
import { EmptyState, ErrorState } from '@/modules/core';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { usePublicSchoolQuestions } from '@/modules/parent-ask-school/queries/use-public-school-questions.query';
import { AskAboutSchoolDialog } from '@/modules/parent-ask-school/components/AskAboutSchoolDialog';
import { PublicQuestionCard } from '@/modules/parent-ask-school/components/PublicQuestionCard';
import { QuestionsSkeleton } from '@/modules/parent-ask-school/components/QuestionsSkeleton';

interface SchoolPublicQuestionsProps {
  schoolDocumentId: string;
}

export function SchoolPublicQuestions({ schoolDocumentId }: SchoolPublicQuestionsProps) {
  const t = useTranslations('AskSchool');
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data, isLoading, isError, refetch } = usePublicSchoolQuestions(schoolDocumentId);

  // Public-only deliverable: asking a school is account-bound (no anonymous
  // session), so render no ask CTA and no sign-in link at all.
  const askSlot = PUBLIC_ONLY ? null : isAuthenticated ? (
    <AskAboutSchoolDialog schoolDocumentId={schoolDocumentId} />
  ) : (
    <Button type="button" className="gap-2" render={<Link href="/sign-in" />}>
      <MessageCircleQuestion className="size-4" strokeWidth={1.75} aria-hidden="true" />
      {t('askCta')}
    </Button>
  );

  return (
    <div className="flex flex-col gap-4">
      {askSlot && <div className="flex justify-end">{askSlot}</div>}

      {isLoading ? (
        <QuestionsSkeleton />
      ) : isError ? (
        <ErrorState message={t('errorMessage')} onRetry={() => refetch()} retryLabel={t('retry')} />
      ) : !data || data.length === 0 ? (
        <EmptyState
          icon={MessageCircleQuestion}
          title={t('publicEmptyTitle')}
          description={t('publicEmptySubtitle')}
          action={askSlot ?? undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {data.map((question) => (
            <PublicQuestionCard key={question.documentId} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}
