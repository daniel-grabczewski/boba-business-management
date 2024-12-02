import { useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import {
  getOrderExtraDetailsById,
  getTotalSaleOfOrderById,
} from '../../../../services/orders'
import { formatCurrency } from '../../../../utils/formatCurrency'
import LoadError from '../../../../shopper/components/LoadError/LoadError'
import {
  format24HourTo12Hour,
  formatDateToDDMMYYYY,
} from '../../../../utils/formatDate'
import { truncate } from '../../../../utils/truncate'
import { useNavigate } from 'react-router-dom'
import { getProductIdByProductName } from '../../../../services/products'
import { baseURL } from '../../../../../baseUrl'

interface OrderPopupProps {
  orderId: number
  closeOrderPopup: () => void
}

const OrderPopup = ({ orderId, closeOrderPopup }: OrderPopupProps) => {
  const navigate = useNavigate()
  const goTo = (link: string) => {
    navigate(`${baseURL}${link}`)
  }
  const popupRef = useRef<HTMLDivElement>(null)

  const { data: order, status: orderStatus } = useQuery(
    ['getOrderExtraDetailsById', orderId],
    async () => getOrderExtraDetailsById(orderId),
    {
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closeOrderPopup()
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeOrderPopup])

  return (
    <>
      <LoadError status={orderStatus} />
      {orderStatus === 'success' && order && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div
            ref={popupRef}
            className="bg-white p-6 w-11/12 sm:w-4/5 lg:w-3/5 max-w-full max-h-screen shadow-xl rounded-lg flex flex-col overflow-hidden m-4"
          >
            <div className="flex-1 overflow-y-auto">
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold">
                  Order #{order.orderId}
                </h2>
                <p>
                  {`${formatDateToDDMMYYYY(
                    order.purchasedAt
                  )}, ${format24HourTo12Hour(order.purchasedAt)}`}
                </p>
              </div>

              {/* Customer Information */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Information:</h3>
                <p>
                  {order.firstName} {order.lastName}
                </p>
                <p>
                  {order.address}, {order.city}
                </p>
                <p>
                  {order.zipCode}, {order.country}
                </p>
                <p>{order.email}</p>
                <p>{order.phoneNumber}</p>
              </div>

              {/* Order Items */}
              <div>
                <div className="sticky top-0 bg-gray-200 flex font-semibold">
                  <div className="py-2 px-4 w-1/2">Product</div>
                  <div className="py-2 px-4 w-1/4 text-center">Quantity</div>
                  <div className="py-2 px-4 w-1/4 text-right">Sale</div>
                </div>

                {order.orderItemsExtraDetails.map((item) => (
                  <div
                    key={item.productSale}
                    className="flex items-center py-2 border-b"
                  >
                    <div className="w-1/2 flex items-center px-4">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="object-contain mr-2 w-12 h-12 cursor-pointer"
                        onClick={() => {
                          goTo(
                            `/admin/edit/${getProductIdByProductName(
                              item.productName
                            )}`
                          )
                          window.scrollTo(0, 0)
                        }}
                      />
                      <p
                        className="cursor-pointer truncate"
                        onClick={() => {
                          goTo(
                            `/admin/edit/${getProductIdByProductName(
                              item.productName
                            )}`
                          )
                          window.scrollTo(0, 0)
                        }}
                      >
                        {truncate(item.productName, 30)}
                      </p>
                    </div>

                    <div className="w-1/4 text-center">{item.itemQuantity}</div>
                    <div className="w-1/4 text-right pr-4">
                      {formatCurrency(item.productSale)}
                    </div>
                  </div>
                ))}

                <div className="flex bg-gray-200 font-semibold py-2">
                  <div className="w-1/2 px-4">
                    Shipping: {order.shippingType}
                  </div>
                  <div className="w-1/4 text-right"></div>
                  <div className="w-1/4 text-right pr-4">
                    {formatCurrency(order.shippingPrice)}
                  </div>
                </div>

                <div className="flex bg-gray-300 font-semibold text-lg py-2">
                  <div className="w-1/2 px-4">Total Sale:</div>
                  <div className="w-1/4 text-right"></div>
                  <div className="w-1/4 text-right pr-4">
                    {formatCurrency(getTotalSaleOfOrderById(order.orderId))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 text-right">
              <button
                onClick={closeOrderPopup}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 transition-all duration-300"
              >
                Back to orders
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OrderPopup
