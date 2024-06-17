import { AdminOrderSummary, Order, UserOrderSummary } from '../../models/Orders'
import initialOrders from '../data/ordersData'
import { clearCart, getCartFromLocalStorage } from './cart'
import { CartItem } from '../../models/Cart'
import { getDemoUserDetails } from '../utils/getDemoUserDetails'
import { generateCurrentDateTime } from '../utils/generateDate'
import { formatDateToDDMMYYYY } from '../utils/formatDate'
import { getAllProductsAdmin, getProductByIdAdmin } from './products'

//NEEDED:
// getAllOrdersAdminSummary (gets all orders as AdminOrderSummary[])
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

// Get the id from the latest order the demo user made
export function getIdOfLatestOrderDemoUser(): number {
  const orders = getOrdersFromLocalStorage()
  const demoUser = getDemoUserDetails()
  const userOrders = orders.filter(order => order.userId === demoUser.userId)
  if (userOrders.length === 0) {
    console.log('No orders found for the demo user')
    return -1 
  }
  const latestId = Math.max(...userOrders.map(({id}) => id))

  return latestId
}

// Get count of orders that were made on the given 'DD/MM/YYYY' date
export function getOrderCountFromDate(date: string): number {
  try {
    const orders = getOrdersFromLocalStorage()
    const orderCountFromDate = orders.filter(order => formatDateToDDMMYYYY(order.purchasedAt) === date).length
    return orderCountFromDate
  } catch (error) {
    console.error('Failed to get order count from date:', error)
    return 0
  }
}

// Gets all orders of demo user as UserOrderSummary[]
export function getOrdersOfDemoUser(): UserOrderSummary[] {
  try {
    const orders = getOrdersFromLocalStorage()
    const demoUser = getDemoUserDetails()
    const demoUserOrders = orders.filter(order => order.userId === demoUser.userId)

    const ordersSummary = demoUserOrders.map(order => {
      const totalSale = order.orderItems.reduce((total, orderItem) => {
        const product = getProductByIdAdmin(orderItem.productId)
        if (product) {
          return total + orderItem.quantity * product.price
        }
        return total
      }, 0)

      return {
        orderId: order.id,
        purchasedAt: order.purchasedAt,
        totalSale
      }
    })

    return ordersSummary
  } catch (error) {
    console.error('Failed to get orders of demo user:', error)
    return []
  }
}


