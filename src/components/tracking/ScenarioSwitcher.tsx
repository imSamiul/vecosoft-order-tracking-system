import { cn } from '@/lib/utils';
import type { ScenarioType } from '@/types/order';
import { RefreshCw } from 'lucide-react';

interface ScenarioSwitcherProps {
  currentScenario: ScenarioType;
  onScenarioChange: (scenario: ScenarioType) => void;
  onRefresh: () => void;
  isFetching: boolean;
}

const scenarios: { id: ScenarioType; label: string; activeClass: string }[] = [
  {
    id: 'standard',
    label: 'Standard',
    activeClass: 'bg-background font-bold text-foreground shadow-xs',
  },
  {
    id: 'delayed',
    label: 'Delayed ⚠️',
    activeClass: 'bg-amber-500 font-bold text-white shadow-xs',
  },
  {
    id: 'delivered_not_received',
    label: 'Not Received ❌',
    activeClass:
      'bg-destructive font-bold text-destructive-foreground shadow-xs',
  },
];

export function ScenarioSwitcher({
  currentScenario,
  onScenarioChange,
  onRefresh,
  isFetching,
}: ScenarioSwitcherProps) {
  return (
    <header className='sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md px-3 py-2.5 shadow-xs'>
      <div className='mx-auto max-w-md'>
        <div className='flex items-center justify-between mb-1.5'>
          <span className='text-[11px] font-bold uppercase tracking-wider text-muted-foreground'>
            Evaluator Scenario Switcher
          </span>
          <button
            type='button'
            onClick={onRefresh}
            disabled={isFetching}
            className='flex items-center gap-1 text-[11px] font-medium text-primary hover:opacity-80 disabled:opacity-50 cursor-pointer'
          >
            <RefreshCw className={cn('size-3', isFetching && 'animate-spin')} />
            Refresh
          </button>
        </div>

        <div className='grid grid-cols-3 gap-1 rounded-lg bg-muted p-1 text-[11px] font-medium'>
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              type='button'
              onClick={() => onScenarioChange(sc.id)}
              className={cn(
                'rounded-md py-1.5 transition-colors cursor-pointer',
                currentScenario === sc.id
                  ? sc.activeClass
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {sc.label}
            </button>
          ))}
          <button
            type='button'
            onClick={() => onScenarioChange('tracking_pending')}
            className={cn(
              'col-span-3 mt-1 rounded-md py-1 transition-colors cursor-pointer',
              currentScenario === 'tracking_pending'
                ? 'bg-primary font-bold text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Tracking Not Available Yet ⏳
          </button>
        </div>
      </div>
    </header>
  );
}
