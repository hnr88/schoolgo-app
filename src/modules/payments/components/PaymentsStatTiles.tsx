import { getTranslations } from 'next-intl/server';
import { StatTile } from '@/modules/core';
import { PAYMENT_STAT_TILES } from '@/modules/payments/constants/payments.constants';
import { formatAud } from '@/modules/payments/lib/format-payments';

export async function PaymentsStatTiles() {
  const t = await getTranslations('ParentPayments');

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      {PAYMENT_STAT_TILES.map((tile) => (
        <StatTile
          key={tile.key}
          icon={tile.icon}
          label={t(tile.labelKey)}
          value={tile.format === 'aud' ? formatAud(tile.value) : String(tile.value)}
          subMetric={t(tile.subKey)}
        />
      ))}
    </div>
  );
}
