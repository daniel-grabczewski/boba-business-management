import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getProductByIdAdmin } from '../../../services/products'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import EditProduct from '../../components/EditProduct/EditProduct'

const IndividualProduct = () => {
  const params = useParams()
  const id = Number(params.id)

  const {
    data: product,
    status: statusProduct,
    isLoading,
  } = useQuery(['getProduct', id], async () => getProductByIdAdmin(id))

  return (
    <>
      <LoadError status={[statusProduct]} />
      {!isLoading && product && (
        <div
          className="flex flex-col items-center w-full"
          style={{ marginTop: '100px', marginBottom: '150px' }}
        >
          <EditProduct key={product.id} product={product} />
        </div>
      )}
    </>
  )
}

export default IndividualProduct
