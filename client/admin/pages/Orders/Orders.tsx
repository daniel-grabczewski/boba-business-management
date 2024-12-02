import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {
  getOrdersFromLocalStorage,
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

  const initialSelectedOrderId = parseInt(queryParams.get('order') || '0')

  const [selectedOrderId, setSelectedOrderId] = useState(initialSelectedOrderId)

  const [page, setPage] = useState(initialPage)
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState(initialSort)

  const ordersPerPage = 10

  const {
    data: orders,
    status: ordersStatus,
    refetch: refetchGetOrdersFromLocalStorage,
  } = useQuery('getOrdersFromLocalStorage', async () =>
    getOrdersFromLocalStorage()
  )

  useEffect(() => {
    if (!location.search) {
      setPage(1)
      setSort('newest-first')
      handleChangeSearch('')
    }
  }, [location.search])

  const handleSelectOrderId = (id: number) => {
    setSelectedOrderId(id)
    queryParams.set('order', `${id}`)
    navigate(`?${queryParams.toString()}`, { replace: true })
  }

  const closeOrderPopup = () => {
    setSelectedOrderId(0)
    queryParams.delete('order')
    navigate(`?${queryParams.toString()}`, { replace: true })
    refetchGetOrdersFromLocalStorage()
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
      <OrderPopup orderId={selectedOrderId} closeOrderPopup={closeOrderPopup} />
      <div className="w-full mx-auto my-10 p-4 sm:w-full md:w-full lg:w-full xl:w-3/4">
        <h1 className="text-center text-4xl font-semibold mb-10">Orders</h1>
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
        <OrderTable
          getPaginatedOrders={getPaginatedOrders}
          ordersPerPage={ordersPerPage}
          handleSelectOrderId={handleSelectOrderId}
          formatCurrency={formatCurrency}
        />
      </div>
    </>
  )
}

export default AllOrders
