import { Link } from 'react-router-dom'
import StarRating from '../../components/StarRating/StarRating'
import { UserProduct } from '../../../../models/Products'

interface ViewShopProductsProps {
  hoveredProductId: number | null
  setHoveredProductId: (id: number | null) => void
  getPaginatedProducts: () => UserProduct[]
}

const ViewShopProducts = ({
  hoveredProductId,
  setHoveredProductId,
  getPaginatedProducts,
}: ViewShopProductsProps) => {
  return (
    <div className="grid">
      {getPaginatedProducts().map((product) => (
        <div key={product.id} className="product-container">
          <Link
            to={`/shop/${product.id}`}
            className="product-link"
            onMouseEnter={() => setHoveredProductId(product.id)}
            onMouseLeave={() => setHoveredProductId(null)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
          </Link>

          <Link
            to={`/shop/${product.id}`}
            onMouseEnter={() => setHoveredProductId(product.id)}
            onMouseLeave={() => setHoveredProductId(null)}
            className="product-name"
          >
            {product.name}
          </Link>

          <Link to={`/shop/${product.id}`} className="product-price">
            ${product.price.toFixed(2)}
          </Link>

          <Link to={`/shop/${product.id}`} className="product-rating">
            <span className="star-icon">
              <StarRating rating={product.averageRating} size={1.5} />
            </span>
            <span className="rating-count">({product.averageRating})</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ViewShopProducts
