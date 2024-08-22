import { useEffect, useState, FormEvent } from 'react'
import { UpsertProduct } from '../../../../models/Products'
import {
  getProductByIdAdmin,
  getProductIdBySlug,
  getSlugByProductId,
  updateProductById,
} from '../../../services/products'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import ProductForm from '../../components/ProductForm/ProductForm'
import { useNavigate, useParams } from 'react-router-dom'
import { isNumeric } from '../../../utils/isNumeric'

function EditProduct() {
  const { idOrSlug } = useParams()
  const navigate = useNavigate()
  const [productId, setProductId] = useState(0)

  // Determine whether we have an ID or a slug and fetch the product accordingly
  useEffect(() => {
    if (idOrSlug === undefined) {
      return
    }

    if (isNumeric(idOrSlug)) {
      const id = Number(idOrSlug)
      setProductId(id)
      const slug = getSlugByProductId(id)
      navigate(`/admin/edit/${slug}`, { replace: true })
    } else {
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

  const placeholderImage = '/images/placeholder-image.png'

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
    setInvalidFields(invalidKeys)

    return emptyKeys.length === 0 && invalidKeys.length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (checkValues(editedProduct)) {
      updateProductMutation.mutate(editedProduct)
      setOriginalProduct(editedProduct)
    } else {
      setErrorMessage('Please fill all empty fields and correct invalid inputs')
    }
  }

  return (
    <>
      <LoadError status={statusProduct} />
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
    </>
  )
}

export default EditProduct
