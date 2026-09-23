import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ExternalLink, MessageSquare, Phone } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export function SupportModal({ isOpen, onClose, orderId }: SupportModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogHeader>
        <div>
          <DialogTitle>Order Support</DialogTitle>
          <DialogDescription>Order #{orderId}</DialogDescription>
        </div>
        <DialogClose onClick={onClose} />
      </DialogHeader>

      <div className='mt-4 flex flex-col gap-2.5'>
        <button
          type='button'
          onClick={() => {
            alert('Connecting to live dispatch agent...');
            onClose();
          }}
          className='w-full flex items-center justify-between rounded-xl border border-border p-3 hover:bg-accent transition-colors text-left cursor-pointer'
        >
          <div className='flex items-center gap-3'>
            <div className='rounded-lg bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'>
              <MessageSquare className='size-4' />
            </div>
            <div>
              <p className='text-xs font-semibold text-foreground'>
                Priority Live Chat
              </p>
              <p className='text-[11px] text-muted-foreground'>
                Wait time: ~1 min
              </p>
            </div>
          </div>
          <ExternalLink className='size-3.5 text-muted-foreground' />
        </button>

        <a
          href='tel:+18005550199'
          className='w-full flex items-center justify-between rounded-xl border border-border p-3 hover:bg-accent transition-colors text-left cursor-pointer'
        >
          <div className='flex items-center gap-3'>
            <div className='rounded-lg bg-primary/10 p-2 text-primary'>
              <Phone className='size-4' />
            </div>
            <div>
              <p className='text-xs font-semibold text-foreground'>
                Direct Courier Call
              </p>
              <p className='text-[11px] text-muted-foreground'>
                Toll-free 8 AM – 8 PM
              </p>
            </div>
          </div>
          <ExternalLink className='size-3.5 text-muted-foreground' />
        </a>
      </div>
    </Dialog>
  );
}
