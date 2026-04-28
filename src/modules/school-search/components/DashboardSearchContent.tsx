import { FilterSidebar } from '@/modules/school-search/components/FilterSidebar';
import { FilterChips } from '@/modules/school-search/components/FilterChips';
import { MapView } from '@/modules/school-search/components/MapView';
import { SchoolResultsPanel } from '@/modules/school-search/components/SchoolResultsPanel';

export async function DashboardSearchContent() {
  return (
    <div className='absolute inset-0 flex gap-4 overflow-hidden p-4'>
      <FilterSidebar
        className='static block h-full w-[20rem] p-0 lg:sticky lg:top-0 lg:h-full lg:p-0'
        cardClassName='shadow-1'
      />

      <div className='relative min-w-0 flex-1 overflow-hidden rounded-xl'>
        <MapView className='rounded-none border-0 shadow-none' />

        <div className='absolute left-2 right-80 top-1 z-10 p-2'>
          <FilterChips className='overflow-visible pb-0' />
        </div>

        <SchoolResultsPanel />
      </div>
    </div>
  );
}
