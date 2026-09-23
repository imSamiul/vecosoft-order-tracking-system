import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface ReportMissingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const reasons = [
  {
    id: 'not_at_door',
    label: 'Checked delivery location, package is not there',
  },
  { id: 'wrong_address', label: 'Courier photo shows a different house/door' },
  { id: 'delivered_signature_unknown', label: 'Signed for by someone unknown' },
];

export function ReportMissingModal({
  isOpen,
  onClose,
  orderId,
}: ReportMissingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [reason, setReason] = useState('not_at_door');

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogHeader>
        <div className='flex items-center gap-2'>
          <ShieldCheck className='size-4 text-emerald-600 dark:text-emerald-400' />
          <DialogTitle>Missing Package Claim</DialogTitle>
        </div>
        <DialogClose onClick={handleClose} />
      </DialogHeader>

      {submitted ? (
        <div className='py-6 text-center flex flex-col items-center gap-3'>
          <div className='flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'>
            <CheckCircle2 className='size-6' />
          </div>
          <h4 className='text-sm font-bold text-foreground'>
            Claim #CLM-8921 Opened
          </h4>
          <p className='text-xs text-muted-foreground max-w-xs leading-normal'>
            We requested the driver’s GPS drop-off coordinates. If unresolved
            within 6 hours, an immediate replacement or full refund will be
            processed.
          </p>
          <Button onClick={handleClose} className='mt-2 w-full'>
            Done
          </Button>
        </div>
      ) : (
        <div className='mt-4 flex flex-col gap-3'>
          <p className='text-xs text-muted-foreground'>
            Select what describes Order{' '}
            <strong className='text-foreground'>#{orderId}</strong>:
          </p>

          <div className='flex flex-col gap-2'>
            {reasons.map((item) => (
              <label
                key={item.id}
                className={cn(
                  'flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors',
                  reason === item.id
                    ? 'border-primary bg-primary/5 font-medium text-foreground'
                    : 'border-border text-muted-foreground hover:border-foreground/20',
                )}
              >
                <input
                  type='radio'
                  name='reason'
                  checked={reason === item.id}
                  onChange={() => setReason(item.id)}
                  className='mt-0.5 accent-primary'
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          <Button
            variant='destructive'
            onClick={() => setSubmitted(true)}
            className='mt-3 w-full'
          >
            Submit Dispute & Request Resolution
          </Button>
        </div>
      )}
    </Dialog>
  );
}
