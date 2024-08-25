import { Link } from 'react-router-dom'
import StarRating from '../../components/StarRating/StarRating'
import { ShopperProduct } from '../../../../models/Products'
import { lowStockThreshold } from '../../../data/lowStockThreshold'
import { getAvailableStockByProductId } from '../../../services/cart'
import { useMemo } from 'react'

interface ViewShopProductsProps {
  hoveredProductId: number | null
  setHoveredProductId: (id: number | null) => void
  getPaginatedProducts: () => ShopperProduct[]
}

const ViewShopProducts = ({
  hoveredProductId,
  setHoveredProductId,
  getPaginatedProducts,
}: ViewShopProductsProps) => {
  const productsWithStock = useMemo(() => {
    return getPaginatedProducts().map((product) => ({
      ...product,
      availableStock: getAvailableStockByProductId(product.id),
    }))
  }, [getPaginatedProducts])

  return (
    <>
      {productsWithStock.length === 0 ? (
        <div className="flex justify-center">
          <p className="font-semibold text-lg">
            No products matched your search
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {productsWithStock.map((product) => {
            return (
              <div
                key={product.id}
                className="border p-4 rounded-md flex flex-col flex-top justify-between"
                style={{ width: '320px' }}
              >
                <div>
                  <Link
                    to={`/shop/${product.id}`}
                    className="w-full h-48 block"
                    style={{ marginBottom: '15px' }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain"
                    />
                  </Link>

                  <Link
                    to={`/shop/${product.id}`}
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                    className="text-xl font-bold mt-2 block cursor-pointer transition-all 300s"
                    style={{
                      color:
                        hoveredProductId === product.id ? '#1D4ED8' : 'inherit',
                    }}
                  >
                    {product.name}
                  </Link>

                  <Link
                    to={`/shop/${product.id}`}
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                    className="text-lg text-gray-600 block cursor-pointer transition-all 300s"
                    style={{
                      color:
                        hoveredProductId === product.id ? '#1D4ED8' : 'inherit',
                    }}
                  >
                    {' '}
                    <div className="flex justify-between">
                      <p>${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </div>
                <div>
                  <Link
                    to={`/shop/${product.id}`}
                    className="block cursor-pointer"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center mt-2 ">
                        {product.averageRating === 0 ? (
                          <p
                            className="text-gray-500"
                            style={{ marginBottom: '9px' }}
                          >
                            No reviews yet
                          </p>
                        ) : (
                          <>
                            <span className="text-yellow-400">
                              <StarRating
                                rating={product.averageRating}
                                size={1.5}
                              />
                            </span>
                            <span className="ml-2 text-sm text-gray-500">
                              ({product.averageRating})
                            </span>
                          </>
                        )}
                      </div>
                      <p
                        style={{ fontSize: '15px' }}
                        className="text-red-500 mt-4"
                      >
                        {product.availableStock === 0
                          ? 'Out of stock'
                          : product.availableStock <= lowStockThreshold
                          ? `${product.availableStock} left in stock`
                          : ''}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default ViewShopProducts
