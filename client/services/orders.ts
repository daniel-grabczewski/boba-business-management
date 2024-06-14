import { Order } from '../../models/Orders'
import initialOrders from '../data/ordersData'
import { clearCart, getCartFromLocalStorage } from './cart'
import { CartItem } from '../../models/Cart'
import { getDemoUserDetails } from '../utils/getDemoUserDetails'
import { generateCurrentDateTime } from '../utils/generateDate'

//NEEDED:
//!(are some of these more appropriate to be written in the cart services?)
// transferDemoUserCartToOrders() (copies the demo user's cart into the orders data, then clears the cart of the demo user)
// getLatestOrderIdOfDemoUser (returns the latest orderId from the order the demo user made)
// getOrderCountFromDate (gets count of the amount of orders that were made on the given date 'DD/MM/YYYY' format)
// getOrdersOfDemoUser (gets all orders of demo user, with interface of UserOrderSummary[])
// getAllOrders (gets all orders as AdminOrderSummary[])
// getOrderById (given order id, returns order as Order interface)

// If localStorage 'orders' key doesn't exist, initialize new key 'orders' to be equal to value of initialOrders
export function setOrdersInLocalStorageInitial(): void {
  try {
    const ordersInStorage = localStorage.getItem('orders')

    if (!ordersInStorage) {
      localStorage.setItem('orders', JSON.stringify(initialOrders))
    }
  } catch (error) {
    console.error('Failed to initialize orders in localStorage:', error)
  }
}

// Retrieve array of objects 'orders' from localStorage
export function setOrdersInLocalStorage(orders: Order[]): void {
  try {
    localStorage.setItem('orders', JSON.stringify(orders))
  } catch (error) {
    console.error('Failed to set orders in localStorage:', error)
  }
}

// Retrieve array of objects 'orders' from localStorage
export function getOrdersFromLocalStorage(): Order[] {
  try {
    const orders = localStorage.getItem('orders')
    return orders ? JSON.parse(orders) : []
  } catch (error) {
    console.error('Failed to get orders from localStorage:', error)
    return []
  }
}

// Generate unique order id
export function generateNewOrderId(): number {
  const orders = getOrdersFromLocalStorage()
  const newId =
    orders.length > 0 ? Math.max(...orders.map((orders) => orders.id)) + 1 : 1

  return newId
}

// Copy Demo User's cart to orders, then delete Demo User's cart.
export function transferDemoUserCartToOrders(shippingId: number): void {
  try {
    const cart: CartItem[] = getCartFromLocalStorage()
    if (cart.length === 0) {
      console.log('Cart is empty. No order created.')
      return
    }

    const orders = getOrdersFromLocalStorage()

    const newOrderItems = cart.map(({ productId, quantity }) => ({
      productId,
      quantity,
    }))

    const newOrder: Order = {
      id: generateNewOrderId(),
      userId: getDemoUserDetails().userId,
      purchasedAt: generateCurrentDateTime(),
      shippingId: shippingId,
      orderItems: newOrderItems,
    }

    orders.push(newOrder)

    setOrdersInLocalStorage(orders)

    clearCart()

    console.log('Order created and cart cleared successfully.')
  } catch (error) {
    console.error('Failed to transfer demo user cart to orders:', error)
  }
}

/*
export interface Order {
  id: number
  userId: string
  purchasedAt: string
  shippingId: number
  orderItems: OrderItem[]
}
interface OrderItem {
  productId: number
  quantity: number
}
*/
