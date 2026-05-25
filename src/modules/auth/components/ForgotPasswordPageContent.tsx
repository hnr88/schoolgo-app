import { AuthPageShell } from '@/modules/auth/components/AuthPageShell';
import { ForgotPasswordCard } from '@/modules/auth/components/ForgotPasswordCard';
import type { Portal } from '@/lib/portal-url';

interface ForgotPasswordPageContentProps {
  portal: Portal;
}

export function ForgotPasswordPageContent({ portal }: ForgotPasswordPageContentProps) {
  return (
    <AuthPageShell portal={portal}>
      <ForgotPasswordCard portal={portal} />
    </AuthPageShell>
  );
}
