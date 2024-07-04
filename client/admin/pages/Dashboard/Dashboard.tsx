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
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  const formattedDate = new Date().toISOString().split('T')[0]

  const orderAmountQuery = useQuery('fetchAmountOfOrdersByDate', async () => {
    return getOrderCountFromDate(formattedDate)
  })

  const profileQuery = useQuery('fetchUser', async () => {
    return getDemoUserDetails()
  })

  const emailQuery = useQuery('fetchAmountOfUnreadEmailsByToday', async () => {
    const currentDate = generateCurrentDate()
    return countUnreadEmailsFromDate(currentDate)
  })

  const reviewAmountQuery = useQuery('fetchAmountOfReviewsByDate', async () => {
    return getCountOfReviewsFromDate(formattedDate)
  })

  const lowStockQuery = useQuery(
    'fetchAmountOfProductsBelowStockLevel',
    async () => {
      const stockThreshold = 5
      return countProductsBelowStockThreshold(stockThreshold)
    }
  )
  const statuses = [
    orderAmountQuery.status,
    profileQuery.status,
    emailQuery.status,
    reviewAmountQuery.status,
    lowStockQuery.status,
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <LoadError status={statuses} />
      <div className="bg-white text-black w-1/2 rounded-lg shadow-lg mt-4 p-4">
        <div className="text-2xl m-4">Hi, {profileQuery.data?.firstName}!</div>
        {/* Orders */}
        <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center mb-4 min">
          <div>
            <h1 className="text-2xl mb-2">
              You have {orderAmountQuery.data} orders today
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

              {
              /* //!NEED ADDITIONAL FUNCTION TO GET THE LOW STOCK PRODUCTS THEMSELVES?
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
              */  
              }
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
              You have {emailQuery.data} new emails today
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
              You have {/* //! I don't know why this following code is causing an error:
               reviewAmountQuery.data?.reviewCount */} reviews today
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
