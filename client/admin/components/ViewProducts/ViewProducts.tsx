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
        <div className="flex flex-col flex-wrap gap-4">
          {getPaginatedProducts().map((product) => (
            <div
              key={product.id}
              className={`box-border rounded-md flex flex-row items-center justify-between ${
                product.stock < lowStockThreshold
                  ? 'border-2 border-red-600'
                  : 'border-2 border-gray-200'
              }`}
              style={{ width: '750px', height: '200px' }}
            >
              <div
                className="w-1/4 flex justify-center items-center px-2"
                style={{ width: '150px', height: '150px', marginRight: '5px' }}
              >
                <Link
                  to={`${baseURL}/admin/edit/${product.id}`}
                  className="block w-full h-full flex justify-center items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                    }}
                  />
                </Link>
              </div>

              <div className="flex-col w-1/4 mr-6">
                <Link
                  to={`${baseURL}/admin/edit/${product.id}`}
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                  className="text-2xl font-bold mt-2 block cursor-pointer transition-all duration-300"
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
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-400">
                      <StarRating rating={product.averageRating} size={1.5} />
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({product.averageRating})
                    </span>
                  </div>
                </Link>
              </div>

              <div className="w-1/5">
                <Link
                  to={`${baseURL}/admin/edit/${product.id}`}
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                  className="text-xl font-bold block cursor-pointer transition-all duration-300"
                  style={{
                    color:
                      hoveredProductId === product.id ? '#1D4ED8' : 'inherit',
                  }}
                >
                  ${product.price.toFixed(2)}
                </Link>
              </div>

              <div className="w-1/5">
                <Link
                  to={`${baseURL}/admin/edit/${product.id}`}
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                  className="text-xl font-bold block cursor-pointer transition-all duration-300"
                  style={{
                    color:
                      hoveredProductId === product.id ? '#1D4ED8' : 'inherit',
                  }}
                >
                  {`Stock: ${product.stock}`}
                </Link>
              </div>

              <div className="flex-col w-1/4">
                {product.stock < lowStockThreshold && (
                  <Link
                    to={`${baseURL}/admin/edit/${product.id}`}
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                    className="text-xl font-bold mt-2 block cursor-pointer pb-24"
                    style={{
                      color:
                        hoveredProductId === product.id ? '#1D4ED8' : 'inherit',
                    }}
                  >
                    <span className="text-red-500">LOW STOCK</span>
                  </Link>
                )}

                <Link
                  to={`${baseURL}/admin/edit/${product.id}`}
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                  className="text-xl font-bold block cursor-pointer"
                  style={{
                    color:
                      hoveredProductId === product.id ? '#1D4ED8' : 'inherit',
                  }}
                >
                  {(product.isEnabled && (
                    <span className="text-green-600">ENABLED</span>
                  )) || <span className="text-red-600">DISABLED</span>}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ViewProducts
