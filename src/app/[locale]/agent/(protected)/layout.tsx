import { DashboardSidebar } from '@/modules/dashboard/components/DashboardSidebar';
import { DashboardHeader } from '@/modules/dashboard/components/DashboardHeader';
import { ProtectedLayout } from '@/modules/auth/components/ProtectedLayout';
import { PORTAL_ALLOWED_ROLES } from '@/modules/auth/constants/auth.constants';

export default function AgentProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout allowedRoles={Array.from(PORTAL_ALLOWED_ROLES.agent)}>
      <div className='flex h-screen overflow-hidden'>
        <DashboardSidebar />
        <div className='flex flex-1 flex-col overflow-hidden'>
          <DashboardHeader />
          <main className='relative flex-1 overflow-y-auto bg-muted'>
            <div className='px-6 py-8'>{children}</div>
          </main>
        </div>
      </div>
    </ProtectedLayout>
  );
}
