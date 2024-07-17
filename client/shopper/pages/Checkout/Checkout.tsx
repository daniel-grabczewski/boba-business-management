import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getDisplayCartItems } from '../../../services/cart'
import { DisplayCartItem } from '../../../../models/Cart'
import { getShippingOptionsFromLocalStorage } from '../../../services/shipping'
import { ShippingOption } from '../../../../models/ShippingOptions'
import { useEffect, useState } from 'react'
import { transferDemoUserCartToOrders } from '../../../services/orders'
import { getDemoUserDetails } from '../../../services/users'
import { useNavigate } from 'react-router-dom'
import {
  DeliveryAddress,
  PaymentMethod,
  ShippingMethod,
  OrderSummary,
} from '../../components'
import LoadError from '../../components/LoadError/LoadError'
import { checkIfStringIsOnlyNumbers } from '../../../utils/checkInput'

function Checkout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [cartProducts, setCartProduct] = useState([] as DisplayCartItem[])

  //I want to it so t hat when the user hovers over the load defaults, it will show a preview of what will be filled.
  //It will be in yellow background, dark text as they hover.
  //Create a state for the preview. previewDefaultDetails Details. Set it equal to the profile defaults.
  //Create a state called displayUserDetails, which will be what actually shows up on the page.
  //Create a state called userDetails, which is what is updated when the user makes changes. And then it is synced up to the displayUserDetails.
  //Create a state called previewDetailsColor, most of the time it is empty, otherwise it is set to a beige yellow
  //When the user hovers over the default button, temporarily displayUserDetails the state shows the color and the default demo user
  //When they let go, then the state is returned to the userDetails
  //If they click it, then userDetails becomes equal to the demo details.

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
    type: '',
    price: 0,
  })

  const [previewDefaultColor, setPreviewDefaultColor] = useState('')

  const [emptyFields, setEmptyFields] = useState<string[]>([])
  const [invalidFields, setInvalidFields] = useState<string[]>([])

  const [errorMessage, setErrorMessage] = useState('empty')

  const CartQuery = useQuery(
    'getDisplayCartItems',
    async () => getDisplayCartItems(),
    {
      onSuccess: (data: DisplayCartItem[]) => {
        setCartProduct(data)
      },
    }
  )

  const { data: shippingOptions, status: statusShipping } = useQuery(
    'getShippingOptionsFromLocalStorage',
    async () => getShippingOptionsFromLocalStorage()
  )

  const { data: defaultUserDetails } = useQuery(
    'getDemoUserDetails',
    async () => getDemoUserDetails()
  )

  const statuses = [statusShipping, CartQuery.status]

  const purchaseMutation = useMutation(
    async ({ shippingId }: { shippingId: number }) =>
      transferDemoUserCartToOrders(shippingId),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('getOrderById')
        queryClient.invalidateQueries('getOrdersFromLocalStorage')
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
      setPreviewDefaultColor('')
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
        type: shippingOption.shippingType,
        price: shippingOption.price,
      })
    }
  }

  const handleUserDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>
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
  }

  useEffect(() => {
    setDisplayUserDetails(userDetails)
  }, [userDetails])

  const handleNumberOnlyFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    handleUserDetailsChange(event)
    if (checkIfStringIsOnlyNumbers(value)) {
      setInvalidFields((prevFields) =>
        prevFields.filter((field) => field !== name)
      )
    } else {
      setInvalidFields((prevFields) => {
        if (!prevFields.includes(name)) {
          return [...prevFields, name]
        }
        return prevFields
      })
    }
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
      navigate('/thankyou')
    } else {
      setErrorMessage('Please fill all empty fields and correct invalid inputs')
    }
  }

  const handlePreviewMouseEnter = () => {
    if (defaultUserDetails && defaultUserDetails !== displayUserDetails) {
      setDisplayUserDetails(defaultUserDetails)
      setPreviewDefaultColor('bg-amber-100')
    }
  }

  const handlePreviewMouseLeave = () => {
      setDisplayUserDetails(userDetails)
      setPreviewDefaultColor('')
  }

  return (
    <>
      <LoadError status={statuses} />
      <div className="text-4xl font-bold text-center mt-12">
        <h1>Checkout</h1>
      </div>
      <div className="text-black p-8 flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className="w-3/5">
          <DeliveryAddress
            handleUserDetailsChange={handleUserDetailsChange}
            handleNumberOnlyFieldChange={handleNumberOnlyFieldChange}
            fillDetailsWithDefaults={fillDetailsWithDefaults}
            displayUserDetails={displayUserDetails}
            emptyFields={emptyFields}
            invalidFields={invalidFields}
            handlePreviewMouseEnter={handlePreviewMouseEnter}
            handlePreviewMouseLeave={handlePreviewMouseLeave}
            previewDefaultColor={previewDefaultColor}
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
              className="bg-gray-500 text-white p-4 w-half text-lg font-bold rounded-md transition-colors hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 mt-4"
              type="submit"
            >
              COMPLETE ORDER
            </button>
            <p className="p-4 text-red-500">{errorMessage}</p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Checkout
