'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactAgentDialog } from '@/modules/agent-inquiry';
import type { AgentContactContext } from '@/modules/agent-detail/types/agent-detail.types';

interface ContactAgentCardProps {
  context: AgentContactContext;
}

export function ContactAgentCard({ context }: ContactAgentCardProps) {
  const t = useTranslations('AgentDetail.contact');

  return (
    <section
      aria-labelledby="agent-contact-heading"
      className="rounded-lg bg-card p-5 shadow-2"
    >
      <h2 id="agent-contact-heading" className="text-xl font-semibold text-ink-900">
        {t('heading')}
      </h2>
      <p className="mt-3 text-body-sm text-foggy">
        {t('description', { name: context.agentName })}
      </p>
      {context.schoolName ? (
        <p className="mt-2 text-caption text-foggy">
          {t('aboutSchool', { school: context.schoolName })}
        </p>
      ) : null}

      <ContactAgentDialog
        agentDocumentId={context.agentDocumentId}
        schoolDocumentId={context.schoolDocumentId ?? undefined}
        trigger={
          <Button
            type="button"
            size="lg"
            className="mt-5 w-full"
            data-agent-document-id={context.agentDocumentId}
            data-agent-slug={context.agentSlug ?? undefined}
            data-school-document-id={context.schoolDocumentId ?? undefined}
          >
            <MessageSquare aria-hidden="true" />
            {t('cta')}
          </Button>
        }
      />
    </section>
  );
}
