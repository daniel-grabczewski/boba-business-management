import { useQuery } from 'react-query'
import { getAllProductsAdmin } from '../../../services/products'
import { useEffect, useState } from 'react'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import ViewProducts from '../../components/ViewProducts/ViewProducts'
import ProductsSortingControls from '../../components/ProductsSortingControls/ProductsSortingControls'
import { changeFilter, changePage, changeSort } from '../../../utils/queryHelpers'
import { useNavigate } from 'react-router-dom'

const ProductsSummary = () => {
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)

  const initialPage = parseInt(queryParams.get('page') || '1')

  const initialSort = queryParams.get('sort') || 'a-z'

  const initialFilter = queryParams.get('filter') || 'all'


  const [page, setPage] = useState(initialPage)
  const [sort, setSort] = useState(initialSort)
  const [filter, setFilter] = useState(initialFilter)
  const productsPerPage = 10
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const { data: products, status: statusProducts } = useQuery(
    ['getAllProductsAdmin'],
    async () => getAllProductsAdmin()
  )

  const handleChangeSearch = (search: string) => {
    localStorage.setItem('productSearch', JSON.stringify(search))
    setSearch(search)
  }

  const handleChangeSort = (newSort: string) => {
    changeSort(newSort, setSort, setPage, navigate, location.search)
  }

  const handleChangePage = (newPage: number) => {
    changePage(newPage, setPage, navigate, location.search)
  }

  const handleChangeFilter = (newFilter: string) => {
    changeFilter(newFilter, setFilter, setPage, navigate, location.search)
  }

  useEffect(() => {
    const searchInLocalStorage = localStorage.getItem('productSearch')
    if (searchInLocalStorage) {
      setSearch(JSON.parse(searchInLocalStorage))
    }
  }, [])

  useEffect(() => {
    if (!location.search) {
      setPage(1)
      setFilter('all')
      setSort('a-z')
      handleChangeSearch('')
    }
  }, [location.search])

  const searchedProducts = products
  ? products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
  : []

  const filteredProducts = searchedProducts
    ? searchedProducts.filter((product) => {
        switch (filter) {
          case 'low-stock':
            return product.stock < 5
          case 'enabled':
            return product.isEnabled
          case 'disabled':
            return !product.isEnabled
          case 'all':
            return true
          default:
            return true
        }
      })
    : []

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'price-low-to-high':
        return a.price - b.price
      case 'price-high-to-low':
        return b.price - a.price
      case 'a-z':
        return a.name.localeCompare(b.name)
      case 'stock-low-to-high':
        return a.stock - b.stock
      case 'stock-high-to-low':
        return b.stock - a.stock
      case 'rating-low-to-high':
        return a.averageRating - b.averageRating
      case 'rating-high-to-low':
        return b.averageRating - a.averageRating
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

  const getPaginatedProducts = () => {
    const start = (page - 1) * productsPerPage
    const end = start + productsPerPage
    return sortedProducts.slice(start, end)
  }

  return (
    <>
      <LoadError status={statusProducts} />
      {products && (
        <div
          className="flex flex-col items-center"
          style={{ marginTop: '20px', marginBottom: '100px', minHeight : '100vh'}}
        >
          <ProductsSortingControls 
            search = {search}
            handleChangeSearch = {handleChangeSearch}
            sort = {sort}
            handleChangeSort = {handleChangeSort}
            page = {page}
            totalPages = {totalPages}
            handleChangePage = {handleChangePage}
            productsCount = {sortedProducts.length}
            handleChangeFilter = {handleChangeFilter}
            filter = {filter}
          />
          <ViewProducts
            hoveredProductId={hoveredProductId}
            setHoveredProductId={setHoveredProductId}
            getPaginatedProducts={getPaginatedProducts}
          />
        </div>
      )}
    </>
  )
}

export default ProductsSummary
