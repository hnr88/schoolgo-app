'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { PORTAL_NAV } from '../constants/ui.constants';
import { SidebarNavLinks } from './SidebarNavLinks';

export function DashboardMobileNav() {
  const t = useTranslations('Dashboard');
  const userType = useAuthStore((s) => s.userType);
  const [open, setOpen] = useState(false);

  const portal = userType ?? 'agent';
  const { home } = PORTAL_NAV[portal];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className='flex size-11 shrink-0 items-center justify-center rounded-xl text-ink-900 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 lg:hidden'
        aria-label={t('openMenu')}
      >
        <Menu className='h-6 w-6' strokeWidth={1.5} />
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Popup
          data-slot='mobile-nav'
          className='fixed inset-y-0 left-0 z-50 flex w-72 max-w-full flex-col bg-card shadow-3 outline-none duration-150 data-open:animate-in data-open:slide-in-from-left data-closed:animate-out data-closed:slide-out-to-left'
        >
          <DialogTitle className='sr-only'>{t('navTitle')}</DialogTitle>
          <div className='flex h-16 items-center px-5'>
            <Link href={home} onClick={() => setOpen(false)} className='flex shrink-0 items-center'>
              <Image
                src='/logos/logo-red.png'
                alt='SchoolGo'
                width={140}
                height={30}
                className='h-10 w-auto'
              />
            </Link>
          </div>
          <SidebarNavLinks onNavigate={() => setOpen(false)} />
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
