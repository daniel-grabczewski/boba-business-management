import { CartItemInitial, CartItem } from '../../models/Cart'
import products from '../data/productsData'

function getCartFromLocalStorage(): CartItem[] {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

function setCartInLocalStorage(cart: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function getCartApi(): CartItem[] {
  return getCartFromLocalStorage()
}

export function addProductToCartApi(productId: number, quantity = 1): void {}

export function addProductToCartByIdApi(productId: number, quantity = 1): void {
  const cart = getCartFromLocalStorage()
  const index = cart.findIndex((item) => item.productId === productId)

  if (index !== -1) {
    // If the product is already in the cart, increase its quantity by the specified amount
    cart[index].quantity += quantity
  } else {
    // If the product is not in the cart, add it with the specified quantity
    const product = products.find((item) => item.id === productId) // Assuming 'products' is your product data array
    if (product) {
      const newItem: CartItem = {
        id: productId,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        imgSrc: product.imgSrc,
        weight: product.weight,
      }
      cart.push(newItem)
    }
  }

  setCartInLocalStorage(cart)
}

export async function fetchCart(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}`)
      .set('Authorization', `Bearer ${token}`)

    const cartData = response.body.cart as CartClient[]
    return cartData
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function deleteProductFromCart(productId: number, token: string) {
  try {
    await request
      .delete(`${baseUrl}/${productId}`)
      .set('Authorization', `Bearer ${token}`)
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function deleteCartItems(token: string) {
  try {
    await request.delete(`${baseUrl}`).set('Authorization', `Bearer ${token}`)
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function modifyCartProductQuantity(
  productId: number,
  token: string,
  quantity: number
) {
  try {
    await request
      .patch(`${baseUrl}/update-quantity`)
      .send({ productId, quantity })
      .set('Authorization', `Bearer ${token}`)
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}
