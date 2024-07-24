import { Email } from '../../models/Emails'
import { getRandomDateTimeWithinLastDays } from '../utils/generateDate'

const days = 120

// Define the emails data without date/time values
const emailsWithoutDateTime: Email[] = [
  {
    id: 1,
    userId: 'auth0|abc12345',
    isRead: false,
    title: 'Appreciation for Great Service',
    description:
      "Hey guys! I wanted to extend my gratitude for the excellent service I received from your team. My order arrived on time, and I'm delighted with the products' quality. The entire shopping experience was smooth and enjoyable. Thank you for providing outstanding service! Best regards, Emma Johnson",
    createdAt: '',
  },
  {
    id: 2,
    userId: 'auth0|def67890',
    isRead: false,
    title: 'Great Customer Service',
    description:
      'Hello Customer Support, I just wanted to take a moment to commend your excellent customer service. I had an issue with my order, and your team was quick to respond and resolve it. The support representative was friendly and helpful, making the whole process stress-free. Thank you for going above and beyond to assist me. Regards, Liam Smith',
    createdAt: '',
  },
  {
    id: 3,
    userId: 'auth0|xyz45678',
    isRead: false,
    title: 'Product Inquiry',
    description:
      'Hi there, I have a question about one of the products I recently ordered. I received my order and everything looks great except for one item. It seems to be a different variant from what I expected. Could you please clarify this for me? Thank you, Olivia Williams',
    createdAt: '',
  },
  {
    id: 4,
    userId: 'auth0|pqr98765',
    isRead: false,
    title: 'Inquiry About Return',
    description:
      'Hi, I hope you can help me with a return inquiry. I received my order and unfortunately, one of the products is not suitable for my needs. I would like to initiate a return and get a refund. Could you please guide me through the return process? Thanks, Noah Jones',
    createdAt: '',
  },
  {
    id: 5,
    userId: 'auth0|lmn65432',
    isRead: false,
    title: 'Order Delay',
    description:
      "Hello, I'm reaching out about my recent order, which was supposed to arrive a few days ago? Unfortunately, it seems to be delayed, and I haven't received it yet. Can you please check the status and update me? Thank you, Ava Brown",
    createdAt: '',
  },
  {
    id: 6,
    userId: 'auth0|ghi32109',
    isRead: false,
    title: 'Excellent Product Packaging',
    description:
      'Hello, I wanted to express my appreciation for the excellent packaging of my recent order. I received the items yesterday, and they were all securely packed, ensuring they arrived in perfect condition. Thank you for taking care of the packaging to ensure a great customer experience. Best regards, Oliver Taylor',
    createdAt: '',
  },
  {
    id: 7,
    userId: 'auth0|uvw54321',
    isRead: false,
    title: 'Feedback on Delivery',
    description:
      "Dear Support Team, I received my order today, and I'm satisfied with the products' quality. However, I noticed that one of the items was missing from the package. Could you please investigate this and arrange for the missing item to be sent to me? Thank you, Isla Davis",
    createdAt: '',
  },
  {
    id: 8,
    userId: 'auth0|hij23456',
    isRead: false,
    title: 'Disappointed with Product',
    description:
      "Hello, I'm writing to express my disappointment with one of the products I ordered. The item I received does not meet my expectations in terms of quality. I would like to request a refund for this product. Kindly assist me with the return process. Regards, Jack Evans",
    createdAt: '',
  },
  {
    id: 9,
    userId: 'auth0|klm78901',
    isRead: false,
    title: 'Positive Feedback',
    description:
      'Hello Team, I just wanted to drop a quick note to express my satisfaction with my recent purchase. The products I received are of excellent quality, and the shipping was faster than expected. I am impressed with the overall shopping experience. Keep up the good work! Best regards, Charlotte Wilson',
    createdAt: '',
  },
  {
    id: 10,
    userId: 'auth0|bcd34567',
    isRead: false,
    title: 'Issue with Order',
    description:
      "Hi, I hope you can help me with an issue I encountered with my order. The products I received were in good condition, but I didn't receive the correct quantity for one of the items. Can you please assist me in resolving this? Thank you, Leo Moore",
    createdAt: '',
  },
  {
    id: 11,
    userId: 'auth0|abc12345',
    isRead: false,
    title: 'Praise for Fast Shipping',
    description:
      "Yo! I'm writing to let you know that I'm impressed with the fast shipping of my recent order. The products arrived on time and everything is as expected. Thank you for the excellent service! Best regards, Emma Johnson",
    createdAt: '',
  },
  {
    id: 12,
    userId: 'auth0|def67890',
    isRead: false,
    title: 'Positive Review',
    description:
      'Hello, I just wanted to leave a positive review for the products I purchased. The order was delivered today and the quality of the items exceeded my expectations. I will definitely recommend your store to my friends. Thank you, Liam Smith',
    createdAt: '',
  },
  {
    id: 13,
    userId: 'auth0|xyz45678',
    isRead: false,
    title: 'Complaint About Damaged Product',
    description:
      "Hi, I received my order on 3 days ago, and unfortunately, one of the items arrived damaged. The product's packaging seemed intact, so it might have occurred during shipping. Can you please assist me with a replacement? Thanks, Olivia Williams",
    createdAt: '',
  },
  {
    id: 14,
    userId: 'auth0|uvw54321',
    isRead: false,
    title: 'Issue with Payment',
    description:
      "Dear Support, I'm having trouble with my recent order payment. I placed the order three days ago, but my card was charged twice for the same purchase. Kindly rectify this issue and refund the extra amount. Best regards, Isla Davis",
    createdAt: '',
  },
  {
    id: 15,
    userId: 'auth0|hij23456',
    isRead: false,
    title: 'Great Product Variety',
    description:
      "Hello, I'm delighted with the wide variety of products available in your store. I made a purchase a week ago and I'm happy with the items' quality. Your store has become my go-to for tea and beverage needs. Thank you, Jack Evans",
    createdAt: '',
  },
]

// Process the emails data to generate a random date/time within x days of the current date.
const emails = emailsWithoutDateTime.map((email) => ({
  ...email,
  createdAt: getRandomDateTimeWithinLastDays(days),
}))

export default emails
