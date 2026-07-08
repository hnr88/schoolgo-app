import { redirect } from '@/i18n/navigation';
import { PUBLIC_ONLY } from '@/lib/deliverable-config';
import { DashboardSidebar } from '@/modules/dashboard/components/DashboardSidebar';
import { DashboardHeader } from '@/modules/dashboard/components/DashboardHeader';
import { DashboardContent } from '@/modules/dashboard/components/DashboardContent';
import { ProtectedLayout } from '@/modules/auth/components/ProtectedLayout';
import { PORTAL_ALLOWED_ROLES } from '@/modules/auth/constants/auth.constants';
import { SchoolStaffGuard } from '@/modules/school-onboarding';

export default async function SchoolProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  if (PUBLIC_ONLY) {
    const { locale } = await params;
    redirect({ href: '/', locale });
  }

  return (
    <ProtectedLayout allowedRoles={Array.from(PORTAL_ALLOWED_ROLES.school)}>
      <div className='flex h-screen overflow-hidden bg-page-surface'>
        <DashboardSidebar />
        <div className='my-3 mr-3 flex flex-1 flex-col overflow-hidden rounded-3xl bg-card shadow-4'>
          <DashboardHeader />
          <main className='content-cards relative flex-1 overflow-y-auto'>
            <DashboardContent>
              <SchoolStaffGuard>{children}</SchoolStaffGuard>
            </DashboardContent>
          </main>
        </div>
      </div>
    </ProtectedLayout>
  );
}
