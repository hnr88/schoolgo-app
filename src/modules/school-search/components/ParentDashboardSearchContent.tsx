import { FilterSidebar } from '@/modules/school-search/components/FilterSidebar';
import { FilterChips } from '@/modules/school-search/components/FilterChips';
import { MapView } from '@/modules/school-search/components/MapView';
import { SchoolResultsPanel } from '@/modules/school-search/components/SchoolResultsPanel';
import { CompareBar } from '@/modules/school-search/components/CompareBar';
import { ParentSearchContextBar } from '@/modules/dashboard';

export async function ParentDashboardSearchContent() {
  return (
    <div className='absolute inset-0 flex flex-col overflow-hidden'>
      <ParentSearchContextBar className='shrink-0' />

      <div className='relative flex min-h-0 flex-1 gap-4 overflow-hidden p-4'>
        <FilterSidebar
          className='static block h-full w-80 p-0 lg:sticky lg:top-0 lg:h-full lg:p-0'
          cardClassName='shadow-1'
        />

        <div className='relative min-w-0 flex-1 overflow-hidden rounded-lg'>
          <MapView className='rounded-none border-0 shadow-none' activePortal='parent' />

          <div className='absolute left-2 right-80 top-1 z-10 p-2'>
            <FilterChips className='overflow-visible pb-0' />
          </div>

          <SchoolResultsPanel activePortal='parent' variant='parent' />
        </div>
      </div>

      <CompareBar comparePath='/parent/compare' className='absolute inset-x-0 bottom-0 z-30' />
    </div>
  );
}
