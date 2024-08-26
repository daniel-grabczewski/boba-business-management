import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getDemoUserDetails } from '../../../services/users'
import {
  deleteReviewOfDemoUserByProductId,
  getReviewsOfDemoUser,
  isDemoUserReviewEnabled,
} from '../../../services/reviews'
import LoadError from '../../components/LoadError/LoadError'
import { ShopperDisplayReview } from '../../../../models/Reviews'
import { getDemoUserOrdersExtraDetails } from '../../../services/orders'
import StarRating from '../../components/StarRating/StarRating'
import {
  format24HourTo12Hour,
  formatDateToDDMMYYYY,
} from '../../../utils/formatDate'
import { formatCurrency } from '../../../utils/formatCurrency'

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

  const { data: demoOrders, status: demoOrdersStatus } = useQuery(
    'getDemoUserOrdersExtraDetails',
    async () => {
      return getDemoUserOrdersExtraDetails()
    }
  )

  const { data: demoReviews, status: demoReviewsStatus } = useQuery(
    'getReviewsOfDemoUser',
    async () => getReviewsOfDemoUser()
  )

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
        <LoadError status={[demoUserStatus, demoOrdersStatus]} />

        <h1 className="text-3xl font-bold tracking-wider mb-8">
          Hello, {demoUserDetails?.firstName} {demoUserDetails?.lastName}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            <div
              style={{ maxHeight: '500px' }}
              className="space-y-4 overflow-y-auto"
            >
              {demoOrdersStatus === 'loading' ? (
                <p>Loading orders...</p>
              ) : demoOrdersStatus === 'error' ? (
                <p className="text-red-600">Error loading orders</p>
              ) : demoOrders && demoOrders.length > 0 ? (
                <div>
                  {[...demoOrders].reverse().map((order) => (
                    <div
                      key={order.orderId}
                      className="p-4 rounded-md mb-4 border border-gray-300 mr-2"
                    >
                      <div className="flex justify-between">
                        <div className="text-lg font-semibold">
                          Order Number: {order.orderId}
                        </div>
                        <div className="text-gray-500 flex gap-4">
                          <p>{format24HourTo12Hour(order.purchasedAt)}</p>
                          <p>{formatDateToDDMMYYYY(order.purchasedAt)}</p>
                        </div>
                      </div>
                      <div>
                        {order.orderItemsExtraDetails.map((orderItem) => (
                          <div
                            key={orderItem.productName}
                            className="flex w-full flex-col"
                          >
                            <div className="flex ">
                              <p className="w-1/2">
                                {orderItem.itemQuantity}x{' '}
                                {orderItem.productName}
                              </p>
                              <p>{formatCurrency(orderItem.productSale)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex mb-2">
                        <p className="w-1/2">Shipping: {order.shippingType}</p>
                        <p>{formatCurrency(order.shippingPrice)}</p>
                      </div>
                      <div>
                        <div className="font-semibold flex">
                          <p className="w-1/2">Total:</p>
                          <p>
                            {formatCurrency(
                              order.totalSale + order.shippingPrice
                            )}
                          </p>
                        </div>
                        <hr className="mt-2 mb-2" />
                        <p>
                          Shipped to:{' '}
                          {`${order.address}, ${order.city}, ${order.country}`}
                        </p>
                        <p>{`${order.firstName} ${order.lastName}`}</p>
                        <p>Contact number: {`${order.phoneNumber}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>{`You haven't made any orders yet.`}</p>
              )}
            </div>
          </div>

          <div className="border p-4 rounded-md shadow-md">
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
          </div>
        </div>

        <div className="mt-8 overflow-y-auto" style={{ maxHeight: '700px' }}>
          <h2 className="text-xl font-semibold mb-4">{`Reviews you've posted`}</h2>
          {demoReviews?.length === 0 ? (
            <p>{`You haven't posted any reviews yet.`}</p>
          ) : (
            <>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {demoReviewsStatus === 'loading' ? (
                  <p>Loading reviews...</p>
                ) : demoReviewsStatus === 'error' || !demoReviews ? (
                  <p>Error loading reviews</p>
                ) : (
                  [...demoReviews]
                    .reverse()
                    .map((review: ShopperDisplayReview) => (
                      <li
                        key={review.productId}
                        className="border p-4 rounded-md shadow-md"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3
                            className="text-lg font-semibold cursor-pointer"
                            onClick={() => goTo(`/shop/${review.productId}`)}
                          >
                            {review.productName}
                          </h3>

                          <div className="text-gray-500 flex gap-4">
                            <p>
                              {format24HourTo12Hour(review.reviewCreatedAt)}
                            </p>
                            <p>
                              {formatDateToDDMMYYYY(review.reviewCreatedAt)}
                            </p>
                          </div>
                        </div>
                        <p className="mb-4">{review.reviewDescription}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-gray-600 text-sm mr-2">
                              {`${demoUserDetails?.firstName} ${demoUserDetails?.lastName}`}
                            </span>
                            <div className="flex items-center">
                              <StarRating
                                rating={review.reviewRating}
                                size={1}
                              />
                            </div>
                          </div>
                          {isDemoUserReviewEnabled(review.productId) ===
                          false ? (
                            <div
                              className="text-red-500 text-sm"
                              style={{ marginTop: '5px' }}
                            >
                              <p>This review has been disabled by an admin.</p>
                              <p>It is not visible to other shoppers.</p>
                            </div>
                          ) : (
                            <p></p>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            deleteReviewMutation.mutate(review.productId)
                          }
                          className="mt-2 text-red-500 hover:text-red-800 cursor-pointer transition-all duration-300"
                        >
                          Delete
                        </button>
                      </li>
                    ))
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
