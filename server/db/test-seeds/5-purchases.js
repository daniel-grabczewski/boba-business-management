exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('purchases')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('purchases').insert([
        {
          id: 1,
          user_id: 'auth0|abc12345',
          product_id: 9,
          quantity: 1,
          purchased_at: '2023-02-10 10:30:00',
          shipping_id: 1,
          order_id: 1,
        },
        {
          id: 2,
          user_id: 'auth0|abc12345',
          product_id: 10,
          quantity: 6,
          purchased_at: '2023-02-10 10:30:00',
          shipping_id: 1,
          order_id: 1,
        },
        {
          id: 3,
          user_id: 'auth0|abc12345',
          product_id: 14,
          quantity: 5,
          purchased_at: '2023-02-10 10:30:00',
          shipping_id: 1,
          order_id: 1,
        },
        {
          id: 4,
          user_id: 'auth0|abc12345',
          product_id: 4,
          quantity: 3,
          purchased_at: '2023-02-10 10:30:00',
          shipping_id: 1,
          order_id: 1,
        },
        {
          id: 5,
          user_id: 'auth0|abc12345',
          product_id: 5,
          quantity: 7,
          purchased_at: '2023-02-10 10:30:00',
          shipping_id: 1,
          order_id: 1,
        },
        {
          id: 6,
          user_id: 'auth0|abc12345',
          product_id: 6,
          quantity: 4,
          purchased_at: '2023-02-10 10:30:00',
          shipping_id: 1,
          order_id: 1,
        },
        {
          id: 7,
          user_id: 'auth0|abc12345',
          product_id: 8,
          quantity: 2,
          purchased_at: '2023-02-10 10:30:00',
          shipping_id: 1,
          order_id: 1,
        },
        {
          id: 8,
          user_id: 'auth0|def67890',
          product_id: 8,
          quantity: 5,
          purchased_at: '2023-02-12 14:45:00',
          shipping_id: 2,
          order_id: 2,
        },
        {
          id: 9,
          user_id: 'auth0|def67890',
          product_id: 1,
          quantity: 4,
          purchased_at: '2023-02-12 14:45:00',
          shipping_id: 2,
          order_id: 2,
        },
        {
          id: 10,
          user_id: 'auth0|def67890',
          product_id: 13,
          quantity: 7,
          purchased_at: '2023-02-12 14:45:00',
          shipping_id: 2,
          order_id: 2,
        },
        {
          id: 11,
          user_id: 'auth0|def67890',
          product_id: 6,
          quantity: 1,
          purchased_at: '2023-02-12 14:45:00',
          shipping_id: 2,
          order_id: 2,
        },
        {
          id: 12,
          user_id: 'auth0|def67890',
          product_id: 20,
          quantity: 5,
          purchased_at: '2023-02-12 14:45:00',
          shipping_id: 2,
          order_id: 2,
        },
        {
          id: 13,
          user_id: 'auth0|def67890',
          product_id: 11,
          quantity: 3,
          purchased_at: '2023-02-12 14:45:00',
          shipping_id: 2,
          order_id: 2,
        },
        {
          id: 14,
          user_id: 'auth0|def67890',
          product_id: 9,
          quantity: 2,
          purchased_at: '2023-02-12 14:45:00',
          shipping_id: 2,
          order_id: 2,
        },
        {
          id: 15,
          user_id: 'auth0|xyz45678',
          product_id: 15,
          quantity: 6,
          purchased_at: '2023-03-05 9:15:00',
          shipping_id: 3,
          order_id: 3,
        },
        {
          id: 16,
          user_id: 'auth0|xyz45678',
          product_id: 18,
          quantity: 8,
          purchased_at: '2023-03-05 9:15:00',
          shipping_id: 3,
          order_id: 3,
        },
        {
          id: 17,
          user_id: 'auth0|xyz45678',
          product_id: 3,
          quantity: 3,
          purchased_at: '2023-03-05 9:15:00',
          shipping_id: 3,
          order_id: 3,
        },
        {
          id: 18,
          user_id: 'auth0|xyz45678',
          product_id: 5,
          quantity: 5,
          purchased_at: '2023-03-05 9:15:00',
          shipping_id: 3,
          order_id: 3,
        },
        {
          id: 19,
          user_id: 'auth0|xyz45678',
          product_id: 14,
          quantity: 1,
          purchased_at: '2023-03-05 9:15:00',
          shipping_id: 3,
          order_id: 3,
        },
        {
          id: 20,
          user_id: 'auth0|xyz45678',
          product_id: 10,
          quantity: 2,
          purchased_at: '2023-03-05 9:15:00',
          shipping_id: 3,
          order_id: 3,
        },
        {
          id: 21,
          user_id: 'auth0|xyz45678',
          product_id: 4,
          quantity: 6,
          purchased_at: '2023-03-05 9:15:00',
          shipping_id: 3,
          order_id: 3,
        },
        {
          id: 22,
          user_id: 'auth0|pqr98765',
          product_id: 1,
          quantity: 7,
          purchased_at: '2023-03-15 16:30:00',
          shipping_id: 1,
          order_id: 4,
        },
        {
          id: 23,
          user_id: 'auth0|pqr98765',
          product_id: 17,
          quantity: 5,
          purchased_at: '2023-03-15 16:30:00',
          shipping_id: 1,
          order_id: 4,
        },
        {
          id: 24,
          user_id: 'auth0|pqr98765',
          product_id: 5,
          quantity: 3,
          purchased_at: '2023-03-15 16:30:00',
          shipping_id: 1,
          order_id: 4,
        },
        {
          id: 25,
          user_id: 'auth0|pqr98765',
          product_id: 19,
          quantity: 2,
          purchased_at: '2023-03-15 16:30:00',
          shipping_id: 1,
          order_id: 4,
        },
        {
          id: 26,
          user_id: 'auth0|pqr98765',
          product_id: 7,
          quantity: 8,
          purchased_at: '2023-03-15 16:30:00',
          shipping_id: 1,
          order_id: 4,
        },
        {
          id: 27,
          user_id: 'auth0|pqr98765',
          product_id: 15,
          quantity: 4,
          purchased_at: '2023-03-15 16:30:00',
          shipping_id: 1,
          order_id: 4,
        },
        {
          id: 28,
          user_id: 'auth0|pqr98765',
          product_id: 8,
          quantity: 1,
          purchased_at: '2023-03-15 16:30:00',
          shipping_id: 1,
          order_id: 4,
        },
        {
          id: 29,
          user_id: 'auth0|lmn65432',
          product_id: 2,
          quantity: 6,
          purchased_at: '2023-04-01 11:45:00',
          shipping_id: 2,
          order_id: 5,
        },
        {
          id: 30,
          user_id: 'auth0|lmn65432',
          product_id: 13,
          quantity: 3,
          purchased_at: '2023-04-01 11:45:00',
          shipping_id: 2,
          order_id: 5,
        },
        {
          id: 31,
          user_id: 'auth0|lmn65432',
          product_id: 16,
          quantity: 5,
          purchased_at: '2023-04-01 11:45:00',
          shipping_id: 2,
          order_id: 5,
        },
        {
          id: 32,
          user_id: 'auth0|lmn65432',
          product_id: 12,
          quantity: 1,
          purchased_at: '2023-04-01 11:45:00',
          shipping_id: 2,
          order_id: 5,
        },
        {
          id: 33,
          user_id: 'auth0|lmn65432',
          product_id: 20,
          quantity: 6,
          purchased_at: '2023-04-01 11:45:00',
          shipping_id: 2,
          order_id: 5,
        },
        {
          id: 34,
          user_id: 'auth0|ghi32109',
          product_id: 6,
          quantity: 3,
          purchased_at: '2023-04-10 15:00:00',
          shipping_id: 3,
          order_id: 6,
        },
        {
          id: 35,
          user_id: 'auth0|ghi32109',
          product_id: 4,
          quantity: 5,
          purchased_at: '2023-04-10 15:00:00',
          shipping_id: 3,
          order_id: 6,
        },
        {
          id: 36,
          user_id: 'auth0|ghi32109',
          product_id: 11,
          quantity: 2,
          purchased_at: '2023-04-10 15:00:00',
          shipping_id: 3,
          order_id: 6,
        },
        {
          id: 37,
          user_id: 'auth0|ghi32109',
          product_id: 10,
          quantity: 8,
          purchased_at: '2023-04-10 15:00:00',
          shipping_id: 3,
          order_id: 6,
        },
        {
          id: 38,
          user_id: 'auth0|ghi32109',
          product_id: 3,
          quantity: 6,
          purchased_at: '2023-04-10 15:00:00',
          shipping_id: 3,
          order_id: 6,
        },
        {
          id: 39,
          user_id: 'auth0|ghi32109',
          product_id: 15,
          quantity: 1,
          purchased_at: '2023-04-10 15:00:00',
          shipping_id: 3,
          order_id: 6,
        },
        {
          id: 40,
          user_id: 'auth0|ghi32109',
          product_id: 19,
          quantity: 4,
          purchased_at: '2023-04-10 15:00:00',
          shipping_id: 3,
          order_id: 6,
        },
        {
          id: 41,
          user_id: 'auth0|uvw54321',
          product_id: 18,
          quantity: 2,
          purchased_at: '2023-05-02 8:00:00',
          shipping_id: 1,
          order_id: 7,
        },
        {
          id: 42,
          user_id: 'auth0|uvw54321',
          product_id: 20,
          quantity: 5,
          purchased_at: '2023-05-02 8:00:00',
          shipping_id: 1,
          order_id: 7,
        },
        {
          id: 43,
          user_id: 'auth0|uvw54321',
          product_id: 7,
          quantity: 7,
          purchased_at: '2023-05-02 8:00:00',
          shipping_id: 1,
          order_id: 7,
        },
        {
          id: 44,
          user_id: 'auth0|uvw54321',
          product_id: 14,
          quantity: 3,
          purchased_at: '2023-05-02 8:00:00',
          shipping_id: 1,
          order_id: 7,
        },
        {
          id: 45,
          user_id: 'auth0|uvw54321',
          product_id: 11,
          quantity: 6,
          purchased_at: '2023-05-02 8:00:00',
          shipping_id: 1,
          order_id: 7,
        },
        {
          id: 46,
          user_id: 'auth0|uvw54321',
          product_id: 1,
          quantity: 1,
          purchased_at: '2023-05-02 8:00:00',
          shipping_id: 1,
          order_id: 7,
        },
        {
          id: 47,
          user_id: 'auth0|uvw54321',
          product_id: 17,
          quantity: 4,
          purchased_at: '2023-05-02 8:00:00',
          shipping_id: 1,
          order_id: 7,
        },
        {
          id: 48,
          user_id: 'auth0|hij23456',
          product_id: 5,
          quantity: 3,
          purchased_at: '2023-05-15 14:20:00',
          shipping_id: 2,
          order_id: 8,
        },
        {
          id: 49,
          user_id: 'auth0|hij23456',
          product_id: 10,
          quantity: 2,
          purchased_at: '2023-05-15 14:20:00',
          shipping_id: 2,
          order_id: 8,
        },
        {
          id: 50,
          user_id: 'auth0|hij23456',
          product_id: 12,
          quantity: 5,
          purchased_at: '2023-05-15 14:20:00',
          shipping_id: 2,
          order_id: 8,
        },
        {
          id: 51,
          user_id: 'auth0|hij23456',
          product_id: 13,
          quantity: 1,
          purchased_at: '2023-05-15 14:20:00',
          shipping_id: 2,
          order_id: 8,
        },
        {
          id: 52,
          user_id: 'auth0|hij23456',
          product_id: 9,
          quantity: 6,
          purchased_at: '2023-05-15 14:20:00',
          shipping_id: 2,
          order_id: 8,
        },
        {
          id: 53,
          user_id: 'auth0|hij23456',
          product_id: 6,
          quantity: 8,
          purchased_at: '2023-05-15 14:20:00',
          shipping_id: 2,
          order_id: 8,
        },
        {
          id: 54,
          user_id: 'auth0|hij23456',
          product_id: 18,
          quantity: 4,
          purchased_at: '2023-05-15 14:20:00',
          shipping_id: 2,
          order_id: 8,
        },
        {
          id: 55,
          user_id: 'auth0|klm78901',
          product_id: 8,
          quantity: 5,
          purchased_at: '2023-06-05 17:00:00',
          shipping_id: 3,
          order_id: 9,
        },
        {
          id: 56,
          user_id: 'auth0|klm78901',
          product_id: 4,
          quantity: 1,
          purchased_at: '2023-06-05 17:00:00',
          shipping_id: 3,
          order_id: 9,
        },
        {
          id: 57,
          user_id: 'auth0|klm78901',
          product_id: 16,
          quantity: 3,
          purchased_at: '2023-06-05 17:00:00',
          shipping_id: 3,
          order_id: 9,
        },
        {
          id: 58,
          user_id: 'auth0|klm78901',
          product_id: 3,
          quantity: 6,
          purchased_at: '2023-06-05 17:00:00',
          shipping_id: 3,
          order_id: 9,
        },
        {
          id: 59,
          user_id: 'auth0|klm78901',
          product_id: 20,
          quantity: 2,
          purchased_at: '2023-06-05 17:00:00',
          shipping_id: 3,
          order_id: 9,
        },
        {
          id: 60,
          user_id: 'auth0|klm78901',
          product_id: 14,
          quantity: 4,
          purchased_at: '2023-06-05 17:00:00',
          shipping_id: 3,
          order_id: 9,
        },
        {
          id: 61,
          user_id: 'auth0|klm78901',
          product_id: 2,
          quantity: 7,
          purchased_at: '2023-06-05 17:00:00',
          shipping_id: 3,
          order_id: 9,
        },
        {
          id: 62,
          user_id: 'auth0|bcd34567',
          product_id: 1,
          quantity: 1,
          purchased_at: '2023-06-20 9:45:00',
          shipping_id: 1,
          order_id: 10,
        },
        {
          id: 63,
          user_id: 'auth0|bcd34567',
          product_id: 15,
          quantity: 8,
          purchased_at: '2023-06-20 9:45:00',
          shipping_id: 1,
          order_id: 10,
        },
        {
          id: 64,
          user_id: 'auth0|bcd34567',
          product_id: 19,
          quantity: 6,
          purchased_at: '2023-06-20 9:45:00',
          shipping_id: 1,
          order_id: 10,
        },
        {
          id: 65,
          user_id: 'auth0|bcd34567',
          product_id: 17,
          quantity: 3,
          purchased_at: '2023-06-20 9:45:00',
          shipping_id: 1,
          order_id: 10,
        },
        {
          id: 66,
          user_id: 'auth0|bcd34567',
          product_id: 7,
          quantity: 4,
          purchased_at: '2023-06-20 9:45:00',
          shipping_id: 1,
          order_id: 10,
        },
        {
          id: 67,
          user_id: 'auth0|bcd34567',
          product_id: 2,
          quantity: 2,
          purchased_at: '2023-06-20 9:45:00',
          shipping_id: 1,
          order_id: 10,
        },
        {
          id: 68,
          user_id: 'auth0|bcd34567',
          product_id: 13,
          quantity: 5,
          purchased_at: '2023-06-20 9:45:00',
          shipping_id: 1,
          order_id: 10,
        },
        {
          id: 69,
          user_id: 'auth0|abc12345',
          product_id: 9,
          quantity: 1,
          purchased_at: '2023-07-02 12:10:00',
          shipping_id: 2,
          order_id: 11,
        },
        {
          id: 70,
          user_id: 'auth0|abc12345',
          product_id: 10,
          quantity: 6,
          purchased_at: '2023-07-02 12:10:00',
          shipping_id: 2,
          order_id: 11,
        },
        {
          id: 71,
          user_id: 'auth0|abc12345',
          product_id: 14,
          quantity: 5,
          purchased_at: '2023-07-02 12:10:00',
          shipping_id: 2,
          order_id: 11,
        },
        {
          id: 72,
          user_id: 'auth0|abc12345',
          product_id: 4,
          quantity: 3,
          purchased_at: '2023-07-02 12:10:00',
          shipping_id: 2,
          order_id: 11,
        },
        {
          id: 73,
          user_id: 'auth0|abc12345',
          product_id: 5,
          quantity: 7,
          purchased_at: '2023-07-02 12:10:00',
          shipping_id: 2,
          order_id: 11,
        },
        {
          id: 74,
          user_id: 'auth0|abc12345',
          product_id: 6,
          quantity: 4,
          purchased_at: '2023-07-02 12:10:00',
          shipping_id: 2,
          order_id: 11,
        },
        {
          id: 75,
          user_id: 'auth0|abc12345',
          product_id: 8,
          quantity: 2,
          purchased_at: '2023-07-02 12:10:00',
          shipping_id: 2,
          order_id: 11,
        },
        {
          id: 76,
          user_id: 'auth0|def67890',
          product_id: 8,
          quantity: 5,
          purchased_at: '2023-07-15 18:25:00',
          shipping_id: 3,
          order_id: 12,
        },
        {
          id: 77,
          user_id: 'auth0|def67890',
          product_id: 1,
          quantity: 4,
          purchased_at: '2023-07-15 18:25:00',
          shipping_id: 3,
          order_id: 12,
        },
        {
          id: 78,
          user_id: 'auth0|def67890',
          product_id: 13,
          quantity: 7,
          purchased_at: '2023-07-15 18:25:00',
          shipping_id: 3,
          order_id: 12,
        },
        {
          id: 79,
          user_id: 'auth0|def67890',
          product_id: 6,
          quantity: 1,
          purchased_at: '2023-07-15 18:25:00',
          shipping_id: 3,
          order_id: 12,
        },
        {
          id: 80,
          user_id: 'auth0|def67890',
          product_id: 20,
          quantity: 5,
          purchased_at: '2023-07-15 18:25:00',
          shipping_id: 3,
          order_id: 12,
        },
        {
          id: 81,
          user_id: 'auth0|def67890',
          product_id: 11,
          quantity: 3,
          purchased_at: '2023-07-15 18:25:00',
          shipping_id: 3,
          order_id: 12,
        },
        {
          id: 82,
          user_id: 'auth0|def67890',
          product_id: 9,
          quantity: 2,
          purchased_at: '2023-07-15 18:25:00',
          shipping_id: 3,
          order_id: 12,
        },
        {
          id: 83,
          user_id: 'auth0|xyz45678',
          product_id: 15,
          quantity: 6,
          purchased_at: '2023-07-21 8:45:00',
          shipping_id: 1,
          order_id: 13,
        },
        {
          id: 84,
          user_id: 'auth0|xyz45678',
          product_id: 18,
          quantity: 8,
          purchased_at: '2023-07-21 8:45:00',
          shipping_id: 1,
          order_id: 13,
        },
        {
          id: 85,
          user_id: 'auth0|xyz45678',
          product_id: 3,
          quantity: 3,
          purchased_at: '2023-07-21 8:45:00',
          shipping_id: 1,
          order_id: 13,
        },
        {
          id: 86,
          user_id: 'auth0|xyz45678',
          product_id: 5,
          quantity: 5,
          purchased_at: '2023-07-21 8:45:00',
          shipping_id: 1,
          order_id: 13,
        },
        {
          id: 87,
          user_id: 'auth0|xyz45678',
          product_id: 14,
          quantity: 1,
          purchased_at: '2023-07-21 8:45:00',
          shipping_id: 1,
          order_id: 13,
        },
        {
          id: 88,
          user_id: 'auth0|xyz45678',
          product_id: 10,
          quantity: 2,
          purchased_at: '2023-07-21 8:45:00',
          shipping_id: 1,
          order_id: 13,
        },
        {
          id: 89,
          user_id: 'auth0|xyz45678',
          product_id: 4,
          quantity: 6,
          purchased_at: '2023-07-21 8:45:00',
          shipping_id: 1,
          order_id: 13,
        },
        {
          id: 90,
          user_id: 'auth0|pqr98765',
          product_id: 1,
          quantity: 7,
          purchased_at: '2023-07-24 15:30:00',
          shipping_id: 2,
          order_id: 14,
        },
        {
          id: 91,
          user_id: 'auth0|pqr98765',
          product_id: 17,
          quantity: 5,
          purchased_at: '2023-07-24 15:30:00',
          shipping_id: 2,
          order_id: 14,
        },
        {
          id: 92,
          user_id: 'auth0|pqr98765',
          product_id: 5,
          quantity: 3,
          purchased_at: '2023-07-24 15:30:00',
          shipping_id: 2,
          order_id: 14,
        },
        {
          id: 93,
          user_id: 'auth0|pqr98765',
          product_id: 19,
          quantity: 2,
          purchased_at: '2023-07-24 15:30:00',
          shipping_id: 2,
          order_id: 14,
        },
        {
          id: 94,
          user_id: 'auth0|pqr98765',
          product_id: 7,
          quantity: 8,
          purchased_at: '2023-07-24 15:30:00',
          shipping_id: 2,
          order_id: 14,
        },
        {
          id: 95,
          user_id: 'auth0|pqr98765',
          product_id: 15,
          quantity: 4,
          purchased_at: '2023-07-24 15:30:00',
          shipping_id: 2,
          order_id: 14,
        },
        {
          id: 96,
          user_id: 'auth0|pqr98765',
          product_id: 8,
          quantity: 1,
          purchased_at: '2023-07-24 15:30:00',
          shipping_id: 2,
          order_id: 14,
        },
        {
          id: 97,
          user_id: 'auth0|lmn65432',
          product_id: 2,
          quantity: 6,
          purchased_at: '2023-07-27 11:20:00',
          shipping_id: 3,
          order_id: 15,
        },
        {
          id: 98,
          user_id: 'auth0|lmn65432',
          product_id: 13,
          quantity: 3,
          purchased_at: '2023-07-27 11:20:00',
          shipping_id: 3,
          order_id: 15,
        },
        {
          id: 99,
          user_id: 'auth0|lmn65432',
          product_id: 16,
          quantity: 5,
          purchased_at: '2023-07-27 11:20:00',
          shipping_id: 3,
          order_id: 15,
        },
        {
          id: 100,
          user_id: 'auth0|lmn65432',
          product_id: 12,
          quantity: 1,
          purchased_at: '2023-07-27 11:20:00',
          shipping_id: 3,
          order_id: 15,
        },
        {
          id: 101,
          user_id: 'auth0|lmn65432',
          product_id: 20,
          quantity: 6,
          purchased_at: '2023-07-27 11:20:00',
          shipping_id: 3,
          order_id: 15,
        },
        {
          id: 102,
          user_id: 'auth0|ghi32109',
          product_id: 6,
          quantity: 3,
          purchased_at: '2023-07-30 17:50:00',
          shipping_id: 1,
          order_id: 16,
        },
        {
          id: 103,
          user_id: 'auth0|ghi32109',
          product_id: 4,
          quantity: 5,
          purchased_at: '2023-07-30 17:50:00',
          shipping_id: 1,
          order_id: 16,
        },
        {
          id: 104,
          user_id: 'auth0|ghi32109',
          product_id: 11,
          quantity: 2,
          purchased_at: '2023-07-30 17:50:00',
          shipping_id: 1,
          order_id: 16,
        },
        {
          id: 105,
          user_id: 'auth0|ghi32109',
          product_id: 10,
          quantity: 8,
          purchased_at: '2023-07-30 17:50:00',
          shipping_id: 1,
          order_id: 16,
        },
        {
          id: 106,
          user_id: 'auth0|ghi32109',
          product_id: 3,
          quantity: 6,
          purchased_at: '2023-07-30 17:50:00',
          shipping_id: 1,
          order_id: 16,
        },
        {
          id: 107,
          user_id: 'auth0|ghi32109',
          product_id: 15,
          quantity: 1,
          purchased_at: '2023-07-30 17:50:00',
          shipping_id: 1,
          order_id: 16,
        },
        {
          id: 108,
          user_id: 'auth0|ghi32109',
          product_id: 19,
          quantity: 4,
          purchased_at: '2023-07-30 17:50:00',
          shipping_id: 1,
          order_id: 16,
        },
        {
          id: 109,
          user_id: 'auth0|uvw54321',
          product_id: 18,
          quantity: 2,
          purchased_at: '2023-07-31 20:10:00',
          shipping_id: 2,
          order_id: 17,
        },
        {
          id: 110,
          user_id: 'auth0|uvw54321',
          product_id: 20,
          quantity: 5,
          purchased_at: '2023-07-31 20:10:00',
          shipping_id: 2,
          order_id: 17,
        },
        {
          id: 111,
          user_id: 'auth0|uvw54321',
          product_id: 7,
          quantity: 7,
          purchased_at: '2023-07-31 20:10:00',
          shipping_id: 2,
          order_id: 17,
        },
        {
          id: 112,
          user_id: 'auth0|uvw54321',
          product_id: 14,
          quantity: 3,
          purchased_at: '2023-07-31 20:10:00',
          shipping_id: 2,
          order_id: 17,
        },
        {
          id: 113,
          user_id: 'auth0|uvw54321',
          product_id: 11,
          quantity: 6,
          purchased_at: '2023-07-31 20:10:00',
          shipping_id: 2,
          order_id: 17,
        },
        {
          id: 114,
          user_id: 'auth0|uvw54321',
          product_id: 1,
          quantity: 1,
          purchased_at: '2023-07-31 20:10:00',
          shipping_id: 2,
          order_id: 17,
        },
        {
          id: 115,
          user_id: 'auth0|uvw54321',
          product_id: 17,
          quantity: 4,
          purchased_at: '2023-07-31 20:10:00',
          shipping_id: 2,
          order_id: 17,
        },
        {
          id: 116,
          user_id: 'auth0|hij23456',
          product_id: 5,
          quantity: 3,
          purchased_at: '2023-07-31 22:45:00',
          shipping_id: 3,
          order_id: 18,
        },
        {
          id: 117,
          user_id: 'auth0|hij23456',
          product_id: 10,
          quantity: 2,
          purchased_at: '2023-07-31 22:45:00',
          shipping_id: 3,
          order_id: 18,
        },
        {
          id: 118,
          user_id: 'auth0|hij23456',
          product_id: 12,
          quantity: 5,
          purchased_at: '2023-07-31 22:45:00',
          shipping_id: 3,
          order_id: 18,
        },
        {
          id: 119,
          user_id: 'auth0|hij23456',
          product_id: 13,
          quantity: 1,
          purchased_at: '2023-07-31 22:45:00',
          shipping_id: 3,
          order_id: 18,
        },
        {
          id: 120,
          user_id: 'auth0|hij23456',
          product_id: 9,
          quantity: 6,
          purchased_at: '2023-07-31 22:45:00',
          shipping_id: 3,
          order_id: 18,
        },
        {
          id: 121,
          user_id: 'auth0|hij23456',
          product_id: 6,
          quantity: 8,
          purchased_at: '2023-07-31 22:45:00',
          shipping_id: 3,
          order_id: 18,
        },
        {
          id: 122,
          user_id: 'auth0|hij23456',
          product_id: 18,
          quantity: 4,
          purchased_at: '2023-07-31 22:45:00',
          shipping_id: 3,
          order_id: 18,
        },
        {
          id: 123,
          user_id: 'auth0|klm78901',
          product_id: 8,
          quantity: 5,
          purchased_at: '2023-07-31 23:59:59',
          shipping_id: 1,
          order_id: 19,
        },
        {
          id: 124,
          user_id: 'auth0|klm78901',
          product_id: 4,
          quantity: 1,
          purchased_at: '2023-07-31 23:59:59',
          shipping_id: 1,
          order_id: 19,
        },
        {
          id: 125,
          user_id: 'auth0|klm78901',
          product_id: 16,
          quantity: 3,
          purchased_at: '2023-07-31 23:59:59',
          shipping_id: 1,
          order_id: 19,
        },
        {
          id: 126,
          user_id: 'auth0|klm78901',
          product_id: 3,
          quantity: 6,
          purchased_at: '2023-07-31 23:59:59',
          shipping_id: 1,
          order_id: 19,
        },
        {
          id: 127,
          user_id: 'auth0|klm78901',
          product_id: 20,
          quantity: 2,
          purchased_at: '2023-07-31 23:59:59',
          shipping_id: 1,
          order_id: 19,
        },
        {
          id: 128,
          user_id: 'auth0|klm78901',
          product_id: 14,
          quantity: 4,
          purchased_at: '2023-07-31 23:59:59',
          shipping_id: 1,
          order_id: 19,
        },
        {
          id: 129,
          user_id: 'auth0|klm78901',
          product_id: 2,
          quantity: 7,
          purchased_at: '2023-07-31 23:59:59',
          shipping_id: 1,
          order_id: 19,
        },
      ])
    })
}
