export type OrderStatus =
  | 'ORDER_CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'DELAYED';

export type ScenarioType =
  | 'standard'
  | 'delayed'
  | 'delivered_not_received'
  | 'tracking_pending'
  | 'error';

export type TimelineMilestone = {
  title: string;
  description: string;
  timestamp: string | null;
  status: 'completed' | 'current' | 'upcoming';
  icon: string;
};

export type OrderItem = {
  id: string;
  name: string;
  variant: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

export type OrderTrackingData = {
  orderId: string;
  trackingNumber: string | null;
  carrier: {
    name: string;
    phone: string;
  } | null;
  status: OrderStatus;
  statusHeadline: string;
  statusDescription: string;
  estimatedDelivery: {
    date: string;
    timeWindow: string;
    isDelayed?: boolean;
    originalDate?: string;
  } | null;
  shippingAddress: {
    name: string;
    addressLine1: string;
    cityStateZip: string;
  };
  timeline: TimelineMilestone[];
  items: OrderItem[];
  totals: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  deliveryProof?: {
    photoUrl: string;
    deliveredAt: string;
    dropoffLocation: string;
  };
};
