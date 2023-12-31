import { WishlistProduct } from '../../models/Wishlist'
import connection from './connection'

export async function getWishlistByUserId(userId: string, db = connection) {
  return (await db('wishlist')
    .join('products', 'product_id', 'products.id')
    .join('users', 'users.auth0_id', 'wishlist.user_id')
    .where('wishlist.user_id', userId)
    .select(
      'wishlist.id',
      'product_id as productId',
      'products.name as productName',
      'products.image as productImage',
      'products.price as productPrice',
    )) as WishlistProduct[]
}

export async function getWishlistStatusByProductId(
  productId: number,
  userId: string,
  db = connection
) {
  const wishlistItem = await db('wishlist')
    .where('product_id', productId)
    .where('user_id', userId)
    .select('product_id as productId')
    .first()

  return !!wishlistItem
}

export async function addToWishlistByProductId(
  productId: number,
  userId: string,
  db = connection
) {
  const existingItem = await db('wishlist')
    .where({
      user_id: userId,
      product_id: productId,
    })
    .first()

  if (!existingItem) {
    return await db('wishlist').insert({
      user_id: userId,
      product_id: productId,
    })
  } else {
    throw new Error('Item already in wishlist')
  }
}

export async function removeFromWishlistByProductId(
  productId: number,
  userId: string,
  db = connection
) {
  await db('wishlist')
    .where('product_id', productId)
    .where('user_id', userId)
    .delete()
}
