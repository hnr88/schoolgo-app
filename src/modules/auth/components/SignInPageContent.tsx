import type { Portal } from '@/lib/portal-url';
import { AuthPageShell } from '@/modules/auth/components/AuthPageShell';
import { SignInCard } from '@/modules/auth/components/SignInCard';

interface SignInPageContentProps {
  portal: Portal;
}

export function SignInPageContent({ portal }: SignInPageContentProps) {
  return (
    <AuthPageShell portal={portal}>
      <SignInCard portal={portal} />
    </AuthPageShell>
  );
}
