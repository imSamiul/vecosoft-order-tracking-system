import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, ArrowRight, Gift } from 'lucide-react';

interface DelayedBannerProps {
  originalDate?: string;
  onContactSupport: () => void;
}

export function DelayedBanner({
  originalDate,
  onContactSupport,
}: DelayedBannerProps) {
  return (
    <Card className='border-amber-200 bg-amber-50/80 dark:border-amber-900/60 dark:bg-amber-950/30'>
      <CardContent className='p-4'>
        <div className='flex items-start gap-3'>
          <div className='rounded-full bg-amber-100 p-2 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400 shrink-0'>
            <AlertCircle className='size-5' />
          </div>
          <div className='flex-1'>
            <div className='flex items-center gap-1.5'>
              <Badge variant='warning'>Transit Delay</Badge>
              {originalDate && (
                <span className='text-xs text-amber-800 line-through opacity-75 dark:text-amber-300'>
                  {originalDate}
                </span>
              )}
            </div>
            <h4 className='mt-1 text-sm font-semibold text-amber-950 dark:text-amber-200'>
              Shipment Rescheduled
            </h4>
            <p className='mt-1 text-xs text-amber-800 leading-normal dark:text-amber-300/90'>
              Due to regional hub congestion, your delivery window has been
              adjusted. We are tracking this order closely.
            </p>

            <div className='mt-3 flex items-center gap-2 rounded-lg bg-card/80 p-2.5 border border-amber-200/60 dark:border-amber-900/40'>
              <Gift className='size-4 text-emerald-600 dark:text-emerald-400 shrink-0' />
              <p className='text-xs font-medium text-foreground'>
                <strong className='text-emerald-700 dark:text-emerald-400 font-semibold'>
                  $5 Courtesy Credit
                </strong>{' '}
                added to your account for the delay.
              </p>
            </div>

            <div className='mt-3 flex items-center gap-2'>
              <Button
                size='sm'
                onClick={onContactSupport}
                className='bg-amber-900 text-white hover:bg-amber-950 dark:bg-amber-600 dark:hover:bg-amber-700'
              >
                Expedite Inquiry
                <ArrowRight className='ml-1.5 size-3.5' />
              </Button>
              <span className='text-[11px] text-amber-800/80 dark:text-amber-400/80'>
                Support replies in ~2m
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
