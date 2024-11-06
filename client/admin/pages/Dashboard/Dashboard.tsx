import { useQuery } from 'react-query'
import { getOrderCountFromDate } from '../../../services/orders'
import { countUnreadEmailsFromDate } from '../../../services/emails'
import { getCountOfReviewsFromDate } from '../../../services/reviews'
import { getProductsBelowStockThreshold } from '../../../services/products'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import { useNavigate } from 'react-router-dom'
import { generateCurrentDate } from '../../../utils/generateDate'
import { LowStockProduct } from '../../../../models/Products'
import { truncate } from '../../../utils/truncate'
import { lowStockThreshold } from '../../../data/lowStockThreshold'
import { baseURL } from '../../../../baseUrl'

const Dashboard = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(`${baseURL}${link}`)
  }

  // Generate today's date as YYYY-MM-DD HH:MM:SS
  const dateOfToday = generateCurrentDate()

  // Queries to fetch order, email, review, and low stock product data
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
    async () => getProductsBelowStockThreshold(lowStockThreshold)
  )

  const statuses = [
    orderCountStatus,
    unreadEmailCountStatus,
    reviewsCountStatus,
    lowStockProductsStatus,
  ]

  return (
    <div className="flex flex-col items-center p-4 justify-center my-10">
      <LoadError status={statuses} />
      <h1 className="text-center text-4xl font-semibold">Dashboard</h1>

      <div className="bg-white text-black w-full sm:w-3/4 xl:w-1/2 rounded-lg shadow-lg mt-4 p-6 space-y-6">
        {/* Orders */}
        <div className="bg-gray-200 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl mb-2">
              You have {orderCount} new order{orderCount !== 1 ? 's' : ''} today
            </h1>
          </div>
          <button
            className="bg-gray-500 rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all duration-300 min-w-[135px]"
            onClick={() => goTo('/admin/orders')}
          >
            View Orders
          </button>
        </div>

        {/* Low Stock */}
        {lowStockProducts && lowStockProducts.length === 0 ? (
          <div className="bg-gray-200 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl text-green-500 font-semibold">
              All Products are in stock
            </h1>
            <button
              className="bg-black rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all duration-300 min-w-[135px]"
              onClick={() => goTo('/admin/products-summary')}
            >
              View Products
            </button>
          </div>
        ) : (
          <div className="bg-gray-200 p-4 rounded-lg mb-4">
            <h1 className="text-xl sm:text-2xl mb-4 text-red-500 font-semibold">
              Low Stock Alert!
            </h1>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {lowStockProducts &&
                lowStockProducts.map((product: LowStockProduct) => (
                  <div
                    key={product.id}
                    onClick={() => goTo(`/admin/edit/${product.id}`)}
                    className="flex flex-col items-center bg-gray-300 rounded-md p-2 border-2 border-red-500 cursor-pointer"
                  >
                    <p className="text-red-500 mb-2 font-semibold">
                      {product.stock} left in stock
                    </p>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-20 md:h-28 object-contain"
                    />
                    <p className="mt-2 text-center text-sm md:text-base">
                      {truncate(product.name, 32)}
                    </p>
                  </div>
                ))}
            </div>
            <div className="flex justify-center sm:justify-end mt-4">
              <button
                className="bg-gray-500 rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all duration-300"
                onClick={() => {
                  localStorage.setItem('productSearch', JSON.stringify(''))
                  goTo('/admin/products-summary?sort=stock-low-to-high&page=1')
                }}
              >
                View Products
              </button>
            </div>
          </div>
        )}

        {/* Emails */}
        <div className="bg-gray-200 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl mb-2">
              You have {unreadEmailCount} unread email
              {unreadEmailCount !== 1 ? 's' : ''} today
            </h1>
          </div>
          <button
            className="bg-gray-500 rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all duration-300 min-w-[135px]"
            onClick={() => goTo('/admin/inbox')}
          >
            View Emails
          </button>
        </div>

        {/* Reviews */}
        <div className="bg-gray-200 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl mb-2">
              You have {reviewsCount} new review
              {reviewsCount !== 1 ? 's' : ''} today
            </h1>
          </div>
          <button
            className="bg-gray-500 rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all duration-300 min-w-[135px]"
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
