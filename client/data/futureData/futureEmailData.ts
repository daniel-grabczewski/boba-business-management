import { Email } from '../../../models/Emails'

//put data here with empty createdAt, etc, and empty ID? And then it is periodically added in the local storage function from here, using getRandomDateTimeWithinLastDays(1), to generate a time that happened in the same day, but within x hours before the current time. (will need to test if this works to create it on the same day.)

export const futureEmails: Email[] = [
  {
    id: 1,
    userId: 'auth0|abc65432',
    isRead: false,
    title: 'Order Delay',
    description:
      "There's been a delay in my order. Can you look into it for me? Please email me back for any updates in the tracking details. Thx.",
    createdAt: '',
  },
  {
    id: 2,
    userId: 'auth0|def12345',
    isRead: false,
    title: 'Excellent Product Packaging',
    description:
      'Hey peeps! Just want to let you know you guys are doing an awesome job. Thanks for bringing quality boba in NZ. And also letting me buy it from the comfort of home hahahaha.',
    createdAt: '',
  },
  {
    id: 3,
    userId: 'auth0|jkl65432',
    isRead: false,
    title: 'Wrong Item Received',
    description:
      'Hi, I received my order today, but unfortunately, one of the items was incorrect. I ordered Original Milk Tea, but I received Oolong Milk Tea instead. Can you please assist me with resolving this issue? Thanks, Grace Green',
    createdAt: '',
  },
  {
    id: 4,
    userId: 'auth0|mno98765',
    isRead: false,
    title: 'Product Quality Issue',
    description:
      'Hello, I wanted to report an issue with the quality of the drinks I received in my recent order. The Brown Sugar Milk Tea tasted off, and the pearls were hard. Could you please look into this and let me know how it can be resolved? Thank you, Daniel Baker',
    createdAt: '',
  },
  {
    id: 5,
    userId: 'auth0|pqr34567',
    isRead: false,
    title: 'Thank You!',
    description:
      'Hi there, I just wanted to say thank you for the amazing service. My order arrived quickly and everything was perfect. The Oolong Milk Tea is my favorite! Keep up the great work! Regards, Chloe Wright',
    createdAt: '',
  },
  {
    id: 6,
    userId: 'auth0|stu78901',
    isRead: false,
    title: 'Request for New Flavors',
    description:
      "Hello, I'm a regular customer and absolutely love your drinks. I was wondering if you have any plans to introduce new flavors in the near future? It would be great to see some new additions to the menu. Thanks, Samuel Adams",
    createdAt: '',
  },
  {
    id: 7,
    userId: 'auth0|vwx54321',
    isRead: false,
    title: 'Feedback on Matcha Milk Tea',
    description:
      'Hi, I recently tried the Matcha Milk Tea and wanted to share my feedback. The matcha flavor was quite strong, and I found it a bit overwhelming. Perhaps a milder version would be better. Best regards, Avery Clark',
    createdAt: '',
  },
  {
    id: 8,
    userId: 'auth0|yzx23456',
    isRead: false,
    title: 'Order Never Arrived',
    description:
      "Hello, I'm writing to inform you that my order, placed over a week ago, has not arrived yet. Can you please check the status and let me know when I can expect it?",
    createdAt: '',
  },
  {
    id: 9,
    userId: 'auth0|abc87654',
    isRead: false,
    title: 'Excellent Customer Service',
    description:
      'Hi there, I wanted to commend your team for the excellent customer service. I had an issue with my order, and it was resolved quickly and efficiently. The Brown Sugar Milk Tea and Pearls were delicious!',
    createdAt: '',
  },
  {
    id: 10,
    userId: 'auth0|def23456',
    isRead: false,
    title: 'Damaged Packaging',
    description:
      'Hello, I received my order today, but the packaging was damaged, and one of the drinks had spilled. Can you please look into this and arrange for a replacement? Thanks, Sebastian Perez',
    createdAt: '',
  },
  {
    id: 11,
    userId: 'auth0|ghi87654',
    isRead: false,
    title: 'Complaint About Delivery',
    description:
      "Hi, I'm writing to complain about the delivery service. My order was left at the wrong address, and I had to retrieve it from my neighbor. This is unacceptable. Please ensure that future deliveries are made correctly.",
    createdAt: '',
  },
  {
    id: 12,
    userId: 'auth0|jkl54321',
    isRead: false,
    title: 'Praise for Jasmine Tea',
    description:
      'Hello, I just wanted to let you know that the Jasmine Tea is fantastic! The aroma and taste are perfect. I’ll definitely be ordering more soon. Thanks, Jackson Carter',
    createdAt: '',
  },
  {
    id: 13,
    userId: 'auth0|mno12345',
    isRead: false,
    title: 'Query About Ingredients',
    description:
      "Hi, I love your drinks but have a query about the ingredients. Are the milk teas made with dairy milk or a non-dairy alternative? I'm lactose intolerant and need to know before placing my next order.",
    createdAt: '',
  },
  {
    id: 14,
    userId: 'auth0|pqr78901',
    isRead: false,
    title: 'Suggestion for Improvement',
    description:
      'Hello, I have a suggestion for your packaging. It would be great if you could use eco-friendly materials. I’m sure many of your customers would appreciate it.',
    createdAt: '',
  },
  {
    id: 15,
    userId: 'auth0|stu65432',
    isRead: false,
    title: 'Order Arrived Late',
    description:
      'Hi, I placed an order a week ago, and it just arrived today. The delay was quite inconvenient. Can you please ensure faster delivery in the future? Thank you.',
    createdAt: '',
  },
  {
    id: 16,
    userId: 'auth0|vwx34567',
    isRead: false,
    title: 'Amazing Taro Smoothie',
    description:
      'Hello, I wanted to let you know that the Taro Smoothie is amazing! The texture and taste are perfect. I’ll definitely be ordering more. Best, Ethan Campbell',
    createdAt: '',
  },
  {
    id: 17,
    userId: 'auth0|yzx12345',
    isRead: false,
    title: 'Disappointed with Order',
    description:
      "Hi, I'm disappointed with my recent order. The drinks were warm upon arrival, and the packaging was damaged. Can you please look into this and ensure it doesn't happen again? Thank you, Victoria Stewart",
    createdAt: '',
  },
  {
    id: 18,
    userId: 'auth0|abc23456',
    isRead: false,
    title: 'Request for Larger Sizes',
    description:
      'Hello, I love your drinks and was wondering if you plan to offer larger sizes in the future? It would be great to have a bigger serving option. Thanks, Matthew Morris',
    createdAt: '',
  },
  {
    id: 19,
    userId: 'auth0|def98765',
    isRead: false,
    title: 'Issue with Subscription',
    description:
      'Hi, I signed up for a subscription service but didn’t receive my first order on the scheduled date. Can you please check and update me on the status? Thanks so much.',
    createdAt: '',
  },
  {
    id: 20,
    userId: 'auth0|ghi54321',
    isRead: false,
    title: 'Compliment on Kiwifruit Tea',
    description:
      'Hello, I wanted to compliment you on the Kiwifruit Tea. It’s tangy, refreshing, and perfect for any time of the day. Keep up the great work! Best, Joseph Reed',
    createdAt: '',
  },
  {
    id: 21,
    userId: 'auth0|jkl78901',
    isRead: false,
    title: 'Packaging Issue',
    description:
      'Hi, I received my order today, but the packaging was not secure, and one of the drinks spilled. Can you please look into improving the packaging? It should be at the top of your priorities.',
    createdAt: '',
  },
  {
    id: 22,
    userId: 'auth0|uvw54321',
    isRead: false,
    title: 'Order Never Arrived',
    description:
      "Hello, I placed an order over a week ago, and it still hasn't arrived. Can you please check the status and let me know when I can expect it? Thanks, Isla Davis",
    createdAt: '',
  },
  {
    id: 23,
    userId: 'auth0|hij23456',
    isRead: false,
    title: 'Feedback on Green Tea',
    description:
      "Hi, I wanted to share my feedback on the Green Tea. It's a bit too bitter for my taste. Maybe consider a milder blend?",
    createdAt: '',
  },
  {
    id: 24,
    userId: 'auth0|klm78901',
    isRead: false,
    title: 'Suggestion for New Flavors',
    description:
      'Hello, I’m a big fan of your drinks and wanted to suggest adding new flavors, maybe something fruity or tropical. It would be great to have more variety.',
    createdAt: '',
  },
  {
    id: 25,
    userId: 'auth0|bcd34567',
    isRead: false,
    title: 'Appreciation for Quick Delivery',
    description:
      'Hi, I just wanted to say thank you for the quick delivery. My order arrived in perfect condition and much earlier than expected. Great service! Regards, Leo Moore',
    createdAt: '',
  },
  {
    id: 26,
    userId: 'auth0|abc98765',
    isRead: false,
    title: 'Query About Loyalty Program',
    description:
      "Hi, I'm interested in your loyalty program and would like to know more about how it works. Can you please provide some details?",
    createdAt: '',
  },
  {
    id: 27,
    userId: 'auth0|def67890',
    isRead: false,
    title: 'Problem with Order',
    description:
      'Hello, I received my order today, but one of the drinks was missing. Can you please send the missing item or arrange a refund? Thank you.',
    createdAt: '',
  },
  {
    id: 28,
    userId: 'auth0|ghi32109',
    isRead: false,
    title: 'Excellent Service',
    description:
      'My order was handled promptly, and the packaging was perfect. Great job! Best, Oliver Taylor',
    createdAt: '',
  },
  {
    id: 29,
    userId: 'auth0|uvw54321',
    isRead: false,
    title: 'Issue with Payment',
    description:
      "Hello, I had an issue with the payment process for my recent order. The transaction didn't go through, but the amount was deducted from my account. Can you please check and resolve this? Thanks",
    createdAt: '',
  },
  {
    id: 30,
    userId: 'auth0|hij23456',
    isRead: false,
    title: 'Praise for Customer Support',
    description:
      'Hi, I wanted to praise your customer support team for their quick and helpful response to my query. It was a pleasant experience dealing with them.',
    createdAt: '',
  },
  {
    id: 31,
    userId: 'auth0|klm78901',
    isRead: false,
    title: 'Problem with Order Tracking',
    description:
      "Hello, I'm having trouble tracking my recent order. The tracking number provided doesn't seem to be working. Can you please help me with this? Thank you, Charlotte Wilson",
    createdAt: '',
  },
]
