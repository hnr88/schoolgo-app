import { sortByOrder } from '@/modules/agent-detail/lib/section-utils';
import { SERVICE_CATEGORY_ORDER } from '@/modules/agent-detail/constants/services.constants';
import type { AgentService } from '@/modules/agent-detail/types/agent-detail.types';

const UNCATEGORISED = '__other__';

export interface ServiceGroup {
  category: string;
  services: AgentService[];
}

/** Group services by their category enum, ordered per SERVICE_CATEGORY_ORDER (unknown/empty last). */
export function groupServicesByCategory(services: readonly AgentService[]): ServiceGroup[] {
  const buckets = new Map<string, AgentService[]>();
  for (const service of services) {
    if (!service.serviceName?.trim()) continue;
    const key = service.category?.trim() || UNCATEGORISED;
    const bucket = buckets.get(key);
    if (bucket) bucket.push(service);
    else buckets.set(key, [service]);
  }

  const order = [...SERVICE_CATEGORY_ORDER, UNCATEGORISED] as readonly string[];
  return [...buckets.entries()]
    .sort((a, b) => {
      const ai = order.indexOf(a[0]);
      const bi = order.indexOf(b[0]);
      return (ai === -1 ? order.length : ai) - (bi === -1 ? order.length : bi);
    })
    .map(([category, items]) => ({ category, services: sortByOrder(items) }));
}
