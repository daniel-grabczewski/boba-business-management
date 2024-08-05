import { UpsertProduct } from '../../../../models/Products'
import { createProduct } from '../../../services/products'
import { useMutation } from 'react-query'
import React, { useEffect, useState } from 'react'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import ProductForm from '../../components/ProductForm/ProductForm'

const AddProduct = () => {
  const [buttonText, setButtonText] = useState('Add Product')
  const [newProduct, setNewProduct] = useState<UpsertProduct>({
    image: '',
    isEnabled: true,
    name: '',
    price: 0,
    description: '',
    stock: 0,
  })

  const [originalProduct, setOriginalProduct] = useState<UpsertProduct>({
    image: '',
    isEnabled: true,
    name: '',
    price: 0,
    description: '',
    stock: 0,
  })

  const [emptyFields, setEmptyFields] = useState<string[]>([])
  const [invalidFields, setInvalidFields] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  const saveToLocalStorage = (state: UpsertProduct) => {
    localStorage.setItem('newProduct', JSON.stringify(state))
  }

  const placeholderImage = '/images/placeholder-image.png'

  const addProductMutation = useMutation(
    async (newProduct: UpsertProduct) => createProduct(newProduct),
    {
      onSuccess: () => {
        setButtonText('Product Added')
        setNewProduct({
          image: '',
          isEnabled: true,
          name: '',
          price: 0,
          description: '',
          stock: 0,
        })
        localStorage.removeItem('newProduct')
        setTimeout(() => {
          setButtonText('Add Product')
        }, 2000)
      },
    }
  )

  //! Uncomment this if you want progress of form entry to be stored into localStorage, so it stays across refreshes
  /*
  useEffect(() => {
    const savedProduct = localStorage.getItem('newProduct')
    if (savedProduct) {
      setNewProduct(JSON.parse(savedProduct) as UpsertProduct)
    }
  }, [])
  */

  useEffect(() => {
    const { image, name, price, description } = newProduct
    if (image && name && price > 0 && description) {
      setEmptyFields([])
      setInvalidFields([])
      setErrorMessage('')
    }
    saveToLocalStorage(newProduct)
  }, [newProduct])

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

    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: finalValue }))

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
    setNewProduct((prevProduct) => ({
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (checkValues(newProduct)) {
      addProductMutation.mutate(newProduct)
      setOriginalProduct({
        image: '',
        isEnabled: true,
        name: '',
        price: 0,
        description: '',
        stock: 0,
      })
    } else {
      setErrorMessage('Please fill all empty fields and correct invalid inputs')
    }
  }

  return (
    <>
      <LoadError status={addProductMutation.status} />
      <ProductForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        toggleEnabled={toggleEnabled}
        product={newProduct}
        placeholderImage={placeholderImage}
        emptyFields={emptyFields}
        errorMessage={errorMessage}
        buttonText={buttonText}
        invalidFields={invalidFields}
        pageTitle={'Add a product'}
        originalProduct={originalProduct}
      />
    </>
  )
}

export default AddProduct
