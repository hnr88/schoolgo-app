import { DashboardSidebar } from '@/modules/dashboard/components/DashboardSidebar';
import { ProtectedLayout } from '@/modules/auth/components/ProtectedLayout';

export default function AgentProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout>
      <div className='flex h-screen overflow-hidden'>
        <DashboardSidebar />
        <main className='flex-1 overflow-y-auto bg-background'>
          <div className='mx-auto max-w-7xl px-6 py-8'>{children}</div>
        </main>
      </div>
    </ProtectedLayout>
  );
}
