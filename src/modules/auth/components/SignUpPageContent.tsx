import { AuthPageShell } from '@/modules/auth/components/AuthPageShell';
import { SignUpCard } from '@/modules/auth/components/SignUpCard';
import type { SignUpPageContentProps } from '@/modules/auth/types/component.types';

export function SignUpPageContent({ portal }: SignUpPageContentProps) {
  return (
    <AuthPageShell portal={portal}>
      <SignUpCard portal={portal} />
    </AuthPageShell>
  );
}
