import { useEffect, useState } from 'react'
import { UpsertProduct } from '../../../../models/Products'
import ToggleSwitch from '../../../UI/ToggleSwitch'

interface ProductFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  toggleEnabled: () => void
  product: UpsertProduct
  placeholderImage: string
  emptyFields: string[]
  errorMessage: string
  buttonText: string
  invalidFields: string[]
  pageTitle: string
  originalProduct: UpsertProduct
  isErrorMessageEnabled: boolean
}

// This is a reusable component for editing/adding a new product for admins
// It is a form with validation and error messages

function ProductForm({
  handleSubmit,
  handleChange,
  toggleEnabled,
  product,
  emptyFields,
  errorMessage,
  buttonText,
  invalidFields,
  placeholderImage,
  pageTitle,
  originalProduct,
  isErrorMessageEnabled,
}: ProductFormProps) {
  const [originalButtonText] = useState(buttonText)
  const [localStock, setLocalStock] = useState(
    product.stock !== null ? product.stock : ''
  )

  useEffect(() => {
    setLocalStock(product.stock)
  }, [product.stock])

  const hasUnsavedChanges = (
    original: UpsertProduct,
    current: UpsertProduct
  ) => {
    for (const key in original) {
      if (
        original[key as keyof UpsertProduct] !==
        current[key as keyof UpsertProduct]
      ) {
        return true
      }
    }
    return false
  }

  const stockIncrement = 10

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setLocalStock(value === '' ? '' : Math.max(parseInt(value), 0))
    handleChange(event)
  }

  const addStock = () => {
    const newStock =
      (localStock === '' ? 0 : parseInt(localStock as string, 10)) +
      stockIncrement
    setLocalStock(newStock)

    const event = {
      target: { name: 'stock', value: newStock.toString() },
      currentTarget: { name: 'stock', value: newStock.toString() },
    }

    handleChange(event as unknown as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg mt-10">
      <h1 className="flex items-center justify-center text-3xl font-semibold mb-6">
        {pageTitle}
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Toggle switch for mobile */}
        <div className="sm:hidden flex justify-end mr-4 mb-4">
          <ToggleSwitch
            checked={product.isEnabled}
            scale={1.2}
            label={product.isEnabled ? 'ENABLED' : 'DISABLED'}
            onChange={toggleEnabled}
          />
        </div>

        {/* Name and Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center mb-6">
          <div className="w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              id="name"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                emptyFields.includes('name') || invalidFields.includes('name')
                  ? 'border-red-500'
                  : ''
              }`}
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
            <p
              className={`text-red-500 mt-2 ${
                invalidFields.includes('name') ? 'block' : 'hidden'
              }`}
            >
              A product with this name already exists
            </p>
          </div>

          {/* Toggle Switch for larger screens */}
          <div className="hidden sm:flex sm:justify-end sm:ml-10 mt-4 sm:mt-0 w-full sm:w-auto">
            <ToggleSwitch
              checked={product.isEnabled}
              scale={1.2}
              label={product.isEnabled ? 'ENABLED' : 'DISABLED'}
              onChange={toggleEnabled}
            />
          </div>
        </div>

        {/* Description */}
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
            value={product.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Price and Stock */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          <div className="w-full sm:w-1/3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price:
            </label>
            <div
              className={`flex shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                emptyFields.includes('price') || invalidFields.includes('price')
                  ? 'border-red-500'
                  : ''
              }`}
            >
              <span className="self-center mr-2">$</span>
              <input
                id="price"
                className="w-full focus:outline-none"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full sm:w-2/3 mt-4 sm:mt-0">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="stock"
            >
              Stock:
            </label>
            <div className="flex justify-between gap-4">
              <input
                id="stock"
                className={`shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  emptyFields.includes('stock') ? 'border-red-500' : ''
                }`}
                type="number"
                name="stock"
                min="0"
                step="1"
                value={localStock}
                onChange={handleStockChange}
              />
              <button
                className="text-white font-bold py-2 px-2 rounded bg-gray-500 hover:bg-gray-600 w-1/2 transition-all duration-300"
                onClick={addStock}
                type="button"
              >
                Add +10 Stock
              </button>
            </div>
          </div>
        </div>

        {/* Image URL and Preview */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-8">
          <div className="w-full sm:w-1/2">
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
              value={product.image}
              onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/2 flex justify-center items-center mt-4 sm:mt-0">
            <img
              src={product.image ? product.image : placeholderImage}
              alt="Image preview"
              className="max-h-[200px] max-w-[250px] object-contain"
            />
          </div>
        </div>

        {/* Save Button and Error Messages */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            {isErrorMessageEnabled &&
            hasUnsavedChanges(originalProduct, product) ? (
              <div className="bg-red-400 py-2 px-4 rounded">
                <p>You have unsaved changes!</p>
              </div>
            ) : (
              <div></div>
            )}
            <button
              className={`mt-4 sm:mt-0 ${
                buttonText === originalButtonText
                  ? 'bg-blue-500 hover:bg-blue-700'
                  : 'bg-green-500 hover:bg-green-700'
              } text-white font-bold py-2 px-4 rounded transition-all duration-300`}
              type="submit"
            >
              {buttonText}
            </button>
          </div>
          <p className="text-red-500 mt-2 min-h-[1.5em]">{errorMessage}</p>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
