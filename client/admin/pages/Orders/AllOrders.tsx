import { useState } from 'react'
import { useQuery } from 'react-query'
import { getOrdersFromLocalStorage, getOrderById } from '../../../services/orders'
import { Order } from '../../../../models/Orders'
import OrderSortingControls from '../../components/OrdersComponents/OrderSortingControls/OrderSortingControls'
import LoadError from '../../../user/components/LoadError/LoadError'
import OrderPopup from '../../components/OrdersComponents/OrderPopup/OrderPopup'
import OrderTable from '../../components/OrdersComponents/OrderTable/OrderTable'

const itemsPerPage = 10

function AllOrders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<string>('newest')
  const [oldestFirst, setOldestFirst] = useState<boolean>(false)

  const { data: orders, status: ordersStatus } = useQuery(
    'fetchAllOrders',
    async () => {
      return  getOrdersFromLocalStorage()
    }
  )

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const handleOrderCellClick = async (orderId: number) => {
    try {
      const order = getOrderById(orderId)
      setSelectedOrder(order)
    } catch (error) {
      console.error('Error fetching order details:', error)
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
        oldestFirst={oldestFirst}
        setOldestFirst={setOldestFirst}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalRows={totalRows}
      />
      <LoadError status={ordersStatus} />
      <OrderTable
        orders={filteredAndSortedOrders}
        currentPage={currentPage}
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
