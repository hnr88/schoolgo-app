import type { Portal } from '@/lib/portal-url';
import { AuthPageShell } from '@/modules/auth/components/AuthPageShell';
import { SignUpCard } from '@/modules/auth/components/SignUpCard';

interface SignUpPageContentProps {
  portal: Portal;
}

export function SignUpPageContent({ portal }: SignUpPageContentProps) {
  return (
    <AuthPageShell portal={portal}>
      <SignUpCard portal={portal} />
    </AuthPageShell>
  );
}
