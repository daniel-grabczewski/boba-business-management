import { useQuery } from 'react-query'
import { getAllProductsShopper } from '../../../services/products'
import LoadError from '../../components/LoadError/LoadError'
import { useState, useEffect } from 'react'
import SortFilterControls from '../../components/SortFilterControls/SortFilterControls'
import ViewShopProducts from '../../components/ViewShopProducts/ViewShopProducts'
import ShopPaginationControls from '../../components/ShopPaginationControls/ShopPaginationControls'
import { useNavigate } from 'react-router-dom'

const Shop = () => {
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  
  const initialPage = parseInt(queryParams.get('page') || '1', 10)
  const initialSort = queryParams.get('sort') || ''
  const initialFilter = queryParams.get('filter') || ''

  console.log(`initialPage : ${initialPage}\ninitialSort : ${initialSort}\ninitialFilter : ${initialFilter}`)

  const [page, setPage] = useState(initialPage)
  const [sort, setSort] = useState(initialSort)
  const [filter, setFilter] = useState(initialFilter)

  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null)
  const productsPerPage = 15


  useEffect(() => {
    setPage(page)
  }, [filter, sort, page])

  const { data: products, status: statusProducts } = useQuery(
    ['getAllProducts'],
    async () => {
      return getAllProductsShopper()
    }
  )

  const changePage = (newPage : number) => {
    queryParams.set('page', `${newPage}`)
    navigate(`?${queryParams.toString()}`, { replace: true })
    setPage(newPage)
    window.scrollTo({ top: 0 })
  }

  const changeFilter = (newFilter : string) => {
    queryParams.set('filter', `${newFilter}`)
    navigate(`?${queryParams.toString()}`, { replace: true })
    setFilter(newFilter)
  }

  const filteredProducts = products
    ? products.filter((product) => {
        const lowerCaseName = product.name.toLowerCase()
        switch (filter) {
          case 'with-pearls':
            return lowerCaseName.includes('pearl')
          case 'without-pearls':
            return !lowerCaseName.includes('pearl')
          case 'teas':
            return lowerCaseName.includes('tea')
          case 'smoothies':
            return lowerCaseName.includes('smoothie')
          case 'yogurts':
            return lowerCaseName.includes('yogurt')
          case 'fruit-drinks':
            return lowerCaseName.includes('drink')
          case 'dairy-free':
            return !/milk|smoothie|yogurt/.test(lowerCaseName)
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
              filter={filter}
              sort={sort}
              changeFilter={changeFilter}
              setSort={setSort}
            />
            <ViewShopProducts
              hoveredProductId={hoveredProductId}
              setHoveredProductId={setHoveredProductId}
              getPaginatedProducts={getPaginatedProducts}
            />
            <ShopPaginationControls
              page={page}
              totalPages={totalPages}
              changePage={changePage}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Shop
