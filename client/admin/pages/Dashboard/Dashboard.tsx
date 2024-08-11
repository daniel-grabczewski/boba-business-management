import { useQuery } from 'react-query'
import { getOrderCountFromDate } from '../../../services/orders'
import { countUnreadEmailsFromDate } from '../../../services/emails'
import { getCountOfReviewsFromDate } from '../../../services/reviews'
import { getProductsBelowStockThreshold } from '../../../services/products'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import { useNavigate } from 'react-router-dom'
import { generateCurrentDate } from '../../../utils/generateDate'
import { LowStockProduct } from '../../../../models/Products'

const Dashboard = () => {
  const stockThreshold = 5
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  // Generate today's date as YYYY-MM-DD HH:MM:SS
  const dateOfToday = generateCurrentDate()

  // Get count of orders that were made on today's date
  const { data: orderCount, status: orderCountStatus } = useQuery(
    'getOrderCountFromDate',
    async () => getOrderCountFromDate(dateOfToday)
  )

  // Get count of emails that were received today, which are also unread
  const { data: unreadEmailCount, status: unreadEmailCountStatus } = useQuery(
    'countUnreadEmailsFromDate',
    async () => countUnreadEmailsFromDate(dateOfToday)
  )

  // Get count of reviews that were made on today's date
  const { data: reviewsCount, status: reviewsCountStatus } = useQuery(
    'getCountOfReviewsFromDate',
    async () => getCountOfReviewsFromDate(dateOfToday)
  )

  const { data: lowStockProducts, status: lowStockProductsStatus } = useQuery(
    'getProductsBelowStockThreshold',
    async () => getProductsBelowStockThreshold(stockThreshold)
  )

  const statuses = [
    orderCountStatus,
    unreadEmailCountStatus,
    reviewsCountStatus,
    lowStockProductsStatus,
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <LoadError status={statuses} />
      <h1 className="text-center text-4xl font-semibold mb-4 mt-4">
        Dashboard
      </h1>
      <div className="bg-white text-black w-1/2 rounded-lg shadow-lg mt-4 p-4">
        {/* Orders */}
        <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center mb-4 min">
          <div>
            <h1 className="text-2xl mb-2">
              You have {orderCount} new order{orderCount !== 1 ? 's' : ''} today
            </h1>
          </div>
          <button
            className="bg-black rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all"
            style={{ minWidth: '130px' }}
            onClick={() => goTo('/admin/orders')}
          >
            View Orders
          </button>
        </div>

        {/* Low Stock */}
        <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl mb-2 text-red-500 mb-4 font-semibold">
              Low Stock Alert!
            </h1>
            <div className="flex flex-row justify-center gap-7">
              {lowStockProducts &&
                lowStockProducts.length > 0 &&
                lowStockProducts.map((product: LowStockProduct) => (
                  <div
                    key={product.id}
                    className="flex flex-col items-center bg-gray-300 rounded-md p-2 border border-red-500 border-2"
                    style={{ maxWidth: '150px', minWidth: '150px' }}
                  >
                    <p className="text-red-500 mb-2 font-semibold">
                      {product.stock} left in stock
                    </p>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-28 object-contain"
                      style={{ maxHeight: '112px' }}
                    />
                    <p className="mt-2 text-center">{product.name}</p>
                  </div>
                ))}
            </div>
          </div>
          <button
            className="bg-black rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all mt-4"
            onClick={() => goTo('/admin/products-summary')}
            style={{ minWidth: '130px' }}
          >
            Restock
          </button>
        </div>

        {/* Emails */}
        <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl mb-2">
              You have {unreadEmailCount} unread email
              {unreadEmailCount !== 1 ? 's' : ''} today
            </h1>
          </div>
          <button
            className="bg-black rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all"
            onClick={() => goTo('/admin/inbox')}
            style={{ minWidth: '130px' }}
          >
            View Emails
          </button>
        </div>

        {/* Reviews */}
        <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
          <div>
            <h1 className="text-2xl mb-2">
              You have {reviewsCount} new review{reviewsCount !== 1 ? 's' : ''}{' '}
              today
            </h1>
          </div>
          <button
            className="bg-black rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all"
            onClick={() => goTo('/admin/reviews')}
            style={{ minWidth: '130px' }}
          >
            View Reviews
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
