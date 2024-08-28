import { useEffect, useState, FormEvent, useMemo } from 'react'
import { UpsertProduct } from '../../../../models/Products'
import {
  doesSlugExist,
  getProductByIdAdmin,
  getProductIdByDeprecatedSlug,
  getProductIdBySlug,
  getSlugByProductId,
  isProductNameUnique,
  setDeprecatedSlugInLocalStorage,
  updateProductById,
} from '../../../services/products'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import ProductForm from '../../components/ProductForm/ProductForm'
import { useNavigate, useParams } from 'react-router-dom'
import { isNumeric } from '../../../utils/isNumeric'
import { getReviewsByProductId } from '../../../services/reviews'
import { formatDateToDDMMYYYY } from '../../../utils/formatDate'
import StarRating from '../../../shopper/components/StarRating/StarRating'
import { getUserFullNameByUserName } from '../../../services/users'
import { placeholderImage } from '../../../data/miscImages'
import { baseURL } from '../../../../baseUrl'

function EditProduct() {
  const { idOrSlug } = useParams()
  const navigate = useNavigate()
  const [productId, setProductId] = useState(0)

  const goTo = (link: string) => {
    navigate(`${baseURL}${link}`)
  }

  // Determine whether we have an ID or a slug and fetch the product accordingly
  useEffect(() => {
    if (idOrSlug === undefined) {
      return
    }

    if (isNumeric(idOrSlug)) {
      const id = Number(idOrSlug)
      setProductId(id)
      const slug = getSlugByProductId(id)
      navigate(`${baseURL}/admin/edit/${slug}`, { replace: true })
    } else {
      if (doesSlugExist(idOrSlug)) {
        setProductId(getProductIdBySlug(idOrSlug))
      } else {
        const deprecatedSlugId = getProductIdByDeprecatedSlug(idOrSlug)
        if (deprecatedSlugId) {
          navigate(`${baseURL}/admin/edit/${getSlugByProductId(deprecatedSlugId)}`, {
            replace: true,
          })
          setProductId(deprecatedSlugId)
        } else setProductId(0)
      }
      const id = getProductIdBySlug(idOrSlug)
      setProductId(id)
    }
  }, [idOrSlug, navigate])

  const { data: product, status: statusProduct } = useQuery(
    ['getProductByIdAdmin', productId],
    () => getProductByIdAdmin(productId),
    { enabled: !!productId }
  )

  const [buttonText, setButtonText] = useState('Save Changes')
  const [editedProduct, setEditedProduct] = useState<UpsertProduct>({
    image: '',
    isEnabled: false,
    name: '',
    price: 0,
    description: '',
    stock: 0,
  })

  const [originalProduct, setOriginalProduct] = useState<UpsertProduct>({
    image: '',
    isEnabled: false,
    name: '',
    price: 0,
    description: '',
    stock: 0,
  })

  const [emptyFields, setEmptyFields] = useState<string[]>([])
  const [invalidFields, setInvalidFields] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  const queryClient = useQueryClient()

  const updateProductMutation = useMutation(
    async (editedProduct: UpsertProduct) =>
      updateProductById(product!.id, editedProduct),
    {
      onSuccess: () => {
        setButtonText('Changes Saved')
        setTimeout(() => {
          setButtonText('Save Changes')
        }, 2000)
        queryClient.invalidateQueries('getProduct')
      },
      onError: (error) => {
        console.error('Product edit error', error)
      },
    }
  )

  useEffect(() => {
    if (product) {
      const productForState = {
        image: product.image,
        isEnabled: !!product.isEnabled,
        name: product.name,
        price: product.price,
        description: product.description,
        stock: product.stock,
      }
      setEditedProduct(productForState)
      setOriginalProduct(productForState)
    }
  }, [product])

  useEffect(() => {
    const { image, name, price, description } = editedProduct
    if (image && name && price > 0 && description) {
      setEmptyFields([])
      setInvalidFields([])
      setErrorMessage('')
    }
  }, [editedProduct])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    let finalValue: number | string
    if (name === 'price') {
      finalValue = value === '' ? '' : Math.max(parseFloat(value), 0)
    } else if (name === 'stock') {
      finalValue =
        value === '' ? '' : Math.max(Math.round(parseFloat(value)), 0)
    } else {
      finalValue = value
    }

    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: finalValue }))

    if (finalValue !== '') {
      setEmptyFields((prevFields) =>
        prevFields.filter((field) => field !== name)
      )
    }

    if (name === 'price' && parseFloat(value) > 0) {
      setInvalidFields((prevFields) =>
        prevFields.filter((field) => field !== name)
      )
    }
  }

  const toggleEnabled = () => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      isEnabled: !prevProduct.isEnabled,
    }))
  }

  const checkValues = (obj: UpsertProduct) => {
    const emptyKeys = Object.keys(obj).filter(
      (key) => obj[key as keyof UpsertProduct] === ''
    )
    setEmptyFields(emptyKeys)

    const invalidKeys = Object.keys(obj).filter((key) => {
      if (key === 'price') {
        const value = obj[key as keyof UpsertProduct]
        return (
          typeof value === 'string' || (typeof value === 'number' && value <= 0)
        )
      }
      return false
    })

    if (!isProductNameUnique(editedProduct.name, productId)) {
      invalidKeys.push('name')
    }
    setInvalidFields(invalidKeys)

    return emptyKeys.length === 0 && invalidKeys.length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (checkValues(editedProduct)) {
      const slugBeforeUpdate = getSlugByProductId(productId)
      setDeprecatedSlugInLocalStorage(slugBeforeUpdate, productId)
      updateProductMutation.mutate(editedProduct)
      setOriginalProduct(editedProduct)
    } else {
      setErrorMessage('Please fill all empty fields and correct invalid inputs')
    }
  }

  const { data: reviews = [], status: statusReviews } = useQuery(
    ['getReviewsByProductId', productId],
    async () => getReviewsByProductId(productId)
  )

  const reviewsWithFullNames = useMemo(() => {
    return reviews.map((review) => ({
      ...review,
      fullName: getUserFullNameByUserName(review.userName),
    }))
  }, [reviews])

  return (
    <>
      <LoadError status={[statusProduct, statusReviews]} />
      <ProductForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        toggleEnabled={toggleEnabled}
        product={editedProduct}
        placeholderImage={placeholderImage}
        emptyFields={emptyFields}
        errorMessage={errorMessage}
        buttonText={buttonText}
        invalidFields={invalidFields}
        pageTitle={'Edit product'}
        originalProduct={originalProduct}
        isErrorMessageEnabled={true}
      />
      <div
        className="flex flex-col justify-center items-center"
        style={{ marginBottom: '80px' }}
      >
        <div className="w-1/4 flex flex-col items-center">
          <hr className="mt-2 mb-8 bg-gray-700" style={{ width: '400px' }} />
          <h1 className="font-semibold text-2xl mb-8">Reviews from users:</h1>
          <div
            className="overflow-y-auto"
            style={{
              maxHeight: '400px',
              width: '400px',
              paddingRight: '10px', // For scrollbar space
            }}
          >
            {[...reviewsWithFullNames].reverse().map((review) => (
              <div
                key={review.userName}
                className="flex flex-col border border-black rounded"
                style={{
                  marginBottom: '30px',
                  padding: '10px',
                  width: '100%', // Adjust to fit the container
                }}
              >
                <div
                  className="flex flex-row justify-between font-bold"
                  style={{ marginBottom: '5px' }}
                >
                  <h2>{review.fullName}</h2>
                  <h2>{formatDateToDDMMYYYY(review.createdAt)}</h2>
                </div>
                <p style={{ marginBottom: '20px' }}>{review.description}</p>
                <div className="flex justify-between">
                  <StarRating rating={review.rating} size={1} />
                  {review.isEnabled === false ? (
                    <div
                      className="text-red-500 text-xs"
                      style={{ marginTop: '-3px' }}
                    >
                      <p>This review has been disabled by an admin.</p>
                      <p>It is not visible to shoppers.</p>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex mb-8 mt-4">
            <h2
              className="text-xl font-semibold"
              style={{ marginTop: '8px', marginRight: '20px' }}
            >
              Average Rating:
            </h2>
            <StarRating rating={product?.averageRating || 0} size={2} />
            <h2
              className="text-3xl font-bold mr-2"
              style={{ marginTop: '6px' }}
            >
              {product?.averageRating}
            </h2>
          </div>
          <button
            className="font-semibold text-blue-700 hover:text-gray-700 transition-all duration-300 text-xl"
            style={{ marginTop: '-20px' }}
            onClick={() => {
              goTo(`/shop/${product?.id}`)
              window.scrollTo(0, 0)
            }}
          >
            Go to store page
          </button>
        </div>
      </div>
    </>
  )
}

export default EditProduct
