import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { OrderTrackingData } from '@/types/order';
import { Camera, ChevronRight, PackageX, ShieldAlert } from 'lucide-react';

interface DeliveredDisputeBannerProps {
  order: OrderTrackingData;
  onOpenReportModal: () => void;
}

export function DeliveredDisputeBanner({
  order,
  onOpenReportModal,
}: DeliveredDisputeBannerProps) {
  return (
    <div className='flex flex-col gap-3'>
      {order.deliveryProof && (
        <Card>
          <CardContent className='p-3.5 flex flex-col gap-2'>
            <div className='flex items-center justify-between text-xs text-muted-foreground'>
              <span className='flex items-center gap-1.5 font-medium text-foreground'>
                <Camera className='size-3.5 text-primary' />
                Courier Photo on File
              </span>
              <span>{order.deliveryProof.deliveredAt}</span>
            </div>

            <div className='relative h-36 w-full overflow-hidden rounded-lg bg-muted'>
              <img
                src={order.deliveryProof.photoUrl}
                alt='Proof of delivery'
                className='h-full w-full object-cover'
              />
              <div className='absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white'>
                Location: {order.deliveryProof.dropoffLocation}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className='border-destructive/30 bg-destructive/10'>
        <CardContent className='p-4'>
          <div className='flex items-start gap-3'>
            <div className='rounded-full bg-destructive/20 p-2 text-destructive shrink-0'>
              <PackageX className='size-5' />
            </div>
            <div className='flex-1'>
              <h4 className='text-sm font-semibold text-destructive'>
                Can’t find your package?
              </h4>
              <p className='mt-1 text-xs text-destructive/90 leading-normal'>
                Check around side entrances or with neighbors. If it is still
                missing, we will instantly replace or refund it under Purchase
                Protection.
              </p>

              <Button
                variant='destructive'
                size='default'
                onClick={onOpenReportModal}
                className='mt-3 w-full justify-between'
              >
                <span className='flex items-center gap-1.5'>
                  <ShieldAlert className='size-3.5' />
                  Report Missing Package
                </span>
                <ChevronRight className='size-4' />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
