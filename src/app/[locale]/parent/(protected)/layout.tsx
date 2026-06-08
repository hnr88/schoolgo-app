import { DashboardSidebar } from '@/modules/dashboard/components/DashboardSidebar';
import { DashboardHeader } from '@/modules/dashboard/components/DashboardHeader';
import { DashboardContent } from '@/modules/dashboard/components/DashboardContent';
import { ProtectedLayout } from '@/modules/auth/components/ProtectedLayout';
import { PORTAL_ALLOWED_ROLES } from '@/modules/auth/constants/auth.constants';
import { ParentOnboardingGate } from '@/modules/parent-onboarding';

export default function ParentProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout allowedRoles={Array.from(PORTAL_ALLOWED_ROLES.parent)}>
      <ParentOnboardingGate>
        <div className='flex h-screen overflow-hidden bg-page-surface'>
          <DashboardSidebar />
          <div className='my-3 mr-3 flex flex-1 flex-col overflow-hidden rounded-3xl bg-card shadow-4'>
            <DashboardHeader />
            <main tabIndex={0} className='content-cards relative flex-1 overflow-y-auto outline-none'>
              <DashboardContent>{children}</DashboardContent>
            </main>
          </div>
        </div>
      </ParentOnboardingGate>
    </ProtectedLayout>
  );
}
