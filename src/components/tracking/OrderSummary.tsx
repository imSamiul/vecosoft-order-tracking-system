import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { OrderTrackingData } from '@/types/order';
import { Check, ChevronDown, ChevronUp, Copy, MapPin } from 'lucide-react';
import { useState } from 'react';

interface OrderSummaryProps {
  order: OrderTrackingData;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyTracking = () => {
    if (!order.trackingNumber) return;
    navigator.clipboard.writeText(order.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardContent className='flex flex-col gap-4 p-4'>
        <div className='flex items-center justify-between pb-3 border-b border-border'>
          <div>
            <span className='text-[10px] font-semibold uppercase tracking-wider text-muted-foreground'>
              Order ID
            </span>
            <p className='text-xs font-bold text-foreground'>
              #{order.orderId}
            </p>
          </div>

          {order.trackingNumber ? (
            <div className='text-right'>
              <span className='text-[10px] font-semibold uppercase tracking-wider text-muted-foreground'>
                Tracking #
              </span>
              <button
                type='button'
                onClick={copyTracking}
                className='flex items-center gap-1 text-xs font-mono font-medium text-primary hover:underline cursor-pointer'
              >
                {order.trackingNumber}
                {copied ? (
                  <Check className='size-3 text-emerald-600 dark:text-emerald-400' />
                ) : (
                  <Copy className='size-3' />
                )}
              </button>
            </div>
          ) : (
            <Badge variant='secondary'>Tracking Pending</Badge>
          )}
        </div>

        <div className='flex flex-col gap-3'>
          {order.items.map((item) => (
            <div key={item.id} className='flex items-center gap-3'>
              <img
                src={item.imageUrl}
                alt={item.name}
                className='size-14 rounded-lg object-cover border border-border bg-muted'
              />
              <div className='flex-1 min-w-0'>
                <p className='text-xs font-semibold text-foreground truncate'>
                  {item.name}
                </p>
                <p className='text-[11px] text-muted-foreground'>
                  {item.variant}
                </p>
                <div className='mt-1 flex items-center justify-between text-xs'>
                  <span className='text-muted-foreground'>
                    Qty: {item.quantity}
                  </span>
                  <span className='font-semibold text-foreground'>
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type='button'
          onClick={() => setExpanded(!expanded)}
          className='flex w-full items-center justify-between pt-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
        >
          <span>
            {expanded ? 'Hide Details' : 'View Delivery & Payment Details'}
          </span>
          {expanded ? (
            <ChevronUp className='size-3.5' />
          ) : (
            <ChevronDown className='size-3.5' />
          )}
        </button>

        {expanded && (
          <div className='flex flex-col gap-3 pt-2 border-t border-border text-xs'>
            <div>
              <div className='flex items-center gap-1.5 text-muted-foreground mb-1'>
                <MapPin className='size-3.5' />
                <span className='font-medium text-[11px] uppercase tracking-wider'>
                  Shipping Destination
                </span>
              </div>
              <p className='font-semibold text-foreground'>
                {order.shippingAddress.name}
              </p>
              <p className='text-muted-foreground'>
                {order.shippingAddress.addressLine1}
              </p>
              <p className='text-muted-foreground'>
                {order.shippingAddress.cityStateZip}
              </p>
            </div>

            <Separator />

            <div className='flex flex-col gap-1.5'>
              <div className='flex justify-between text-muted-foreground'>
                <span>Subtotal</span>
                <span>${order.totals.subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-muted-foreground'>
                <span>Standard Shipping</span>
                <span>
                  {order.totals.shipping === 0
                    ? 'FREE'
                    : `$${order.totals.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className='flex justify-between text-muted-foreground'>
                <span>Tax</span>
                <span>${order.totals.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className='flex justify-between font-bold text-foreground pt-0.5'>
                <span>Total Paid</span>
                <span>${order.totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
