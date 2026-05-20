import { SectionContainer, SectionHeader } from '@/modules/design-system';
import type { ContentComparisonTableProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentComparisonTable({ rows }: ContentComparisonTableProps) {
  return (
    <section id='compare' className='bg-muted py-16 md:py-24'>
      <SectionContainer>
        <SectionHeader
          eyebrow='Compare'
          heading='A reusable comparison block'
          subheading='This block can explain school sectors, fee options, boarding choices, pathway differences, or partner plans.'
        />
        <div className='mt-8 overflow-x-auto rounded-lg border border-border bg-card shadow-1'>
          <table className='w-full min-w-full text-sm'>
            <thead className='bg-muted text-left text-ink-900'>
              <tr>
                <th className='border-b border-border px-5 py-4 font-semibold'>Decision area</th>
                <th className='border-b border-border px-5 py-4 font-semibold'>Option A</th>
                <th className='border-b border-border px-5 py-4 font-semibold'>Option B</th>
                <th className='border-b border-border px-5 py-4 font-semibold'>Option C</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-divider'>
              {rows.map((row) => (
                <tr key={row.label} className='hover:bg-muted'>
                  <td className='px-5 py-4 font-semibold text-ink-900'>{row.label}</td>
                  <td className='px-5 py-4 text-hof'>{row.primary}</td>
                  <td className='px-5 py-4 text-hof'>{row.secondary}</td>
                  <td className='px-5 py-4 text-hof'>{row.tertiary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionContainer>
    </section>
  );
}
