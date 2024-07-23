import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { getDemoUserDetails } from '../../../services/users'
import {
  deleteReviewOfDemoUserByProductId,
  getReviewsOfDemoUser,
} from '../../../services/reviews'
import LoadError from '../../components/LoadError/LoadError'
import { ShopperDisplayReview } from '../../../../models/Reviews'
import { UserOrderSummary } from '../../../../models/Orders'
import { getDemoUserOrdersSummary } from '../../../services/orders'
import StarRating from '../../components/StarRating/StarRating'

const Profile = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  const { data: demoUserDetails, status: demoUserStatus } = useQuery(
    'getDemoUserDetails',
    async () => getDemoUserDetails()
  )

  const { data: reviews, status: reviewsStatus } = useQuery(
    'getReviewsOfDemoUser',
    async () => getReviewsOfDemoUser()
  )

  const { data: orders, status: ordersStatus } = useQuery(
    'getDemoUserOrdersSummary',
    async () => getDemoUserOrdersSummary()
  )

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const deleteReviewMutation = useMutation(
    async (productId: number) => deleteReviewOfDemoUserByProductId(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getReviewsOfDemoUser')
      },
    }
  )

  return (
    <div className="flex justify-center items-center">
      <div className="p-8 w-4/5">
        <LoadError status={demoUserStatus} />

        <h1 className="text-3xl font-bold tracking-wider mb-8">
          Hello, {demoUserDetails?.firstName} {demoUserDetails?.lastName}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            <div className="space-y-4">
              {ordersStatus === 'loading' ? (
                <p>Loading orders...</p>
              ) : ordersStatus === 'error' ? (
                <p className="text-red-600">Error loading orders</p>
              ) : orders && orders.length > 0 ? (
                <div>
                  {orders.map((order: UserOrderSummary) => (
                    <div
                      key={order.orderId}
                      className="p-4 rounded-md mb-4 border border-gray-300 "
                    >
                      <div className="flex justify-between ">
                        <div className="text-lg font-semibold">
                          # {order.orderId}
                        </div>
                        <div className="text-gray-500">{order.purchasedAt}</div>
                      </div>
                      <div className="text-gray-600 mt-2">
                        Total: {formatCurrency(order.totalSale)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>{`You haven't made any orders yet.`}</p>
              )}
            </div>
          </section>

          <section className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <p>
              {demoUserDetails?.firstName} {demoUserDetails?.lastName}
            </p>
            <h3 className="font-semibold pt-6">Username: </h3>
            <div className="pb-4">
              <p>{demoUserDetails?.userName}</p>
            </div>

            <h3 className="font-semibold pt-6">Phone Number: </h3>
            <div className="pb-4">
              <p>{demoUserDetails?.phoneNumber}</p>
            </div>

            <h3 className="font-semibold pt-6">Email: </h3>
            <div className="pb-4">
              <p>{demoUserDetails?.emailAddress}</p>
            </div>

            <h3 className="font-semibold pt-6">Address: </h3>
            <div className="pb-4">
              <p>{demoUserDetails?.address}</p>
              <p>{demoUserDetails?.city}</p>
              <p>{demoUserDetails?.country}</p>
              <p>{demoUserDetails?.zipCode}</p>
            </div>

            <button
              onClick={() => goTo(`/edit`)}
              className="mt-2 py-1 px-2 bg-gray-400 text-sm text-white font-semibold rounded-md transition duration-300 ease-in-out hover:bg-gray-500 hover:text-gray-100 focus:outline-none focus:ring focus:ring-gray-400"
            >
              Edit Details
            </button>
          </section>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{`Reviews you've posted`}</h2>
          {reviews?.length === 0 ? (
            <p>{`You haven't posted any reviews yet.`}</p>
          ) : (
            <>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviewsStatus === 'loading' ? (
                  <p>Loading reviews...</p>
                ) : reviewsStatus === 'error' || !reviews ? (
                  <p>Error loading reviews</p>
                ) : (
                  reviews.map((review: ShopperDisplayReview) => (
                    <li
                      key={review.productId}
                      className="border p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">
                          {review.productName}
                        </h3>
                        <span className="text-gray-500">
                          {review.reviewCreatedAt}
                        </span>
                      </div>
                      <p className="mb-4">{review.reviewDescription}</p>
                      <div className="flex items-center">
                        <span className="text-gray-600 text-sm mr-2">
                          {`${demoUserDetails?.firstName} ${demoUserDetails?.lastName}`}
                        </span>
                        <div className="flex items-center">
                          <StarRating rating={review.reviewRating} size={1} />
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          deleteReviewMutation.mutate(review.productId)
                        }
                        className="mt-2 text-red-500 hover:text-red-600 cursor-pointer"
                      >
                        Delete
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default Profile
