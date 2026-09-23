import { ReportMissingModal } from '@/components/tracking/modals/ReportMissingModal';
import { SupportModal } from '@/components/tracking/modals/SupportModal';
import { OrderSummary } from '@/components/tracking/OrderSummary';
import { ScenarioSwitcher } from '@/components/tracking/ScenarioSwitcher';
import { DelayedBanner } from '@/components/tracking/states/DelayedBanner';
import { DeliveredDisputeBanner } from '@/components/tracking/states/DeliveredDisputeBanner';
import { TrackingPendingView } from '@/components/tracking/states/TrackingPendingView';
import { TrackingTimeline } from '@/components/tracking/TrackingTimeline';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrderTracking } from '@/hooks/useOrderTracking';
import type { ScenarioType } from '@/types/order';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Headphones,
  Share2,
  Truck,
} from 'lucide-react';
import { useState } from 'react';

export default function App() {
  const [currentScenario, setCurrentScenario] =
    useState<ScenarioType>('standard');
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isReportMissingOpen, setIsReportMissingOpen] = useState(false);

  const {
    data: order,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useOrderTracking(currentScenario);

  return (
    <div className='min-h-screen bg-muted/40 text-foreground pb-12 antialiased'>
      {/* 1. Interactive Evaluator Switcher Bar */}
      <ScenarioSwitcher
        currentScenario={currentScenario}
        onScenarioChange={setCurrentScenario}
        onRefresh={() => refetch()}
        isFetching={isFetching}
      />

      {/* 2. Responsive Mobile Frame (360px - 430px) */}
      <main className='mx-auto mt-4 w-full max-w-105 px-3.5 sm:px-0'>
        <div className='overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xl'>
          {/* Header Bar */}
          <div className='flex items-center justify-between border-b border-border px-4 py-3.5'>
            <button
              type='button'
              className='rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer'
              aria-label='Back'
            >
              <ArrowLeft className='size-5' />
            </button>
            <h1 className='text-sm font-bold tracking-tight text-foreground'>
              Track Package
            </h1>
            <div className='flex items-center gap-1'>
              <button
                type='button'
                onClick={() => setIsSupportOpen(true)}
                className='rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer'
                aria-label='Support'
              >
                <Headphones className='size-4' />
              </button>
              <button
                type='button'
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Tracking link copied to clipboard!');
                }}
                className='rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer'
                aria-label='Share'
              >
                <Share2 className='size-4' />
              </button>
            </div>
          </div>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className='p-5 flex flex-col gap-4'>
              <Skeleton className='h-24 w-full rounded-xl' />
              <Skeleton className='h-44 w-full rounded-xl' />
              <Skeleton className='h-32 w-full rounded-xl' />
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className='p-8 text-center flex flex-col items-center gap-3'>
              <div className='flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive'>
                <AlertCircle className='size-6' />
              </div>
              <h3 className='text-sm font-bold text-foreground'>
                Couldn’t Load Order Details
              </h3>
              <p className='text-xs text-muted-foreground'>
                Please check your connection and retry.
              </p>
              <Button onClick={() => refetch()} size='sm' className='mt-2'>
                Try Again
              </Button>
            </div>
          )}

          {/* Active Screen */}
          {order && (
            <div className='p-4 flex flex-col gap-4'>
              {/* Primary Summary Card */}
              <div className='rounded-2xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4 text-white shadow-md'>
                <div className='flex items-center justify-between'>
                  <span className='inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-md'>
                    {order.status === 'DELAYED' ? (
                      <Clock className='size-3 text-amber-400' />
                    ) : order.status === 'DELIVERED' ? (
                      <CheckCircle2 className='size-3 text-emerald-400' />
                    ) : (
                      <Truck className='size-3 text-blue-400' />
                    )}
                    {order.carrier?.name || 'Carrier Processing'}
                  </span>
                  <span className='text-[11px] text-slate-400 font-mono'>
                    #{order.orderId}
                  </span>
                </div>

                <div className='mt-3'>
                  <h2 className='text-lg font-bold tracking-tight text-white'>
                    {order.statusHeadline}
                  </h2>
                  <p className='mt-0.5 text-xs text-slate-300 leading-normal'>
                    {order.statusDescription}
                  </p>
                </div>

                {order.estimatedDelivery && (
                  <div className='mt-4 rounded-xl bg-white/10 p-3 flex items-center justify-between'>
                    <div>
                      <span className='text-[10px] uppercase font-semibold text-slate-400 tracking-wider'>
                        {order.status === 'DELIVERED'
                          ? 'Delivery Completed'
                          : 'Estimated Arrival'}
                      </span>
                      <p className='text-sm font-bold text-white'>
                        {order.estimatedDelivery.date}
                      </p>
                    </div>
                    <span className='text-xs font-medium text-slate-300'>
                      {order.estimatedDelivery.timeWindow}
                    </span>
                  </div>
                )}
              </div>

              {/* State 1: Delayed Order */}
              {currentScenario === 'delayed' && (
                <DelayedBanner
                  originalDate={order.estimatedDelivery?.originalDate}
                  onContactSupport={() => setIsSupportOpen(true)}
                />
              )}

              {/* State 2: Delivered but Not Received */}
              {currentScenario === 'delivered_not_received' && (
                <DeliveredDisputeBanner
                  order={order}
                  onOpenReportModal={() => setIsReportMissingOpen(true)}
                />
              )}

              {/* State 3: Tracking Not Available Yet OR Visual Progress Timeline */}
              {currentScenario === 'tracking_pending' ? (
                <TrackingPendingView />
              ) : (
                <div className='rounded-xl border border-border bg-card p-4 shadow-xs'>
                  <h3 className='text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3'>
                    Delivery Progress
                  </h3>
                  <TrackingTimeline
                    milestones={order.timeline}
                    isDelayed={order.status === 'DELAYED'}
                  />
                </div>
              )}

              {/* Order Item & Totals Summary */}
              <OrderSummary order={order} />

              {/* Support Trigger Button */}
              <div className='pt-1'>
                <Button
                  variant='outline'
                  onClick={() => setIsSupportOpen(true)}
                  className='w-full py-5 text-xs font-semibold gap-2 border-border shadow-xs'
                >
                  <Headphones className='size-4 text-primary' />
                  Need help with this delivery? Contact Support
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Support Dialog */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        orderId={order?.orderId || 'VEC-ORDER'}
      />

      {/* Missing Package Claim Dialog */}
      <ReportMissingModal
        isOpen={isReportMissingOpen}
        onClose={() => setIsReportMissingOpen(false)}
        orderId={order?.orderId || 'VEC-ORDER'}
      />
    </div>
  );
}
