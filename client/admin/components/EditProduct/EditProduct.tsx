import { useEffect, useState, FormEvent } from 'react'
import { UpsertProduct, AdminProduct } from '../../../../models/Products'
import { updateProductById } from '../../../services/products'
import { useMutation, useQueryClient } from 'react-query'
import LoadError from '../../../shopper/components/LoadError/LoadError'

interface EditProductProps {
  product: AdminProduct
}

function EditProduct({ product }: EditProductProps) {
  const [buttonText, setButtonText] = useState('Save Changes')
  const [editedProduct, setEditedProduct] = useState<UpsertProduct>({
    image: product.image,
    isEnabled: !!product.isEnabled,
    name: product.name,
    price: product.price,
    description: product.description,
    stock: product.stock,
  })

  const [emptyFields, setEmptyFields] = useState<string[]>([])
  const [invalidFields, setInvalidFields] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  const saveToLocalStorage = (state: UpsertProduct) => {
    localStorage.setItem('editedProduct', JSON.stringify(state))
  }

  const placeholderImage = '/images/placeholder-image.png'

  const queryClient = useQueryClient()

  const updateProductMutation = useMutation(
    async (editedProduct: UpsertProduct) =>
      updateProductById(product.id, editedProduct),
    {
      onSuccess: () => {
        setButtonText('Product Updated')
        setTimeout(() => {
          setButtonText('Save Changes')
        }, 2000)
        localStorage.removeItem('editedProduct')
        queryClient.invalidateQueries('getProduct')
      },
      onError: (error) => {
        console.error('Product edit error', error)
      },
    }
  )

  useEffect(() => {
    const savedProduct = localStorage.getItem('editedProduct')
    if (savedProduct) {
      setEditedProduct(JSON.parse(savedProduct) as UpsertProduct)
    }
  }, [])

  useEffect(() => {
    const { image, name, price, description } = editedProduct
    if (image && name && price > 0 && description) {
      setEmptyFields([])
      setInvalidFields([])
      setErrorMessage('')
    }
    saveToLocalStorage(editedProduct)
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
    } else {
      setErrorMessage('Please fill all empty fields and correct invalid inputs')
    }
  }

  return (
    <>
      <LoadError status={updateProductMutation.status} />
      <div
        className="container mx-auto"
        style={{ maxWidth: '500px', minHeight: '95vh', marginTop: '60px' }}
      >
        <h1 className="text-3xl font-semibold mb-4">Edit Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-4">
            <div className="mb-4 w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                id="name"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  emptyFields.includes('name') ? 'border-red-500' : ''
                }`}
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center w-1/2 mt-2">
              <button
                className={`font-bold text-white py-2 px-4 rounded ${
                  editedProduct.isEnabled ? 'bg-green-500' : 'bg-red-500'
                }`}
                type="button"
                onClick={toggleEnabled}
              >
                {editedProduct.isEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description:
            </label>
            <textarea
              id="description"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                emptyFields.includes('description') ? 'border-red-500' : ''
              }`}
              style={{ minHeight: '100px', maxHeight: '250px' }}
              name="description"
              value={editedProduct.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price:
              </label>
              <input
                id="price"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  emptyFields.includes('price') ||
                  invalidFields.includes('price')
                    ? 'border-red-500'
                    : ''
                }`}
                type="number"
                name="price"
                min="0"
                value={editedProduct.price}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="stock"
              >
                Stock:
              </label>
              <input
                id="stock"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  emptyFields.includes('stock') ? 'border-red-500' : ''
                }`}
                type="number"
                name="stock"
                min="0"
                step="1"
                value={editedProduct.stock}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2 flex flex-col justify-center">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="imageUrl"
              >
                Image URL:
              </label>
              <input
                id="imageUrl"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  emptyFields.includes('image') ? 'border-red-500' : ''
                }`}
                type="text"
                name="image"
                value={editedProduct.image}
                onChange={handleChange}
              />
            </div>
            <div
              className="w-1/2 flex justify-center items-center mt-2 border rounded"
              style={{
                maxHeight: '200px',
                minHeight: '200px',
                background: '#d0d0d0',
                minWidth: '250px',
              }}
            >
              <img
                src={
                  editedProduct.image ? editedProduct.image : placeholderImage
                }
                alt="Image preview"
                style={{
                  maxHeight: '200px',
                  maxWidth: '250px',
                  padding: '8px',
                  borderRadius: '12px',
                }}
              />
            </div>
          </div>

          <div className="mb-4">
            <button
              className={`${
                buttonText === 'Add Product'
                  ? 'bg-blue-500 hover:bg-blue-700'
                  : 'bg-green-500 hover:bg-green-700'
              } text-white font-bold py-2 px-4 rounded`}
              type="submit"
            >
              {buttonText}
            </button>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default EditProduct
