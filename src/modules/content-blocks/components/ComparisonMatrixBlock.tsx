import { StatusBadge } from '@/modules/design-system';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function ComparisonMatrixBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='Compare' title='Comparison matrix' description='This block supports fees, sectors, boarding choices, plans, or pathway comparisons.' tone='muted'>
      <div className='mb-5 grid gap-4 lg:grid-cols-3'>
        {page.actionPaths.map((path) => (
          <div key={path.label} className='rounded-lg border border-border bg-card p-5 shadow-1 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-3'>
            <StatusBadge tone={path.priority === 'Primary' ? 'brand' : 'muted'}>{path.priority}</StatusBadge>
            <h3 className='mt-3 text-lg font-semibold text-ink-900'>{path.label}</h3>
            <p className='mt-2 text-sm leading-6 text-foggy'>{path.description}</p>
          </div>
        ))}
      </div>
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
