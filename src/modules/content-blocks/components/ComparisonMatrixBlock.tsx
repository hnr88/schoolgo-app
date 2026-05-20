import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function ComparisonMatrixBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='Compare' title='Comparison matrix' description='This block supports fees, sectors, boarding choices, plans, or pathway comparisons.' tone='muted'>
      <div className='overflow-x-auto rounded-lg border border-border bg-card shadow-1'>
        <table className='w-full min-w-full text-sm'>
          <thead className='bg-muted text-left text-ink-900'>
            <tr>
              <th className='border-b border-border px-5 py-4 font-semibold'>Area</th>
              <th className='border-b border-border px-5 py-4 font-semibold'>Option A</th>
              <th className='border-b border-border px-5 py-4 font-semibold'>Option B</th>
              <th className='border-b border-border px-5 py-4 font-semibold'>Option C</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-divider'>
            {page.comparison.map((row) => (
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
    </BlockShell>
  );
}
