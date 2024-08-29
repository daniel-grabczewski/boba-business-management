import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getDisplayCartItems } from '../../../services/cart'
import { DisplayCartItem } from '../../../../models/Cart'
import { getShippingOptionsFromLocalStorage } from '../../../services/shipping'
import { ShippingOption } from '../../../../models/ShippingOptions'
import { useEffect, useState } from 'react'
import { createOrder } from '../../../services/orders'
import { getDemoUserDetails } from '../../../services/users'
import { useNavigate } from 'react-router-dom'
import {
  DeliveryAddress,
  PaymentMethod,
  ShippingMethod,
  OrderSummary,
} from '../../components'
import LoadError from '../../components/LoadError/LoadError'
import {
  checkIfStringIsOnlyLetters,
  checkIfStringIsOnlyNumbers,
} from '../../../utils/checkInput'
import EmptyCart from '../../components/EmptyCart/EmptyCart'
import { baseURL } from '../../../../baseUrl'

function Checkout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [cartProducts, setCartProducts] = useState([] as DisplayCartItem[])

  const [loadDefaultButtonText, setloadDefaultButtonText] = useState(
    'Load defaults from profile'
  )

  const [userDetails, setUserDetails] = useState({
    userId: 'auth0|demoUser',
    firstName: '',
    lastName: '',
    userName: 'demo.user',
    phoneNumber: '',
    emailAddress: 'DemoUser@example.com',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  })

  const [displayUserDetails, setDisplayUserDetails] = useState({
    userId: 'auth0|demoUser',
    firstName: '',
    lastName: '',
    userName: 'demo.user',
    phoneNumber: '',
    emailAddress: 'DemoUser@example.com',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  })

  const [selectedShipping, setSelectedShipping] = useState({
    id: 0,
    shippingType: '',
    price: 0,
  })

  const [previewDefaultDetailsColor, setPreviewDefaultDetailsColor] =
    useState('')

  const [emptyFields, setEmptyFields] = useState<string[]>([])
  const [invalidFields, setInvalidFields] = useState<string[]>([])

  const [errorMessage, setErrorMessage] = useState('')

  const CartQuery = useQuery(
    'getDisplayCartItems',
    async () => getDisplayCartItems(),
    {
      onSuccess: (data: DisplayCartItem[]) => {
        setCartProducts(data)
      },
    }
  )

  const { data: shippingOptions, status: statusShipping } = useQuery(
    'getShippingOptionsFromLocalStorage',
    async () => getShippingOptionsFromLocalStorage()
  )

  useEffect(() => {
    if (shippingOptions) {
      setSelectedShipping(shippingOptions[0])
    }
  }, [shippingOptions])

  const { data: defaultUserDetails } = useQuery(
    'getDemoUserDetails',
    async () => getDemoUserDetails()
  )

  const statuses = [statusShipping, CartQuery.status]

  const purchaseMutation = useMutation(
    async ({ shippingId }: { shippingId: number }) =>
      createOrder({
        shippingId,
        phoneNumber: userDetails.phoneNumber,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        address: userDetails.address,
        city: userDetails.city,
        zipCode: userDetails.zipCode,
        country: userDetails.country,
      }),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('getOrderById')
        queryClient.invalidateQueries('getOrdersFromLocalStorage')
        queryClient.invalidateQueries('getLatestOrderOfDemoUser')
      },
    }
  )

  // Checks if all values in the provided object are non-empty strings.
  const checkValues = (obj: { [key: string]: string }) => {
    const emptyKeys = Object.keys(obj).filter((key) => obj[key] === '')
    setEmptyFields(emptyKeys)
    return emptyKeys.length === 0 && invalidFields.length === 0
  }

  // Checks if all fields in userDetails are filled and valid.
  const checkAllFieldsAreEligable = () => {
    const allFieldsFilled = !Object.values(userDetails).some(
      (value) => value === ''
    )
    const allFieldsValid =
      checkIfStringIsOnlyNumbers(userDetails.zipCode) &&
      checkIfStringIsOnlyNumbers(userDetails.phoneNumber)
    return allFieldsFilled && allFieldsValid
  }

  useEffect(() => {
    if (checkAllFieldsAreEligable()) {
      setErrorMessage('')
    }
  }, [userDetails])

  const fillDetailsWithDefaults = () => {
    if (defaultUserDetails) {
      setPreviewDefaultDetailsColor('')
      setEmptyFields([])
      setInvalidFields([])
      setUserDetails(defaultUserDetails)
    }
  }

  const handleShippingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const shippingOption = shippingOptions?.find(
      (option: ShippingOption) => option.id === Number(e.target.value)
    )

    if (shippingOption) {
      setSelectedShipping({
        id: shippingOption.id,
        shippingType: shippingOption.shippingType,
        price: shippingOption.price,
      })
    }
  }

  useEffect(() => {
    setDisplayUserDetails(userDetails)
  }, [userDetails])

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    validationType?: 'letters' | 'numbers'
  ) => {
    const { name, value } = event.target

    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))

    if (value !== '') {
      setEmptyFields((prevFields) =>
        prevFields.filter((field) => field !== name)
      )
    }

    let isValid = true
    if (validationType === 'letters') {
      isValid = checkIfStringIsOnlyLetters(value)
    } else if (validationType === 'numbers') {
      isValid = checkIfStringIsOnlyNumbers(value)
    }

    setInvalidFields((prevFields) => {
      if (isValid) {
        return prevFields.filter((field) => field !== name)
      } else {
        if (!prevFields.includes(name)) {
          return [...prevFields, name]
        }
        return prevFields
      }
    })
  }

  const subtotal = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  )
  const total = subtotal + selectedShipping.price

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const shippingId = selectedShipping.id

    if (checkValues(userDetails)) {
      purchaseMutation.mutate({ shippingId })
      localStorage.setItem('orderCompleted', 'true')
      navigate(`${baseURL}/thankyou`)
    } else {
      setErrorMessage('Please fill all empty fields and correct invalid inputs')
    }
  }

  useEffect(() => {
    if (userDetails === defaultUserDetails) {
      setloadDefaultButtonText('Profile defaults loaded')
    } else {
      setloadDefaultButtonText('Load defaults from profile')
    }
  }, [userDetails])

  const handlePreviewMouseEnter = () => {
    if (defaultUserDetails && defaultUserDetails !== displayUserDetails) {
      setDisplayUserDetails(defaultUserDetails)
      setPreviewDefaultDetailsColor('bg-amber-100')
    }
  }

  const handlePreviewMouseLeave = () => {
    setDisplayUserDetails(userDetails)
    setPreviewDefaultDetailsColor('')
  }

  return (
    <>
      <LoadError status={statuses} />
      {cartProducts.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="text-4xl font-bold text-center mt-12">
            <h1>Checkout</h1>
          </div>
          <div className="text-black p-8 flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-3/5">
              <DeliveryAddress
                handleFieldChange={handleFieldChange}
                fillDetailsWithDefaults={fillDetailsWithDefaults}
                displayUserDetails={displayUserDetails}
                userDetails={userDetails}
                emptyFields={emptyFields}
                invalidFields={invalidFields}
                handlePreviewMouseEnter={handlePreviewMouseEnter}
                handlePreviewMouseLeave={handlePreviewMouseLeave}
                previewDefaultDetailsColor={previewDefaultDetailsColor}
                loadDefaultButtonText={loadDefaultButtonText}
              />
              <div className="flex flex-col mb-8">
                <PaymentMethod />
                {!(statusShipping === 'loading') && shippingOptions && (
                  <ShippingMethod
                    shippingOptions={shippingOptions}
                    handleShippingChange={handleShippingChange}
                  />
                )}
              </div>
              <OrderSummary
                cartProducts={cartProducts}
                subtotal={subtotal}
                selectedShipping={selectedShipping}
                total={total}
              />
              <div className="flex flex-row w-full justify-between items-center">
                <button
                  className="bg-green-500 text-white p-4 w-half text-lg font-bold rounded-md transition-all duration-300 hover:bg-green-700 focus:outline-none mt-4"
                  type="submit"
                  style={{ width: '200px', minWidth: '200px' }}
                >
                  COMPLETE ORDER
                </button>
                <p className="p-4 text-red-500">{errorMessage}</p>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  )
}

export default Checkout
