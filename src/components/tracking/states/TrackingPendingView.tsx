import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Bell, Check, Clock, Info } from 'lucide-react';
import { useState } from 'react';

export function TrackingPendingView() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <Card className='border-primary/20 bg-linear-to-b from-primary/5 to-card text-center'>
      <CardContent className='p-5 flex flex-col gap-4'>
        <div className='mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
          <Clock className='size-6 animate-pulse' />
        </div>
        <div>
          <h3 className='text-sm font-bold text-foreground'>
            Preparing Your Package
          </h3>
          <p className='mt-1 text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto'>
            Your order has been verified and is currently being packed and
            quality-checked at our fulfillment center.
          </p>
        </div>

        <div className='rounded-lg bg-muted/60 border border-border p-3 text-left'>
          <div className='flex items-start gap-2.5'>
            <Info className='size-4 text-muted-foreground shrink-0 mt-0.5' />
            <div className='text-xs text-muted-foreground flex flex-col gap-1'>
              <p className='font-semibold text-foreground'>
                When does tracking activate?
              </p>
              <p>
                Tracking numbers typically activate within{' '}
                <strong className='text-foreground'>
                  12 to 24 business hours
                </strong>{' '}
                once the courier scans the parcel into the distribution hub.
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Button
            onClick={() => setSubscribed(!subscribed)}
            variant={subscribed ? 'outline' : 'default'}
            className='w-full gap-2'
          >
            {subscribed ? (
              <>
                <Check className='size-4 text-emerald-600 dark:text-emerald-400' />
                Tracking Alerts Enabled (SMS & Push)
              </>
            ) : (
              <>
                <Bell className='size-4' />
                Notify Me as Soon as It Ships
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
