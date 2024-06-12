import { OrderInitial } from '../../models/Orders'

const orders: OrderInitial[] = [
  {
    id: 1,
    userId: 'auth0|abc12345',
    purchasedAt: '2023-02-10 10:30:00',
    shippingId: 1,
    orderItems: [
      {
        productId: 9,
        quantity: 1,
      },
      {
        productId: 10,
        quantity: 6,
      },
      {
        productId: 14,
        quantity: 5,
      },
      {
        productId: 4,
        quantity: 3,
      },
      {
        productId: 5,
        quantity: 7,
      },
      {
        productId: 6,
        quantity: 4,
      },
      {
        productId: 8,
        quantity: 2,
      },
    ],
  },
  {
    id: 2,
    userId: 'auth0|def67890',
    purchasedAt: '2023-02-12 14:45:00',
    shippingId: 2,
    orderItems: [
      {
        productId: 8,
        quantity: 5,
      },
      {
        productId: 1,
        quantity: 4,
      },
      {
        productId: 13,
        quantity: 7,
      },
      {
        productId: 6,
        quantity: 1,
      },
      {
        productId: 20,
        quantity: 5,
      },
      {
        productId: 11,
        quantity: 3,
      },
      {
        productId: 9,
        quantity: 2,
      },
    ],
  },
  {
    id: 3,
    userId: 'auth0|xyz45678',
    purchasedAt: '2023-03-05 9:15:00',
    shippingId: 3,
    orderItems: [
      {
        productId: 15,
        quantity: 6,
      },
      {
        productId: 18,
        quantity: 8,
      },
      {
        productId: 3,
        quantity: 3,
      },
      {
        productId: 5,
        quantity: 5,
      },
      {
        productId: 14,
        quantity: 1,
      },
      {
        productId: 10,
        quantity: 2,
      },
      {
        productId: 4,
        quantity: 6,
      },
    ],
  },
  {
    id: 4,
    userId: 'auth0|pqr98765',
    purchasedAt: '2023-03-15 16:30:00',
    shippingId: 1,
    orderItems: [
      {
        productId: 1,
        quantity: 7,
      },
      {
        productId: 17,
        quantity: 5,
      },
      {
        productId: 5,
        quantity: 3,
      },
      {
        productId: 19,
        quantity: 2,
      },
      {
        productId: 7,
        quantity: 8,
      },
      {
        productId: 15,
        quantity: 4,
      },
      {
        productId: 8,
        quantity: 1,
      },
    ],
  },
  {
    id: 5,
    userId: 'auth0|lmn65432',
    purchasedAt: '2023-04-01 11:45:00',
    shippingId: 2,
    orderItems: [
      {
        productId: 2,
        quantity: 6,
      },
      {
        productId: 13,
        quantity: 3,
      },
      {
        productId: 16,
        quantity: 5,
      },
      {
        productId: 12,
        quantity: 1,
      },
      {
        productId: 20,
        quantity: 6,
      },
    ],
  },
  {
    id: 6,
    userId: 'auth0|ghi32109',
    purchasedAt: '2023-04-10 15:00:00',
    shippingId: 3,
    orderItems: [
      {
        productId: 6,
        quantity: 3,
      },
      {
        productId: 4,
        quantity: 5,
      },
      {
        productId: 11,
        quantity: 2,
      },
      {
        productId: 10,
        quantity: 8,
      },
      {
        productId: 3,
        quantity: 6,
      },
      {
        productId: 15,
        quantity: 1,
      },
      {
        productId: 19,
        quantity: 4,
      },
    ],
  },
  {
    id: 7,
    userId: 'auth0|uvw54321',
    purchasedAt: '2023-05-02 8:00:00',
    shippingId: 1,
    orderItems: [
      {
        productId: 18,
        quantity: 2,
      },
      {
        productId: 20,
        quantity: 5,
      },
      {
        productId: 7,
        quantity: 7,
      },
      {
        productId: 14,
        quantity: 3,
      },
      {
        productId: 11,
        quantity: 6,
      },
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 17,
        quantity: 4,
      },
    ],
  },
  {
    id: 8,
    userId: 'auth0|hij23456',
    purchasedAt: '2023-05-15 14:20:00',
    shippingId: 2,
    orderItems: [
      {
        productId: 5,
        quantity: 3,
      },
      {
        productId: 10,
        quantity: 2,
      },
      {
        productId: 12,
        quantity: 5,
      },
      {
        productId: 13,
        quantity: 1,
      },
      {
        productId: 9,
        quantity: 6,
      },
      {
        productId: 6,
        quantity: 8,
      },
      {
        productId: 18,
        quantity: 4,
      },
    ],
  },
  {
    id: 9,
    userId: 'auth0|klm78901',
    purchasedAt: '2023-06-05 17:00:00',
    shippingId: 3,
    orderItems: [
      {
        productId: 8,
        quantity: 5,
      },
      {
        productId: 4,
        quantity: 1,
      },
      {
        productId: 16,
        quantity: 3,
      },
      {
        productId: 3,
        quantity: 6,
      },
      {
        productId: 20,
        quantity: 2,
      },
      {
        productId: 14,
        quantity: 4,
      },
      {
        productId: 2,
        quantity: 7,
      },
    ],
  },
  {
    id: 10,
    userId: 'auth0|bcd34567',
    purchasedAt: '2023-06-20 9:45:00',
    shippingId: 1,
    orderItems: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 15,
        quantity: 8,
      },
      {
        productId: 19,
        quantity: 6,
      },
      {
        productId: 17,
        quantity: 3,
      },
      {
        productId: 7,
        quantity: 4,
      },
      {
        productId: 2,
        quantity: 2,
      },
      {
        productId: 13,
        quantity: 5,
      },
    ],
  },
  {
    id: 11,
    userId: 'auth0|abc12345',
    purchasedAt: '2023-07-02 12:10:00',
    shippingId: 2,
    orderItems: [
      {
        productId: 9,
        quantity: 1,
      },
      {
        productId: 10,
        quantity: 6,
      },
      {
        productId: 14,
        quantity: 5,
      },
      {
        productId: 4,
        quantity: 3,
      },
      {
        productId: 5,
        quantity: 7,
      },
      {
        productId: 6,
        quantity: 4,
      },
      {
        productId: 8,
        quantity: 2,
      },
    ],
  },
  {
    id: 12,
    userId: 'auth0|def67890',
    purchasedAt: '2023-07-15 18:25:00',
    shippingId: 3,
    orderItems: [
      {
        productId: 8,
        quantity: 5,
      },
      {
        productId: 1,
        quantity: 4,
      },
      {
        productId: 13,
        quantity: 7,
      },
      {
        productId: 6,
        quantity: 1,
      },
      {
        productId: 20,
        quantity: 5,
      },
      {
        productId: 11,
        quantity: 3,
      },
      {
        productId: 9,
        quantity: 2,
      },
    ],
  },
  {
    id: 13,
    userId: 'auth0|xyz45678',
    purchasedAt: '2023-07-21 8:45:00',
    shippingId: 1,
    orderItems: [
      {
        productId: 15,
        quantity: 6,
      },
      {
        productId: 18,
        quantity: 8,
      },
      {
        productId: 3,
        quantity: 3,
      },
      {
        productId: 5,
        quantity: 5,
      },
      {
        productId: 14,
        quantity: 1,
      },
      {
        productId: 10,
        quantity: 2,
      },
      {
        productId: 4,
        quantity: 6,
      },
    ],
  },
  {
    id: 14,
    userId: 'auth0|pqr98765',
    purchasedAt: '2023-07-24 15:30:00',
    shippingId: 2,
    orderItems: [
      {
        productId: 1,
        quantity: 7,
      },
      {
        productId: 17,
        quantity: 5,
      },
      {
        productId: 5,
        quantity: 3,
      },
      {
        productId: 19,
        quantity: 2,
      },
      {
        productId: 7,
        quantity: 8,
      },
      {
        productId: 15,
        quantity: 4,
      },
      {
        productId: 8,
        quantity: 1,
      },
    ],
  },
  {
    id: 15,
    userId: 'auth0|lmn65432',
    purchasedAt: '2023-07-27 11:20:00',
    shippingId: 3,
    orderItems: [
      {
        productId: 2,
        quantity: 6,
      },
      {
        productId: 13,
        quantity: 3,
      },
      {
        productId: 16,
        quantity: 5,
      },
      {
        productId: 12,
        quantity: 1,
      },
      {
        productId: 20,
        quantity: 6,
      },
    ],
  },
  {
    id: 16,
    userId: 'auth0|ghi32109',
    purchasedAt: '2023-07-30 17:50:00',
    shippingId: 1,
    orderItems: [
      {
        productId: 6,
        quantity: 3,
      },
      {
        productId: 4,
        quantity: 5,
      },
      {
        productId: 11,
        quantity: 2,
      },
      {
        productId: 10,
        quantity: 8,
      },
      {
        productId: 3,
        quantity: 6,
      },
      {
        productId: 15,
        quantity: 1,
      },
      {
        productId: 19,
        quantity: 4,
      },
    ],
  },
  {
    id: 17,
    userId: 'auth0|uvw54321',
    purchasedAt: '2023-07-31 20:10:00',
    shippingId: 2,
    orderItems: [
      {
        productId: 18,
        quantity: 2,
      },
      {
        productId: 20,
        quantity: 5,
      },
      {
        productId: 7,
        quantity: 7,
      },
      {
        productId: 14,
        quantity: 3,
      },
      {
        productId: 11,
        quantity: 6,
      },
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 17,
        quantity: 4,
      },
    ],
  },
  {
    id: 18,
    userId: 'auth0|hij23456',
    purchasedAt: '2023-07-31 22:45:00',
    shippingId: 3,
    orderItems: [
      {
        productId: 5,
        quantity: 3,
      },
      {
        productId: 10,
        quantity: 2,
      },
      {
        productId: 12,
        quantity: 5,
      },
      {
        productId: 13,
        quantity: 1,
      },
      {
        productId: 9,
        quantity: 6,
      },
      {
        productId: 6,
        quantity: 8,
      },
      {
        productId: 18,
        quantity: 4,
      },
    ],
  },
  {
    id: 19,
    userId: 'auth0|klm78901',
    purchasedAt: '2023-07-31 23:59:59',
    shippingId: 1,
    orderItems: [
      {
        productId: 8,
        quantity: 5,
      },
      {
        productId: 4,
        quantity: 1,
      },
      {
        productId: 16,
        quantity: 3,
      },
      {
        productId: 3,
        quantity: 6,
      },
      {
        productId: 20,
        quantity: 2,
      },
      {
        productId: 14,
        quantity: 4,
      },
      {
        productId: 2,
        quantity: 7,
      },
    ],
  },
]

export default orders
