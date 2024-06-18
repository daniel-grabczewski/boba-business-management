import { AdminOrderSummary, Order, UserOrderSummary } from '../../models/Orders'
import initialOrders from '../data/ordersData'
import { clearCart, getCartFromLocalStorage } from './cart'
import { CartItem } from '../../models/Cart'
import { getDemoUserDetails } from '../utils/getDemoUserDetails'
import { generateCurrentDateTime } from '../utils/generateDate'
import { formatDateToDDMMYYYY } from '../utils/formatDate'
import { getAllProductsAdmin, getProductByIdAdmin } from './products'
import { getShippingOptionById } from './shipping'

//NEEDED:
// getAllOrdersAdminSummary (gets all orders as AdminOrderSummary[])


// Initialize new key 'orders' to be equal to value of initialOrders IF localStorage 'orders' key doesn't exist
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

// Get order by given order id
export function getOrderById(id: number): Order | null {
  try {
    const orders = getOrdersFromLocalStorage()
    const [order] = orders.filter(order => order.id === id)
    if (!order) {
      console.log(`Order with id ${id} not found`)
      return null 
    }
    return order
  } catch (error) {
    console.error('Failed to get order by id:', error)
    return null
  }
}

export function getOrdersByUserId(userId: string): Order[] {
  try {
    const orders = getOrdersFromLocalStorage()
    const userOrders = orders.filter(order => order.userId === userId)
    if (userOrders.length === 0) {
      console.log(`No orders found for user with id ${userId}`)
      return []
    }
    return userOrders
  } catch (error) {
    console.error('Failed to get orders by user id:', error)
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
  try {
    const demoUserOrders = getOrdersByUserId(getDemoUserDetails().userId)
    if (demoUserOrders.length === 0) {
      console.log('No orders found for the demo user')
      return -1 
    }
    const latestId = Math.max(...demoUserOrders.map(({id}) => id))

    return latestId
  } catch (error) {
    console.error('Failed to get the latest order id for the demo user:', error)
    return -1
  }
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

// Gets total sale of an order by given order id
export function getTotalSaleOfOrderById(id: number): number {
  try {
    const order = getOrderById(id)
    if (!order) {
      console.log(`Order with id ${id} not found`)
      return 0
    }

    const totalSale = order.orderItems.reduce((total, orderItem) => {
      try {
        const product = getProductByIdAdmin(orderItem.productId)
        if (product) {
          return total + orderItem.quantity * product.price
        } else {
          console.log(`Product with id ${orderItem.productId} not found`)
        }
      } catch (productError) {
        console.error(`Failed to get product by id ${orderItem.productId}:`, productError)
      }
      return total
    }, 0)

    return totalSale
  } catch (error) {
    console.error('Failed to get total sale of order by id:', error)
    return 0
  }
}


// Gets all orders of demo user as UserOrderSummary[]
export function getDemoUserOrdersSummary(): UserOrderSummary[] {
  try {
    const demoUserOrders = getOrdersByUserId(getDemoUserDetails().userId)
    if (demoUserOrders.length === 0) {
      console.log('No orders found for the demo user')
      return []
    }

    const ordersSummary = demoUserOrders.map(order => {
      const totalSale = getTotalSaleOfOrderById(order.id)

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




/*
export interface AdminOrderSummary {
  userName: string
  orderId: number
  totalSale: number
  purchasedAt: string
  shippingPrice: number
}

*/


