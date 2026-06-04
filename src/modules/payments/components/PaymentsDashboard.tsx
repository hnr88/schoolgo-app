import { PaymentsHeader } from '@/modules/payments/components/PaymentsHeader';
import { PaymentsPreviewNotice } from '@/modules/payments/components/PaymentsPreviewNotice';
import { PaymentsStatTiles } from '@/modules/payments/components/PaymentsStatTiles';
import { EarningOverviewCard } from '@/modules/payments/components/EarningOverviewCard';
import { SpendBreakdownCard } from '@/modules/payments/components/SpendBreakdownCard';
import { PaymentsTransactionsCard } from '@/modules/payments/components/PaymentsTransactionsCard';
import { BalanceTrendCard } from '@/modules/payments/components/BalanceTrendCard';
import { PaymentsPromoCard } from '@/modules/payments/components/PaymentsPromoCard';

export function PaymentsDashboard() {
  return (
    <div className='flex flex-col gap-8'>
      <PaymentsHeader />
      <PaymentsPreviewNotice />
      <PaymentsStatTiles />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <EarningOverviewCard />
        </div>
        <div className='lg:col-span-1'>
          <SpendBreakdownCard />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <PaymentsTransactionsCard />
        </div>
        <div className='lg:col-span-1'>
          <BalanceTrendCard />
        </div>
      </div>

      <PaymentsPromoCard />
    </div>
  );
}
