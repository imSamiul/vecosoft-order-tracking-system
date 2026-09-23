import { cn } from '@/lib/utils';
import type { TimelineMilestone } from '@/types/order';
import {
  AlertTriangle,
  Check,
  Clock,
  FileCheck,
  Home,
  Package,
  PackageCheck,
  Truck,
} from 'lucide-react';
import type { ElementType } from 'react';

interface TrackingTimelineProps {
  milestones: TimelineMilestone[];
  isDelayed?: boolean;
}

const iconMap: Record<string, ElementType> = {
  FileCheck,
  Truck,
  PackageCheck,
  Home,
  AlertTriangle,
  Package,
  Clock,
  CheckCircle2: Check,
};

export function TrackingTimeline({
  milestones,
  isDelayed,
}: TrackingTimelineProps) {
  return (
    <div className='relative pl-6 py-2'>
      {/* Connected vertical progress bar */}
      <div className='absolute left-5.75 top-6 bottom-6 w-0.5 bg-border' />

      <div className='flex flex-col gap-6'>
        {milestones.map((milestone, idx) => {
          const isDone = milestone.status === 'completed';
          const isCurrent = milestone.status === 'current';
          const isUpcoming = milestone.status === 'upcoming';
          const Icon = iconMap[milestone.icon] || Package;

          return (
            <div key={idx} className='relative flex items-start gap-4'>
              <div
                className={cn(
                  'relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs transition-colors',
                  isDone && 'border-emerald-600 bg-emerald-600 text-white',
                  isCurrent &&
                    (isDelayed
                      ? 'border-amber-500 bg-amber-500 text-white ring-4 ring-amber-100 dark:ring-amber-950 animate-pulse'
                      : 'border-primary bg-primary text-primary-foreground ring-4 ring-ring/20'),
                  isUpcoming && 'border-border bg-card text-muted-foreground',
                )}
              >
                {isDone ? (
                  <Check className='size-3.5 stroke-3' />
                ) : (
                  <Icon className='size-3.5' />
                )}
              </div>

              <div className='flex-1 -mt-0.5'>
                <div className='flex items-baseline justify-between gap-2'>
                  <h4
                    className={cn(
                      'text-sm font-semibold tracking-tight',
                      isUpcoming ? 'text-muted-foreground' : 'text-foreground',
                    )}
                  >
                    {milestone.title}
                  </h4>
                  {milestone.timestamp && (
                    <span className='text-[11px] font-medium text-muted-foreground whitespace-nowrap'>
                      {milestone.timestamp}
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    'mt-0.5 text-xs leading-relaxed',
                    isUpcoming
                      ? 'text-muted-foreground'
                      : 'text-muted-foreground/80',
                  )}
                >
                  {milestone.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
