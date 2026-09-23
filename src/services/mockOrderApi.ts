import type { OrderTrackingData, ScenarioType } from '../types/order';

const scenarioDatabase: Record<
  Exclude<ScenarioType, 'error'>,
  OrderTrackingData
> = {
  standard: {
    orderId: 'VEC-928410',
    trackingNumber: 'TRK-98421098X',
    carrier: { name: 'SwiftExpress Priority', phone: '+1 (800) 555-0199' },
    status: 'OUT_FOR_DELIVERY',
    statusHeadline: 'Out for Delivery',
    statusDescription:
      'Your package is loaded on the local courier van and scheduled for delivery today.',
    estimatedDelivery: {
      date: 'Today, Oct 24',
      timeWindow: '2:30 PM – 5:30 PM',
      isDelayed: false,
    },
    shippingAddress: {
      name: 'Alex Morgan',
      addressLine1: '742 Evergreen Terrace, Apt 4B',
      cityStateZip: 'Springfield, OR 97477',
    },
    timeline: [
      {
        title: 'Order Confirmed',
        description: 'Payment authorized & verified.',
        timestamp: 'Oct 22, 10:15 AM',
        status: 'completed',
        icon: 'FileCheck',
      },
      {
        title: 'Shipped & Departed Facility',
        description: 'Package departed Central Distribution Center.',
        timestamp: 'Oct 23, 08:45 PM',
        status: 'completed',
        icon: 'Truck',
      },
      {
        title: 'Out for Delivery',
        description: 'Courier scanned onto route vehicle.',
        timestamp: 'Oct 24, 07:15 AM',
        status: 'current',
        icon: 'PackageCheck',
      },
      {
        title: 'Delivered',
        description: 'Contact-free drop-off at front door.',
        timestamp: null,
        status: 'upcoming',
        icon: 'Home',
      },
    ],
    items: [
      {
        id: '1',
        name: 'Aerolite Ergonomic Wireless Headset',
        variant: 'Matte Space Gray',
        quantity: 1,
        price: 149.0,
        imageUrl:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&q=80',
      },
    ],
    totals: { subtotal: 149.0, shipping: 0.0, tax: 11.92, total: 160.92 },
  },

  delayed: {
    orderId: 'VEC-819234',
    trackingNumber: 'TRK-44910283D',
    carrier: { name: 'SwiftExpress Priority', phone: '+1 (800) 555-0199' },
    status: 'DELAYED',
    statusHeadline: 'Shipment Delayed in Transit',
    statusDescription:
      'Severe transit weather caused a regional hub backlog. Expected arrival time has been updated.',
    estimatedDelivery: {
      date: 'Tomorrow, Oct 25',
      timeWindow: 'By 7:00 PM',
      isDelayed: true,
      originalDate: 'Was Oct 23 by 5:00 PM',
    },
    shippingAddress: {
      name: 'Alex Morgan',
      addressLine1: '742 Evergreen Terrace, Apt 4B',
      cityStateZip: 'Springfield, OR 97477',
    },
    timeline: [
      {
        title: 'Order Confirmed',
        description: 'Order processed and packaged.',
        timestamp: 'Oct 21, 02:20 PM',
        status: 'completed',
        icon: 'FileCheck',
      },
      {
        title: 'In Transit — Weather Delay',
        description:
          'Severe road conditions near regional hub. Re-routed to nearest safe sorting depot.',
        timestamp: 'Oct 23, 11:30 AM',
        status: 'current',
        icon: 'AlertTriangle',
      },
      {
        title: 'Out for Delivery',
        description: 'Scheduled for first morning load.',
        timestamp: null,
        status: 'upcoming',
        icon: 'PackageCheck',
      },
      {
        title: 'Delivered',
        description: 'Final front door drop-off.',
        timestamp: null,
        status: 'upcoming',
        icon: 'Home',
      },
    ],
    items: [
      {
        id: '2',
        name: 'Pro-Glide Mechanical Keyboard',
        variant: 'Hot-swap / Tactile Brown',
        quantity: 1,
        price: 189.0,
        imageUrl:
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&q=80',
      },
    ],
    totals: { subtotal: 189.0, shipping: 15.0, tax: 16.32, total: 220.32 },
  },

  delivered_not_received: {
    orderId: 'VEC-772910',
    trackingNumber: 'TRK-10928374D',
    carrier: { name: 'MetroFast Courier', phone: '+1 (888) 555-0144' },
    status: 'DELIVERED',
    statusHeadline: 'Delivered to Front Door',
    statusDescription:
      'Driver marked package as delivered at your residential entrance.',
    estimatedDelivery: {
      date: 'Delivered Today',
      timeWindow: '1:45 PM',
      isDelayed: false,
    },
    deliveryProof: {
      photoUrl:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
      deliveredAt: 'Today at 1:45 PM',
      dropoffLocation: 'Front Porch / Planter area',
    },
    shippingAddress: {
      name: 'Alex Morgan',
      addressLine1: '742 Evergreen Terrace, Apt 4B',
      cityStateZip: 'Springfield, OR 97477',
    },
    timeline: [
      {
        title: 'Order Confirmed',
        description: 'Order received and packaged.',
        timestamp: 'Oct 22, 09:10 AM',
        status: 'completed',
        icon: 'FileCheck',
      },
      {
        title: 'Shipped',
        description: 'Dispatched from Seattle Fulfilment.',
        timestamp: 'Oct 23, 04:00 PM',
        status: 'completed',
        icon: 'Truck',
      },
      {
        title: 'Delivered to Doorstep',
        description: 'Left at porch per delivery instructions.',
        timestamp: 'Oct 24, 01:45 PM',
        status: 'completed',
        icon: 'CheckCircle2',
      },
    ],
    items: [
      {
        id: '3',
        name: 'Ultra-Fast USB-C GaN Travel Charger 100W',
        variant: 'Midnight Black',
        quantity: 2,
        price: 59.99,
        imageUrl:
          'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=160&q=80',
      },
    ],
    totals: { subtotal: 119.98, shipping: 0.0, tax: 9.6, total: 129.58 },
  },

  tracking_pending: {
    orderId: 'VEC-993812',
    trackingNumber: null,
    carrier: null,
    status: 'PROCESSING',
    statusHeadline: 'Order Verified & Packaging',
    statusDescription:
      'Warehouse team has verified items and is preparing the package for courier pickup.',
    estimatedDelivery: {
      date: 'Estimated Oct 27 - Oct 29',
      timeWindow: 'Courier assignment in progress',
      isDelayed: false,
    },
    shippingAddress: {
      name: 'Alex Morgan',
      addressLine1: '742 Evergreen Terrace, Apt 4B',
      cityStateZip: 'Springfield, OR 97477',
    },
    timeline: [
      {
        title: 'Order Placed & Verified',
        description: 'Inventory reserved, invoice generated.',
        timestamp: 'Today, 25 mins ago',
        status: 'completed',
        icon: 'FileCheck',
      },
      {
        title: 'Fulfillment & Quality Check',
        description: 'Items packed and sealed in protective box.',
        timestamp: 'In Progress',
        status: 'current',
        icon: 'Package',
      },
      {
        title: 'Awaiting Courier Handover',
        description: 'Tracking number assigned upon manifest pickup.',
        timestamp: 'Pending Handover',
        status: 'upcoming',
        icon: 'Clock',
      },
      {
        title: 'In Transit',
        description: 'Real-time scans will update live.',
        timestamp: null,
        status: 'upcoming',
        icon: 'Truck',
      },
    ],
    items: [
      {
        id: '4',
        name: 'Smart Ambient Desk Lamp v2',
        variant: 'Anodized Silver / Warm White',
        quantity: 1,
        price: 89.0,
        imageUrl:
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=160&q=80',
      },
    ],
    totals: { subtotal: 89.0, shipping: 5.0, tax: 7.52, total: 101.52 },
  },
};

export const fetchOrderTracking = async (
  scenario: ScenarioType,
): Promise<OrderTrackingData> => {
  await new Promise((resolve) => setTimeout(resolve, 350));

  if (scenario === 'error') {
    throw new Error('Could not retrieve tracking details. Please try again.');
  }

  return scenarioDatabase[scenario as keyof typeof scenarioDatabase];
};
