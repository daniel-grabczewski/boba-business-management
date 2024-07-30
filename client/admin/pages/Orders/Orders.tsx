import { useState } from 'react'
import { useQuery } from 'react-query'
import {
  getOrdersFromLocalStorage,
  getOrderById,
} from '../../../services/orders'
import { Order } from '../../../../models/Orders'
import OrderSortingControls from '../../components/OrdersComponents/OrderSortingControls/OrderSortingControls'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import OrderPopup from '../../components/OrdersComponents/OrderPopup/OrderPopup'
import OrderTable from '../../components/OrdersComponents/OrderTable/OrderTable'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../../utils/formatCurrency'

const itemsPerPage = 10

function AllOrders() {
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)

  const initialPage = parseInt(queryParams.get('page') || '1')

  const initialSort = queryParams.get('sort') || 'newest-first'

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const [page, setPage] = useState(initialPage)
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState(initialSort)

  const { data: orders, status: ordersStatus } = useQuery(
    'getOrdersFromLocalStorage',
    async () => getOrdersFromLocalStorage()
  )

  const handleOrderCellClick = async (orderId: number) => {
    try {
      const order = getOrderById(orderId)
      setSelectedOrder(order)
    } catch (error) {
      console.error('Error getting order details:', error)
    }
  }

  const totalPages = Math.ceil((orders?.length || 0) / itemsPerPage)

  if (orders === undefined) {
    return <div>Loading...</div>
  }

  const filteredAndSortedOrders = orders
    .filter((order: Order) =>
      order.id.toString().includes(search.toLowerCase())
    )
    .sort((a: Order, b: Order) => {
      const dateA = new Date(a.purchasedAt)
      const dateB = new Date(b.purchasedAt)

      if (sort === 'newest') {
        return dateB.getTime() - dateA.getTime()
      } else if (sort === 'oldest') {
        return dateA.getTime() - dateB.getTime()
      }
      return 0
    })

  const totalRows = filteredAndSortedOrders.length

  return (
    <div className="w-1/2 mx-auto pt-4" style={{ minWidth: '700px' }}>
      <OrderSortingControls
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        totalRows={totalRows}
      />
      <LoadError status={ordersStatus} />
      <OrderTable
        orders={filteredAndSortedOrders}
        page={page}
        itemsPerPage={itemsPerPage}
        handleOrderCellClick={handleOrderCellClick}
        formatCurrency={formatCurrency}
        totalPages={totalPages}
      />
      {selectedOrder && (
        <div className="order-details-popup">
          <button onClick={() => setSelectedOrder(null)}>Close</button>
          <OrderPopup
            orderId={selectedOrder.id}
            order={selectedOrder}
            closeOrderPopup={() => setSelectedOrder(null)}
          />
        </div>
      )}
    </div>
  )
}

export default AllOrders
