import { useQuery } from 'react-query'
import { getOrderCountFromDate } from '../../../services/orders'
import { countUnreadEmailsFromDate } from '../../../services/emails'
import { getCountOfReviewsFromDate } from '../../../services/reviews'
import { countProductsBelowStockThreshold } from '../../../services/products'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import { useNavigate } from 'react-router-dom'
import { getDemoUserDetails } from '../../../services/users'
import { generateCurrentDate } from '../../../utils/generateDate'

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

  const profileQuery = useQuery('getDemoUserDetails', async () =>
    getDemoUserDetails()
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

  const lowStockQuery = useQuery('countProductsBelowStockThreshold', async () =>
    countProductsBelowStockThreshold(stockThreshold)
  )
  const statuses = [
    orderCountStatus,
    profileQuery.status,
    unreadEmailCountStatus,
    reviewsCountStatus,
    lowStockQuery.status,
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
            onClick={() => goTo('/admin/orders')}
          >
            View Orders
          </button>
        </div>

        {/* Low Stock */}
        <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl mb-2 text-red-500">Low Stock Alert!</h1>
            <div className="flex flex-row justify-center gap-7">
              {/* //!NEED ADDITIONAL FUNCTION TO GET THE LOW STOCK PRODUCTS THEMSELVES?
              lowStockQuery.data?.lowStockProducts.map(
                (product: AdminProduct) => (
                  <div key={product.id}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-28"
                    />
                  </div>
                )
              )
              */}
            </div>
          </div>
          <button
            className="bg-black rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all mt-4"
            onClick={() => goTo('/admin/products-summary')}
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
          >
            View Reviews
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
