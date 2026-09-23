import { fetchOrderTracking } from '@/services/mockOrderApi';
import type { ScenarioType } from '@/types/order';
import { useQuery } from '@tanstack/react-query';

export const orderKeys = {
  all: ['orders'] as const,
  tracking: (scenario: ScenarioType) =>
    [...orderKeys.all, 'tracking', scenario] as const,
};

export function useOrderTracking(scenario: ScenarioType) {
  return useQuery({
    queryKey: orderKeys.tracking(scenario),
    queryFn: () => fetchOrderTracking(scenario),
  });
}
