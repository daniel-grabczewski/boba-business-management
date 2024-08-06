import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { DisplayCartItem } from '../../../../models/Cart'
import {
  deleteAllCartItems,
  deleteItemFromCartByProductId,
  getDisplayCartItems,
  updateCartItemQuantityByProductId,
} from '../../../services/cart'
import LoadError from '../../components/LoadError/LoadError'
import EmptyCart from '../../components/EmptyCart/EmptyCart'
import { useEffect } from 'react'
import { formatCurrency } from '../../../utils/formatCurrency'

const Cart = () => {
  const queryClient = useQueryClient()

  const { data, status } = useQuery('getDisplayCartItems', async () =>
    getDisplayCartItems()
  )

  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const modifyQuantityMutation = useMutation<
    void,
    Error,
    { productId: number; quantity: number }
  >(
    async ({ productId, quantity }) => {
      if (quantity > 0) {
        updateCartItemQuantityByProductId(productId, quantity)
      } else {
        deleteItemFromCartByProductId(productId)
      }
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('getDisplayCartItems')
      },
    }
  )

  const deleteProductMutation = useMutation(
    async (productId: number) => {
      deleteItemFromCartByProductId(productId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getDisplayCartItems')
      },
    }
  )

  const deleteCartItemsMutation = useMutation(
    async () => {
      deleteAllCartItems()
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getDisplayCartItems')
      },
    }
  )

  return (
    <>
      <LoadError status={status} />
      {data?.length === 0 ? (
        <EmptyCart />
      ) : (
        <div
          className="flex justify-center items-center"
          style={{ marginTop: '50px', marginBottom: '50px' }}
        >
          <div className="flex w-3/5 justify-center items-center">
            <div className="w-3/5 pl-6">
              <h1 className="text-3xl font-bold tracking-wider">CART</h1>
              <div
                className="mt-4 space-y-4 overflow-y-auto "
                style={{ maxHeight: '650px' }}
              >
                {data &&
                  data.map((item: DisplayCartItem) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between mb-6 border p-4 rounded-md"
                    >
                      <div className="flex-shrink-0 w-1/4 pr-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ maxHeight: '120px', maxWidth: '150px' }}
                          className="w-full h-48 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-gray-600">
                          {formatCurrency(item.price)}
                        </p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                modifyQuantityMutation.mutate({
                                  productId: item.productId,
                                  quantity: item.quantity - 1,
                                })
                              } else {
                                deleteProductMutation.mutate(item.productId)
                              }
                            }}
                            className="px-2 py-1 bg-gray-300 text-gray-600 rounded-full transition-colors hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
                          >
                            -
                          </button>
                          <p className="px-3">{item.quantity}</p>
                          <button
                            onClick={() => {
                              modifyQuantityMutation.mutate({
                                productId: item.productId,
                                quantity: item.quantity + 1,
                              })
                            }}
                            className="px-2 py-1 bg-gray-300 text-gray-600 rounded-full transition-colors hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            deleteProductMutation.mutate(item.productId)
                          }
                          className="mt-3 px-3 py-1 text-sm bg-red-500 text-white rounded-md transition-colors hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="font-bold text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
              </div>
              <button
                onClick={() => deleteCartItemsMutation.mutate()}
                className="mt-3 px-3 py-1 text-sm bg-gray-500 text-white rounded-md transition-colors hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
              >
                Clear Cart
              </button>
            </div>

            <div className="w-1/3 pl-6">
              <div
                className="p-8 rounded-md bg-gray-500 text-white"
                style={{ maxWidth: '340px' }}
              >
                {data && (
                  <div className="flex justify-between">
                    <p className="font-bold">Total: </p>
                    <p className="">
                      {' '}
                      ${' '}
                      {data
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                )}
                <div className="flex justify-between">
                  <p className="font-bold">Shipping: </p>
                  <div>
                    <p className="">TBC</p>
                  </div>
                </div>
                <button
                  onClick={() => goTo('/checkout')}
                  className="mt-4 w-full py-2 bg-gray-400 text-white font-bold rounded-md transition-colors hover:bg-gray-700 hover:text-white focus:outline-none focus:ring focus:ring-black"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
