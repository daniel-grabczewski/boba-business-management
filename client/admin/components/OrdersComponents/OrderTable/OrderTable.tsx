import { Order } from '../../../../../models/Orders'
import { getTotalSaleOfOrderById } from '../../../../services/orders'
import { getUserNameByUserId } from '../../../../services/users'
import {
  format24HourTo12Hour,
  formatDateToDDMMYYYY,
} from '../../../../utils/formatDate'

interface OrderTableProps {
  orders: Order[]
  itemsPerPage: number
  handleOrderCellClick: (orderId: number) => void
  formatCurrency: (amount: number) => string
  page: number
  totalPages: number
}

function OrderTable({
  orders,
  page,
  itemsPerPage,
  handleOrderCellClick,
  formatCurrency,
}: OrderTableProps) {
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return (
    <div className="divTable bg-white mt-4 border border-gray-300">
      <div className="divRow bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <div className="divCell py-3 px-8">Order ID</div>
        <div className="divCell py-3 px-8">User Name</div>
        <div className="divCell py-3 px-8">Purchase Date</div>
        <div className="divCell py-3 px-8">Total Sale</div>
      </div>

      <div className="divBody text-gray-600 text-sm font-light">
        {orders.slice(startIndex, endIndex).map((order: Order) => (
          <div
            key={order.id}
            className="divRow border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleOrderCellClick(order.id)}
          >
            <div className="divCell py-3 px-8 text-left whitespace-nowrap">
              {order.id}
            </div>
            <div className="divCell py-3 px-8 text-left">{getUserNameByUserId(order.userId)}</div>
            <div className="divCell py-3 px-8 text-left">
              {format24HourTo12Hour(order.purchasedAt)}{' '}
              {formatDateToDDMMYYYY(order.purchasedAt)}
            </div>
            
            {
   
              <div className="divCell py-3 px-8 text-left">
              {formatCurrency(getTotalSaleOfOrderById(order.id))}
            </div>
         
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderTable
