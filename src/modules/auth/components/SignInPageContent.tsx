import { AuthPageShell } from '@/modules/auth/components/AuthPageShell';
import { SignInCard } from '@/modules/auth/components/SignInCard';
import type { SignInPageContentProps } from '@/modules/auth/types/component.types';

export function SignInPageContent({ portal }: SignInPageContentProps) {
  return (
    <AuthPageShell portal={portal}>
      <SignInCard portal={portal} />
    </AuthPageShell>
  );
}
