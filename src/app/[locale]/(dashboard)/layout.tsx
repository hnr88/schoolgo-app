import { DashboardSidebar } from '@/modules/dashboard/components/DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen overflow-hidden'>
      <DashboardSidebar />
      <main className='flex-1 overflow-y-auto bg-background'>
        <div className='mx-auto max-w-7xl px-6 py-8'>{children}</div>
      </main>
    </div>
  );
}
