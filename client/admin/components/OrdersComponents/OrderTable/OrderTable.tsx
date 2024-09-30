import { Order } from '../../../../../models/Orders'
import { getTotalSaleOfOrderById } from '../../../../services/orders'
import { getUserNameByUserId } from '../../../../services/users'
import {
  format24HourTo12Hour,
  formatDateToDDMMYYYY,
  formatRelativeDate,
} from '../../../../utils/formatDate'

interface OrderTableProps {
  getPaginatedOrders: () => Order[]
  ordersPerPage: number
  handleSelectOrderId: (orderId: number) => void
  formatCurrency: (amount: number) => string
}

function OrderTable({
  getPaginatedOrders,
  handleSelectOrderId,
  formatCurrency,
}: OrderTableProps) {
  return (
    <>
      {getPaginatedOrders().length === 0 ? (
        <p className="text-center mt-4 font-semi-bold">No orders found</p>
      ) : (
        <div className="bg-white mt-4 mb-8 border border-gray-300">
          {/* Table Header (Desktop) */}
          <div className="hidden sm:flex bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
            <div className="w-1/4 py-4 px-6">Order ID</div>
            <div className="w-1/4 py-4 px-6">Username</div>
            <div className="w-1/4 py-4 px-6">Total Sale</div>
            <div className="w-1/4 py-4 px-6">Purchase Date</div>
          </div>

          {/* Table Body */}
          <div className="text-gray-600 text-sm font-light">
            {getPaginatedOrders().map((order: Order) => (
              <div
                key={order.id}
                className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectOrderId(order.id)}
              >
                {/* Mobile Version */}
                <div className="block sm:hidden p-4 border-b">
                  <div className="mb-2">
                    <strong>Order ID:</strong> {order.id}
                  </div>
                  <div className="mb-2">
                    <strong>Username:</strong>{' '}
                    {getUserNameByUserId(order.userId)}
                  </div>
                  <div className="mb-2">
                    <strong>Total Sale:</strong>{' '}
                    {formatCurrency(getTotalSaleOfOrderById(order.id))}
                  </div>
                  <div className="mb-2">
                    <strong>Purchase Date:</strong>
                    <span
                      className={
                        formatRelativeDate(order.purchasedAt) === 'Today'
                          ? 'font-semibold'
                          : ''
                      }
                    >
                      {formatRelativeDate(order.purchasedAt) === 'Today'
                        ? 'Today'
                        : formatDateToDDMMYYYY(order.purchasedAt)}{' '}
                      {format24HourTo12Hour(order.purchasedAt)}
                    </span>
                  </div>
                </div>

                {/* Desktop Version */}
                <div className="hidden sm:flex flex-row">
                  {/* Order ID */}
                  <div className="w-full sm:w-1/4 py-5 px-6 flex items-center sm:border-r border-gray-300">
                    {order.id}
                  </div>

                  {/* Username */}
                  <div className="w-full sm:w-1/4 py-5 px-6 flex items-center sm:border-r border-gray-300">
                    {getUserNameByUserId(order.userId)}
                  </div>

                  {/* Total Sale */}
                  <div className="w-full sm:w-1/4 py-5 px-6 flex items-center sm:border-r border-gray-300">
                    {formatCurrency(getTotalSaleOfOrderById(order.id))}
                  </div>

                  {/* Purchase Date */}
                  <div className="w-full sm:w-1/4 py-5 px-6 flex items-center">
                    <div>
                      <span
                        className={
                          formatRelativeDate(order.purchasedAt) === 'Today'
                            ? 'font-semibold'
                            : ''
                        }
                      >
                        {formatRelativeDate(order.purchasedAt) === 'Today'
                          ? 'Today'
                          : formatDateToDDMMYYYY(order.purchasedAt)}{' '}
                        {format24HourTo12Hour(order.purchasedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default OrderTable
