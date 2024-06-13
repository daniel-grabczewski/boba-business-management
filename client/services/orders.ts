import { Order } from '../../models/Orders'
import initialOrders from '../data/ordersData'
import { getCartFromLocalStorage } from './cart'
import { CartItem } from '../../models/Cart'

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
    orders.length > 0
      ? Math.max(...orders.map((orders) => orders.id)) + 1
      : 1

  return newId
}

