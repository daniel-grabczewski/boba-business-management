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
          <div className="w-full mx-auto flex flex-col gap-4">
            {getPaginatedProducts().map((product) => (
              <div
                key={product.id}
                className={`box-border rounded-md border-2 p-4 flex flex-col sm:flex-row items-start justify-between sm:items-center bg-white ${
                  product.stock < lowStockThreshold
                    ? 'border-red-600'
                    : 'border-gray-200'
                }`}
              >
                {/* Mobile View */}
                <div className="block sm:hidden w-full flex items-center">
                  <div className="flex flex-col w-3/4">
                    <Link
                      to={`${baseURL}/admin/edit/${product.id}`}
                      onMouseEnter={() => setHoveredProductId(product.id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                      className="text-xl font-bold cursor-pointer leading-snug"
                      style={{
                        color:
                          hoveredProductId === product.id
                            ? '#1D4ED8'
                            : 'inherit',
                      }}
                    >
                      {product.name}
                    </Link>

                    <div className="flex items-start mt-2">
                      <div className="mr-2">
                        <Link
                          to={`${baseURL}/admin/edit/${product.id}`}
                          className="block w-[60px] h-[60px] flex-shrink-0"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="object-contain w-full h-full"
                          />
                        </Link>
                      </div>
                      <div className="text-base">
                        <p>${product.price.toFixed(2)}</p>
                        <p>stock: {product.stock}</p>
                        <StarRating rating={product.averageRating} size={1} />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-1/4 text-center">
                    {product.stock < lowStockThreshold && (
                      <Link
                        to={`${baseURL}/admin/edit/${product.id}`}
                        className="text-xs font-bold cursor-pointer text-red-500 mb-1"
                      >
                        LOW STOCK
                      </Link>
                    )}
                    <Link
                      to={`${baseURL}/admin/edit/${product.id}`}
                      className="text-sm font-bold cursor-pointer"
                    >
                      {product.isEnabled ? (
                        <span className="text-green-600">ENABLED</span>
                      ) : (
                        <span className="text-red-600">DISABLED</span>
                      )}
                    </Link>
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden sm:flex items-center justify-between w-full">
                  {/* Product Image */}
                  <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] flex justify-center items-center">
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
                  <div className="flex flex-col w-1/4 mr-4 sm:mr-8 space-y-2">
                    <Link
                      to={`${baseURL}/admin/edit/${product.id}`}
                      onMouseEnter={() => setHoveredProductId(product.id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                      className="text-lg sm:text-2xl font-bold block cursor-pointer transition-all duration-300"
                      style={{
                        color:
                          hoveredProductId === product.id
                            ? '#1D4ED8'
                            : 'inherit',
                      }}
                    >
                      {product.name}
                    </Link>
                    <Link
                      to={`${baseURL}/admin/edit/${product.id}`}
                      className="block cursor-pointer"
                    >
                      <div className="flex items-center">
                        <span className="text-yellow-400 flex items-center">
                          <StarRating
                            rating={product.averageRating}
                            size={1.5}
                          />
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 sm:ml-2 flex items-center">
                          ({product.averageRating})
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Price and Stock */}
                  <div className="w-1/5 hidden sm:flex sm:flex-row sm:items-center sm:space-x-10">
                    <Link
                      to={`${baseURL}/admin/edit/${product.id}`}
                      className="text-lg sm:text-xl font-bold block cursor-pointer transition-all duration-300"
                    >
                      ${product.price.toFixed(2)}
                    </Link>
                    <Link
                      to={`${baseURL}/admin/edit/${product.id}`}
                      className="text-lg sm:text-xl font-bold block cursor-pointer transition-all duration-300"
                    >
                      Stock: {product.stock}
                    </Link>
                  </div>

                  {/* Enabled / Low Stock */}
                  <div className="flex flex-col w-1/6 ml-6 sm:ml-24 space-y-2 text-left">
                    {product.stock < lowStockThreshold && (
                      <Link
                        to={`${baseURL}/admin/edit/${product.id}`}
                        className="text-sm sm:text-xl font-bold block cursor-pointer text-red-500 pb-10"
                      >
                        LOW STOCK
                      </Link>
                    )}
                    <Link
                      to={`${baseURL}/admin/edit/${product.id}`}
                      className="text-sm sm:text-xl font-bold block cursor-pointer"
                      style={{
                        color:
                          hoveredProductId === product.id
                            ? '#1D4ED8'
                            : 'inherit',
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
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ViewProducts
