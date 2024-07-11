import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  deleteWishlistItemByProductId,
  getDisplayWishlistItems,
} from '../../../services/wishlist'
import LoadError from '../../components/LoadError/LoadError'
import { DisplayWishlistItem } from '../../../../models/Wishlist'
import {
  getCartItemsFromLocalStorage,
  updateCartItemQuantityByProductId,
} from '../../../services/cart'

const Wishlist = () => {
  const queryClient = useQueryClient()

  //fetch query
  const wishListQuery = useQuery('fetchWishlist', async () => {
    return getDisplayWishlistItems()
  })

  const cartQuery = useQuery('fetchCart', getCartItemsFromLocalStorage)

  const statuses = [wishListQuery.status, cartQuery.status]

  //add to the cart mutation
  const cartMutation = useMutation(
    async ({ productId, quantity }: { productId: number; quantity: number }) =>
      updateCartItemQuantityByProductId(productId, quantity),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('fetchCart')
      },
    }
  )

  // remove from the wishList mutation
  const romoveMutation = useMutation(
    async ({ productId }: { productId: number }) =>
      deleteWishlistItemByProductId(productId),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('fetchWishlist')
      },
    }
  )

  function handleCartDetails(productId: number) {
    const product = cartQuery.data?.find((item) => item.productId === productId)
    const quantity = product ? product.quantity + 1 : 1
    cartMutation.mutate({ productId, quantity })
  }
  console.log(wishListQuery.data)
  async function removeFromWishList(productId: number) {
    romoveMutation.mutate({ productId })
  }
  return (
    <>
      <LoadError status={statuses} />
      <div className="bg-white w-full flex flex-col items-center py-8">
        <div className="w-10/12 text-center mb-4">
          <h1 className="text-4xl font-semibold text-black">WISHLIST</h1>
        </div>
        {wishListQuery.data && wishListQuery.data.length === 0 ? (
          <div className="bg-white w-10/12 flex flex-row gap-10 items-center border-b border-gray-300 py-4">
            <h1 className="text-2xl font-medium text-black">
              Your wishlist is empty 😔
            </h1>
          </div>
        ) : (
          <div className="bg-white w-10/12">
            {!wishListQuery.isLoading &&
              wishListQuery.data &&
              wishListQuery.data.map((item: DisplayWishlistItem) => (
                <div
                  key={item.id}
                  className="bg-white w-10/12 flex flex-row gap-10 items-center border-b border-gray-300 py-4"
                >
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-3/12 object-cover"
                  />
                  <h1 className="text-xl font-medium text-black w-3/12">
                    {item.productName}
                  </h1>
                  <h1 className="text-xl font-semibold text-black w-1/12">
                    ${item.productPrice.toFixed(2)}
                  </h1>
                  <button
                    className="w-1/6 text-sm bg-black text-white p-2 rounded-md hover:bg-gray-700 transition"
                    onClick={() => handleCartDetails(item.productId)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="flex flex-col items-center text-black hover:text-red-500 transition"
                    onClick={() => removeFromWishList(item.productId)}
                  >
                    <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                    <p className="text-sm mt-1">Remove</p>
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Wishlist
