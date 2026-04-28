import { DashboardSidebar } from '@/modules/dashboard/components/DashboardSidebar';
import { DashboardHeader } from '@/modules/dashboard/components/DashboardHeader';
import { ProtectedLayout } from '@/modules/auth/components/ProtectedLayout';

export default function ParentProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout>
      <div className='flex h-screen overflow-hidden'>
        <DashboardSidebar />
        <div className='flex flex-1 flex-col overflow-hidden'>
          <DashboardHeader />
          <main className='relative flex-1 overflow-y-auto bg-muted'>
            <div className='mx-auto max-w-7xl px-6 py-8'>{children}</div>
          </main>
        </div>
      </div>
    </ProtectedLayout>
  );
}
