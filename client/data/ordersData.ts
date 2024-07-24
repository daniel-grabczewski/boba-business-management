import { Order } from '../../models/Orders'
import { getRandomDateTimeWithinLastDays } from '../utils/generateDate'
import { generateUniqueOrderId } from '../utils/generateUniqueOrderId'

const days = 120

// Define the orders data without date/time values
const ordersWithoutDateTime: Order[] = [
  {
    id: 1,
    userId: 'auth0|abc12345',
    purchasedAt: '',
    shippingId: 1,
    phoneNumber: '64 21 1234567',
    firstName: 'Emma',
    lastName: 'Johnson',
    address: '42 Sunset St',
    city: 'Auckland',
    zipCode: '1010',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 2,
    phoneNumber: '64 21 9876543',
    firstName: 'Liam',
    lastName: 'Smith',
    address: '456 Maple Ave',
    city: 'Wellington',
    zipCode: '6011',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 3,
    phoneNumber: '64 27 555888',
    firstName: 'Olivia',
    lastName: 'Williams',
    address: '789 Oak Rd',
    city: 'Christchurch',
    zipCode: '8011',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 1,
    phoneNumber: '64 22 3334444',
    firstName: 'Noah',
    lastName: 'Jones',
    address: '321 Elm Court',
    city: 'Dunedin',
    zipCode: '9016',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 2,
    phoneNumber: '64 27 1112222',
    firstName: 'Ava',
    lastName: 'Brown',
    address: '654 Pine Lane',
    city: 'Hamilton',
    zipCode: '3204',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 3,
    phoneNumber: '64 21 4447777',
    firstName: 'Oliver',
    lastName: 'Taylor',
    address: '987 Birch Blvd',
    city: 'Tauranga',
    zipCode: '3110',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 1,
    phoneNumber: '64 27 8889999',
    firstName: 'Isla',
    lastName: 'Davis',
    address: '654 Willow Drive',
    city: 'Napier',
    zipCode: '4110',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 2,
    phoneNumber: '64 22 7776666',
    firstName: 'Jack',
    lastName: 'Evans',
    address: '789 Rose Street',
    city: 'Palmerston North',
    zipCode: '4410',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 3,
    phoneNumber: '64 21 2223333',
    firstName: 'Charlotte',
    lastName: 'Wilson',
    address: '123 Ivy Lane',
    city: 'Nelson',
    zipCode: '7010',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 1,
    phoneNumber: '64 27 9990000',
    firstName: 'Leo',
    lastName: 'Moore',
    address: '987 Poplar Close',
    city: 'Rotorua',
    zipCode: '3010',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 2,
    phoneNumber: '64 21 1234567',
    firstName: 'Emma',
    lastName: 'Johnson',
    address: '42 Sunset St',
    city: 'Auckland',
    zipCode: '1010',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 3,
    phoneNumber: '64 21 9876543',
    firstName: 'Liam',
    lastName: 'Smith',
    address: '456 Maple Ave',
    city: 'Wellington',
    zipCode: '6011',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 1,
    phoneNumber: '64 27 555888',
    firstName: 'Olivia',
    lastName: 'Williams',
    address: '789 Oak Rd',
    city: 'Christchurch',
    zipCode: '8011',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 2,
    phoneNumber: '64 22 3334444',
    firstName: 'Noah',
    lastName: 'Jones',
    address: '321 Elm Court',
    city: 'Dunedin',
    zipCode: '9016',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 3,
    phoneNumber: '64 27 1112222',
    firstName: 'Ava',
    lastName: 'Brown',
    address: '654 Pine Lane',
    city: 'Hamilton',
    zipCode: '3204',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 1,
    phoneNumber: '64 21 4447777',
    firstName: 'Oliver',
    lastName: 'Taylor',
    address: '987 Birch Blvd',
    city: 'Tauranga',
    zipCode: '3110',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 2,
    phoneNumber: '64 27 1234567',
    firstName: 'Sophia',
    lastName: 'Anderson',
    address: '123 Kiwi Rd',
    city: 'Wellington',
    zipCode: '6012',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 3,
    phoneNumber: '64 22 7894561',
    firstName: 'Ethan',
    lastName: 'Taylor',
    address: '456 Pohutukawa St',
    city: 'Auckland',
    zipCode: '1011',
    country: 'New Zealand',
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
    purchasedAt: '',
    shippingId: 1,
    phoneNumber: '64 27 3216549',
    firstName: 'Mia',
    lastName: 'Roberts',
    address: '789 Kauri Ave',
    city: 'Christchurch',
    zipCode: '8012',
    country: 'New Zealand',
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

// Process the orders data to generate a random date/time within x days of the current date.
const orders = ordersWithoutDateTime.map((order) => ({
  ...order,
  purchasedAt: getRandomDateTimeWithinLastDays(days),
}))

// Generate unique order ID for each order, based on their date/time purchased
const ordersWithUniqueId = orders.map((order) => ({
  ...order,
  id : generateUniqueOrderId(order.purchasedAt)
}))

export default ordersWithUniqueId
