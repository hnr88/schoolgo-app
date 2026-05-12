import { SpecFilterSidebar } from '@/modules/school-search/components/SpecFilterSidebar';
import { SpecResultsPanel } from '@/modules/school-search/components/SpecResultsPanel';

export async function DashboardSearchContent() {
  return (
    <div className='absolute inset-0 flex gap-4 overflow-hidden p-4'>
      <SpecFilterSidebar activePortal='agent' />

      <section className='flex min-w-0 flex-1 flex-col gap-4 overflow-hidden'>
        <SpecResultsPanel />
      </section>
    </div>
  );
}
