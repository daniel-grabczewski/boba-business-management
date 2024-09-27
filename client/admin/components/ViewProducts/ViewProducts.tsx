import { Link } from 'react-router-dom'
import { AdminProduct } from '../../../../models/Products'
import StarRating from '../../../shopper/components/StarRating/StarRating'
import { lowStockThreshold } from '../../../data/lowStockThreshold'
import { baseURL } from '../../../../baseUrl'

interface ViewProductsProps {
  hoveredProductId: number | null
  setHoveredProductId: (id: number | null) => void
  getPaginatedProducts: () => AdminProduct[]
}

const ViewProducts = ({
  hoveredProductId,
  setHoveredProductId,
  getPaginatedProducts,
}: ViewProductsProps) => {
  return (
    <>
      {getPaginatedProducts().length === 0 ? (
        <p className="text-center mt-4 font-semi-bold">No products found</p>
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-[750px] mx-auto flex flex-col gap-4">
            {getPaginatedProducts().map((product) => (
              <div
                key={product.id}
                className={`box-border rounded-md flex items-center justify-between p-2 sm:p-6 ${
                  product.stock < lowStockThreshold
                    ? 'border-2 border-red-600'
                    : 'border-2 border-gray-200'
                }`}
              >
                {/* Product Image */}
                <div className="w-[75px] h-[75px] sm:w-[150px] sm:h-[150px] flex justify-center items-center px-2 mr-2">
                  <Link
                    to={`${baseURL}/admin/edit/${product.id}`}
                    className="block w-full h-full flex justify-center items-center"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <div className="flex-col w-1/4 mr-2 sm:mr-6">
                  <Link
                    to={`${baseURL}/admin/edit/${product.id}`}
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                    className="text-sm sm:text-2xl font-bold block cursor-pointer transition-all duration-300"
                    style={{
                      color:
                        hoveredProductId === product.id ? '#1D4ED8' : 'inherit',
                    }}
                  >
                    {product.name}
                  </Link>

                  <Link
                    to={`${baseURL}/admin/edit/${product.id}`}
                    className="block cursor-pointer"
                  >
                    <div className="flex items-center mt-1 sm:mt-2">
                      <span className="text-yellow-400">
                        <StarRating rating={product.averageRating} size={1} />
                      </span>
                      <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-500">
                        ({product.averageRating})
                      </span>
                    </div>
                  </Link>

                  {/* Price and Stock (for mobile below stars) */}
                  <div className="block sm:hidden mt-2">
                    <Link
                      to={`${baseURL}/admin/edit/${product.id}`}
                      onMouseEnter={() => setHoveredProductId(product.id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                      className="text-sm font-bold block cursor-pointer transition-all duration-300"
                      style={{
                        color:
                          hoveredProductId === product.id
                            ? '#1D4ED8'
                            : 'inherit',
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </Link>

                    <Link
                      to={`${baseURL}/admin/edit/${product.id}`}
                      onMouseEnter={() => setHoveredProductId(product.id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                      className="text-sm font-bold block cursor-pointer mt-1 transition-all duration-300"
                      style={{
                        color:
                          hoveredProductId === product.id
                            ? '#1D4ED8'
                            : 'inherit',
                      }}
                    >
                      Stock: {product.stock}
                    </Link>
                  </div>
                </div>

                <div className="w-1/5 hidden sm:block">
                  <Link
                    to={`${baseURL}/admin/edit/${product.id}`}
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                    className="text-sm sm:text-xl font-bold block cursor-pointer transition-all duration-300"
                    style={{
                      color:
                        hoveredProductId === product.id ? '#1D4ED8' : 'inherit',
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Link>

                  <Link
                    to={`${baseURL}/admin/edit/${product.id}`}
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                    className="text-sm sm:text-xl font-bold block cursor-pointer mt-1 sm:mt-2 transition-all duration-300"
                    style={{
                      color:
                        hoveredProductId === product.id ? '#1D4ED8' : 'inherit',
                    }}
                  >
                    Stock: {product.stock}
                  </Link>
                </div>

                {/* Enabled / Low Stock */}
                <div className="flex-col w-1/4">
                  {product.stock < lowStockThreshold && (
                    <Link
                      to={`${baseURL}/admin/edit/${product.id}`}
                      onMouseEnter={() => setHoveredProductId(product.id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                      className="text-sm sm:text-xl font-bold block cursor-pointer mt-1 sm:mt-2"
                      style={{
                        color:
                          hoveredProductId === product.id
                            ? '#1D4ED8'
                            : 'inherit',
                      }}
                    >
                      <span className="text-red-500">LOW STOCK</span>
                    </Link>
                  )}

                  <Link
                    to={`${baseURL}/admin/edit/${product.id}`}
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                    className="text-sm sm:text-xl font-bold block cursor-pointer"
                    style={{
                      color:
                        hoveredProductId === product.id ? '#1D4ED8' : 'inherit',
                    }}
                  >
                    {product.isEnabled ? (
                      <span className="text-green-600">ENABLED</span>
                    ) : (
                      <span className="text-red-600">DISABLED</span>
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ViewProducts
