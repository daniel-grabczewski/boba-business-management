import { Link } from 'react-router-dom'
import StarRating from '../../components/StarRating/StarRating'
import { ShopperProduct } from '../../../../models/Products'

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
  return (
    <>
      {getPaginatedProducts().length === 0 ? (
        <div className="flex justify-center">
          <p className="font-semibold text-lg">
            No products matched your search
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {getPaginatedProducts().map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-md flex flex-col flex-top"
              style={{ width: '320px' }}
            >
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

              <div>
                <Link
                  to={`/shop/${product.id}`}
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                  className="text-xl font-bold mt-2 block cursor-pointer"
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
                  className="text-lg text-gray-600 block cursor-pointer"
                  style={{
                    color:
                      hoveredProductId === product.id ? '#1D4ED8' : 'inherit',
                  }}
                >
                  ${product.price.toFixed(2)}
                </Link>

                <Link
                  to={`/shop/${product.id}`}
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
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ViewShopProducts
