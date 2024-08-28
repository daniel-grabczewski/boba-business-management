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
            className="bg-white p-8 w-1/2 max-w-full h0 shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col"
            style={{ height: '80vh' }}
          >
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Order #{order.orderId}</h2>
              <p>
                {`
                ${formatDateToDDMMYYYY(order.purchasedAt)},
                ${format24HourTo12Hour(order.purchasedAt)}  `}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Information:</h3>
              <p>
                {order.firstName} {order.lastName}
              </p>
              <p>
                {order.address}, {order.city}
              </p>
              <p>
                {order.zipCode}, {order.country}{' '}
              </p>
              <p>{order.email}</p>
              <p>{order.phoneNumber}</p>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 rounded-md">
              <div className="sticky top-0 bg-gray-200 flex text font-semibold">
                <div className="py-2 px-4 border w-1/2">Product</div>
                <div className="py-2 px-4 border w-1/3"> Quantity</div>
                <div className="py-2 px-4 border w-1/3">Sale</div>
              </div>
              <div>
                {order.orderItemsExtraDetails.map((item) => (
                  <div key={item.productSale} className="border-b flex">
                    <div className="py-2 px-4 border w-1/2 flex items-center">
                      <div
                        onClick={() => {
                          goTo(
                            `/admin/edit/${getProductIdByProductName(
                              item.productName
                            )}`
                          )
                          window.scrollTo(0, 0)
                        }}
                        className="cursor-pointer"
                      >
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="object-contain mr-2"
                          style={{ height: '40px' }}
                        />
                      </div>
                      <p
                        onClick={() => {
                          goTo(
                            `/admin/edit/${getProductIdByProductName(
                              item.productName
                            )}`
                          )
                          window.scrollTo(0, 0)
                        }}
                        className="cursor-pointer"
                      >
                        {truncate(item.productName, 30)}
                      </p>
                    </div>
                    <div className="py-2 px-4 border w-1/3 flex items-center">
                      {item.itemQuantity}
                    </div>
                    <div className="py-2 px-4 border w-1/3 flex items-center">
                      {formatCurrency(item.productSale)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="sticky bottom-0 bg-gray-200 flex flex-row">
                <div className="py-2 px-4 border w-1/2">
                  {`Shipping: ${order.shippingType}`}
                </div>
                <div className="py-2 px-4  w-1/3"></div>
                <div className="py-2 px-4  w-1/3">
                  {formatCurrency(order.shippingPrice)}
                </div>
              </div>
              <div className="sticky bottom-0 bg-gray-300 flex font-semibold text-lg">
                <div className="py-2 px-4  w-1/2 ">Total Sale:</div>
                <div className="py-2 px-4 w-1/3"></div>
                <div className="py-2 px-4 w-1/3">
                  {formatCurrency(getTotalSaleOfOrderById(order.orderId))}
                </div>
              </div>
            </div>

            <hr className="border-t border-gray-300" />
            <div className="mt-4 text-right">
              <button
                onClick={closeOrderPopup}
                className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 transition-all duration-300"
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
