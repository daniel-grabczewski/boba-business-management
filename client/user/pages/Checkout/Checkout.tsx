import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getDisplayCartItems } from '../../../services/cart'
import { DisplayCartItem } from '../../../../models/Cart'
import { getShippingOptionsFromLocalStorage } from '../../../services/shipping'
import { ShippingOption } from '../../../../models/ShippingOptions'
import { useState } from 'react'
import { transferDemoUserCartToOrders } from '../../../services/orders'
import { UpdateUser } from '../../../../models/Users'
import {  } from '../../../services/users'
import { useNavigate } from 'react-router-dom'
import {
  PaymentInformation,
  DeliveryAddress,
  PaymentMethod,
  ShippingMethod,
  OrderSummary,
} from '../../components'
import LoadError from '../../components/LoadError/LoadError'

function Checkout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [cartProducts, setCartProduct] = useState([] as DisplayCartItem[])
  const [userDetails, setUserDetails] = useState({
    phoneNumber: '',
    firstName: '',
    lastName: '',
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
  //Different Query
  const ShippingQuery = useQuery('fetchAllShippingOptions', async () => {
    return await getShippingOptionsFromLocalStorage()
  })

  const CartQuery = useQuery(
    'fetchCart',
    async () => {
      const cartData = getDisplayCartItems()
      return cartData
    },
    {
      onSuccess: (data: DisplayCartItem[]) => {
        setCartProduct(data)
      },
    }
  )

  const statuses = [ShippingQuery.status, CartQuery.status]

  //Mutation of Different Query
  const purchaseMutation = useMutation(
    async ({ shippingId }: { shippingId: number }) =>
      transferDemoUserCartToOrders(shippingId),
    {
      onSuccess: async () => {
        //Need to check the api function
        queryClient.invalidateQueries('fetchOrderByOrderId')
        queryClient.invalidateQueries('fetchAllOrders')
      },
    }
  )

  const updateUserDataMutation = useMutation(
    async (updatedDetail: UpdateUser) => {
      //! NEED A FUNCTION TO UPDATE USER DETAILS
      return modifyUserDetails(updatedDetail)
    },
    {
      onSuccess: async () => {
        //Need to check the user api function
        queryClient.invalidateQueries('fetchUser')
        queryClient.invalidateQueries('fetchUserName')
      },
    }
  )

  const handleShippingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const shippingOption = ShippingQuery.data?.find(
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

  //! USED TO UPDATE PHONE NUMBER, DELIVERY ADDRESS, 
  function handleUserDetailsChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setUserDetails({
      ...userDetails,
      [name]: value,
    })
  }

  const subtotal = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  )
  const total = subtotal + selectedShipping.price

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateUserDataMutation.mutate(userDetails)
    const shippingId = selectedShipping.id
    purchaseMutation.mutate({ shippingId })
    navigate('/thankyou')
  }

  return (
    <>
      <LoadError status={statuses} />
      <div className=" text-black p-8">
        <div className="text-4xl font-bold mb-4">I am the Logo</div>
        <form onSubmit={handleSubmit}>
          <PaymentInformation
            handleUserDetailsChange={handleUserDetailsChange}
          />
          <DeliveryAddress handleUserDetailsChange={handleUserDetailsChange} />
          <PaymentMethod />
          {!ShippingQuery.isLoading && ShippingQuery.data && (
            <ShippingMethod
              shippingData={ShippingQuery.data}
              handleShippingChange={handleShippingChange}
            />
          )}
          <OrderSummary
            cartProducts={cartProducts}
            subtotal={subtotal}
            selectedShipping={selectedShipping}
            total={total}
          />
          <button
            className="bg-black text-white p-4 w-full text-lg font-bold"
            type="submit"
          >
            COMPLETE ORDER
          </button>
        </form>
      </div>
    </>
  )
}

export default Checkout
