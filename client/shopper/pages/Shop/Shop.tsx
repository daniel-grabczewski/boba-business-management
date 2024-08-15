import { useQuery } from 'react-query'
import { getAllProductsShopper } from '../../../services/products'
import LoadError from '../../components/LoadError/LoadError'
import { useState, useEffect } from 'react'
import SortFilterControls from '../../components/SortFilterControls/SortFilterControls'
import ViewShopProducts from '../../components/ViewShopProducts/ViewShopProducts'
import ShopPaginationControls from '../../components/ShopPaginationControls/ShopPaginationControls'
import { useNavigate } from 'react-router-dom'
import {
  changeFilter,
  changePage,
  changeSort,
} from '../../../utils/queryHelpers'

const Shop = () => {
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)

  const initialPage = parseInt(queryParams.get('page') || '1', 10)
  const initialSort = queryParams.get('sort') || ''
  const initialFilter = queryParams.get('filter') || ''
  const initialSearch = queryParams.get('search') || ''

  const [page, setPage] = useState(initialPage)
  const [sort, setSort] = useState(initialSort)
  const [filter, setFilter] = useState(initialFilter)
  const [search, setSearch] = useState(initialSearch)
  const productsPerPage = 15
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null)

  useEffect(() => {
    if (!location.search) {
      setPage(1)
      setSort('')
      setFilter('')
      setSearch('')
    }
  }, [location.search])

  const { data: products, status: statusProducts } = useQuery(
    ['getAllProducts'],
    async () => getAllProductsShopper()
  )

  const handleChangePage = (newPage: number) => {
    changePage(newPage, setPage, navigate, location.search)
  }

  const handleChangeFilter = (newFilter: string) => {
    changeFilter(newFilter, setFilter, setPage, navigate, location.search)
  }

  const handleChangeSort = (newSort: string) => {
    changeSort(newSort, setSort, setPage, navigate, location.search)
  }

  const handleChangeSearch = (newSearch: string) => {
    localStorage.setItem('shopSearch', JSON.stringify(newSearch))
    setSearch(newSearch)
    setPage(1) // Reset to the first page on new search
  }

  useEffect(() => {
    const searchInLocalStorage = localStorage.getItem('shopSearch')
    if (searchInLocalStorage) {
      setSearch(JSON.parse(searchInLocalStorage))
    }
  }, [])

  const filteredProducts = products
    ? products.filter((product) => {
        const lowerCaseName = product.name.toLowerCase()
        const matchesSearch = lowerCaseName.includes(search.toLowerCase())
        switch (filter) {
          case 'with-pearls':
            return matchesSearch && lowerCaseName.includes('pearl')
          case 'without-pearls':
            return matchesSearch && !lowerCaseName.includes('pearl')
          case 'teas':
            return matchesSearch && lowerCaseName.includes('tea')
          case 'smoothies':
            return matchesSearch && lowerCaseName.includes('smoothie')
          case 'yogurts':
            return matchesSearch && lowerCaseName.includes('yogurt')
          case 'fruit-drinks':
            return matchesSearch && lowerCaseName.includes('drink')
          case 'dairy-free':
            return matchesSearch && !/milk|smoothie|yogurt/.test(lowerCaseName)
          default:
            return matchesSearch
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
          style={{ marginTop: '60px', marginBottom: '100px' }}
        >
          <div>
            <h1 className="text-4xl font-bold mt-2">Shop for Bubble Tea</h1>
            <SortFilterControls
              search={search}
              handleChangeSearch={handleChangeSearch}
              filter={filter}
              sort={sort}
              handleChangeFilter={handleChangeFilter}
              handleChangeSort={handleChangeSort}
            />
            <ViewShopProducts
              hoveredProductId={hoveredProductId}
              setHoveredProductId={setHoveredProductId}
              getPaginatedProducts={getPaginatedProducts}
            />
            <ShopPaginationControls
              page={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              shownProducts={getPaginatedProducts().length}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Shop
