import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import {
  addItemToCartByProductId,
  deleteAllCartItems,
  deleteItemFromCartByProductId,
  getAvailableStockByProductId,
  getDisplayCartItems,
  reduceCartItemQuantityByProductId,
} from '../../../services/cart'
import LoadError from '../../components/LoadError/LoadError'
import EmptyCart from '../../components/EmptyCart/EmptyCart'
import { useEffect, useMemo } from 'react'
import { formatCurrency } from '../../../utils/formatCurrency'
import { lowStockThreshold } from '../../../data/lowStockThreshold'
import { baseURL } from '../../../../baseUrl'

const Cart = () => {
  const queryClient = useQueryClient()

  const { data, status } = useQuery('getDisplayCartItems', async () =>
    getDisplayCartItems()
  )

  const cartItemsWithStock = useMemo(() => {
    return (data || []).map((item) => ({
      ...item,
      availableStock: getAvailableStockByProductId(item.productId),
    }))
  }, [data])

  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(`${baseURL}${link}`)
  }

  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const increaseQuantityMutation = useMutation<
    void,
    Error,
    { productId: number }
  >(
    async ({ productId }) => {
      addItemToCartByProductId(productId)
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('getDisplayCartItems')
      },
    }
  )

  const reduceQuantityMutation = useMutation<
    void,
    Error,
    { productId: number }
  >(
    async ({ productId }) => {
      reduceCartItemQuantityByProductId(productId)
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
        <div className="flex flex-col justify-center items-center mt-10 mb-10 lg:min-h-auto px-4 pb-24 lg:pb-0">
          <h1 className="text-3xl font-bold tracking-wider mb-8">CART</h1>
          <div className="w-full lg:w-3/5 flex flex-col lg:flex-row lg:gap-8">
            {/* Cart items */}
            <div className="w-full lg:w-2/3 lg:max-h-screen lg:overflow-y-auto mb-6 lg:mb-0">
              <div className="space-y-4">
                {cartItemsWithStock &&
                  cartItemsWithStock.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between mb-4 border p-4 rounded-md shadow-sm bg-white"
                    >
                      <div
                        className="flex-shrink-0 w-1/3 sm:w-1/4 cursor-pointer"
                        onClick={() => goTo(`/shop/${item.productId}`)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-20 sm:h-28 object-contain"
                        />
                      </div>
                      <div className="flex-1 px-2 sm:px-4">
                        <h3
                          className="font-bold text-sm sm:text-lg cursor-pointer mb-1 sm:mb-2"
                          onClick={() => goTo(`/shop/${item.productId}`)}
                        >
                          {item.name}
                        </h3>
                        <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">
                          {formatCurrency(item.price)}
                        </p>
                        <div className="flex items-center mt-1 sm:mt-2 select-none">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                reduceQuantityMutation.mutate({
                                  productId: item.productId,
                                })
                              } else {
                                deleteProductMutation.mutate(item.productId)
                              }
                            }}
                            className="px-2 py-1 bg-gray-300 text-gray-600 rounded-full transition-all duration-300 hover:bg-gray-400 focus:outline-none cursor-pointer"
                          >
                            -
                          </button>
                          <p className="px-2 text-sm sm:text-base">
                            {item.quantity}
                          </p>
                          <button
                            onClick={() => {
                              increaseQuantityMutation.mutate({
                                productId: item.productId,
                              })
                            }}
                            className="px-2 py-1 bg-gray-300 text-gray-600 rounded-full transition-all duration-300 hover:bg-gray-400 focus:outline-none cursor-pointer"
                            style={{ width: '24px', marginBottom: '2px' }}
                          >
                            +
                          </button>
                          <p
                            style={{
                              fontSize: '12px',
                              marginLeft: '8px',
                              marginBottom: '2px',
                            }}
                            className="text-red-500 font-semibold"
                          >
                            {item.availableStock === 0
                              ? 'All available stock in your cart'
                              : item.availableStock <= lowStockThreshold
                              ? `${item.availableStock} left in stock`
                              : ''}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            deleteProductMutation.mutate(item.productId)
                          }
                          className="mt-2 sm:mt-3 px-2 py-1 text-xs sm:text-sm bg-red-500 text-white rounded-md transition-all duration-300 hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 select-none"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="font-bold text-right mt-4 sm:mt-0 text-sm sm:text-base">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                <button
                  onClick={() => deleteCartItemsMutation.mutate()}
                  className="mt-6 mb-12 px-4 py-2 text-sm bg-gray-500 text-white rounded-md transition-all duration-300 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 select-none"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Checkout section */}
            <div className="w-full lg:w-1/3 lg:relative lg:top-0 lg:right-0 lg:h-auto lg:flex lg:flex-col lg:justify-start">
              <div className="fixed lg:relative bottom-0 left-0 w-full lg:w-auto flex justify-center lg:justify-end bg-white lg:bg-transparent shadow-md lg:shadow-none p-4 lg:p-0 z-10">
                <div className="p-6 rounded-md bg-gray-100 text-gray-800 shadow-md lg:shadow-none w-full lg:w-80">
                  {data && (
                    <div className="flex justify-between mb-4">
                      <p className="font-bold">Total: </p>
                      <p>
                        $
                        {data
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between mb-6">
                    <p className="font-bold">Shipping: </p>
                    <p>TBC</p>
                  </div>

                  <button
                    onClick={() => goTo('/checkout')}
                    className="mt-auto py-2 bg-blue-500 text-white font-bold rounded-md transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 w-full"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
