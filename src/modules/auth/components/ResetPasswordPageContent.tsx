import { AuthPageShell } from '@/modules/auth/components/AuthPageShell';
import { ResetPasswordCard } from '@/modules/auth/components/ResetPasswordCard';
import type { Portal } from '@/lib/portal-url';

interface ResetPasswordPageContentProps {
  portal: Portal;
  code: string;
}

export function ResetPasswordPageContent({ portal, code }: ResetPasswordPageContentProps) {
  return (
    <AuthPageShell portal={portal}>
      <ResetPasswordCard portal={portal} code={code} />
    </AuthPageShell>
  );
}
