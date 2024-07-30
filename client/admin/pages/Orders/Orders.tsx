import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {
  getOrdersFromLocalStorage,
  getOrderById,
  getTotalSaleOfOrderById,
} from '../../../services/orders'
import { Order } from '../../../../models/Orders'
import OrderSortingControls from '../../components/OrdersComponents/OrderSortingControls/OrderSortingControls'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import OrderPopup from '../../components/OrdersComponents/OrderPopup/OrderPopup'
import OrderTable from '../../components/OrdersComponents/OrderTable/OrderTable'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../../utils/formatCurrency'
import { changePage, changeSort } from '../../../utils/queryHelpers'

function AllOrders() {
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)

  const initialPage = parseInt(queryParams.get('page') || '1')

  const initialSort = queryParams.get('sort') || 'newest-first'

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const [page, setPage] = useState(initialPage)
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState(initialSort)

  const ordersPerPage = 10

  const { data: orders, status: ordersStatus } = useQuery(
    'getOrdersFromLocalStorage',
    async () => getOrdersFromLocalStorage()
  )

  useEffect(() => {
    if (!location.search) {
      setPage(1)
      setSort('newest-first')
      handleChangeSearch('')
    }
  }, [location.search])

  const handleOrderCellClick = async (orderId: number) => {
    try {
      const order = getOrderById(orderId)
      setSelectedOrder(order)
    } catch (error) {
      console.error('Error getting order details:', error)
    }
  }

  const handleChangeSearch = (search: string) => {
    localStorage.setItem('orderSearch', JSON.stringify(search))
    setSearch(search)
  }

  useEffect(() => {
    const searchInLocalStorage = localStorage.getItem('orderSearch')
    if (searchInLocalStorage) {
      setSearch(JSON.parse(searchInLocalStorage))
    }
  }, [])

  const handleChangeSort = (newSort: string) => {
    changeSort(newSort, setSort, setPage, navigate, location.search)
  }

  const handleChangePage = (newPage: number) => {
    changePage(newPage, setPage, navigate, location.search)
  }

  const searchedOrders = orders
    ? orders.filter((order: Order) =>
        order.id.toString().includes(search.toLowerCase())
      )
    : []

  const sortedOrders = searchedOrders.sort((a: Order, b: Order) => {
    const dateA = new Date(a.purchasedAt).getTime()
    const dateB = new Date(b.purchasedAt).getTime()
    const saleA = getTotalSaleOfOrderById(a.id)
    const saleB = getTotalSaleOfOrderById(b.id)
    switch (sort) {
      case 'newest-first':
        return dateB - dateA
      case 'oldest-first':
        return dateA - dateB
      case 'sale-low-to-high':
        return saleA - saleB
      case 'sale-high-to-low':
        return saleB - saleA
      default:
        return 0
    }
  })

  const totalPages = Math.ceil((sortedOrders.length || 0) / ordersPerPage)

  const getPaginatedOrders = () => {
    const start = (page - 1) * ordersPerPage
    const end = start + ordersPerPage
    return sortedOrders.slice(start, end)
  }

  return (
    <>
      <LoadError status={ordersStatus} />
      <div className="w-1/2 mx-auto pt-4" style={{ minWidth: '700px' }}>
      <h1 className="text-center text-4xl font-semibold mb-4">
              Orders
            </h1>
        <OrderSortingControls
          search={search}
          handleChangeSearch={handleChangeSearch}
          sort={sort}
          handleChangeSort={handleChangeSort}
          page={page}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
          ordersCount={sortedOrders.length}
        />
        <LoadError status={ordersStatus} />
        <OrderTable
          getPaginatedOrders={getPaginatedOrders}
          ordersPerPage={ordersPerPage}
          handleOrderCellClick={handleOrderCellClick}
          formatCurrency={formatCurrency}
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
    </>
  )
}

export default AllOrders
