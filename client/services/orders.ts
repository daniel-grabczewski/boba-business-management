import {
  AdminOrderSummary,
  Order,
  OrderCheckoutDetails,
  UserOrderSummary,
  OrderItemExtraDetails,
  OrderExtraDetails,
} from '../../models/Orders'
import initialOrders from '../data/ordersData'
import { deleteAllCartItems, getCartItemsFromLocalStorage } from './cart'
import { CartItem } from '../../models/Cart'
import { getDemoUserDetails } from './users'
import { generateCurrentDateTime } from '../utils/generateDate'
import { formatDateToDDMMYYYY } from '../utils/formatDate'
import { getProductByIdAdmin, getProductByIdShopper } from './products'
import { getShippingOptionById } from './shipping'
import { getUserByUserId } from './users'
import { generateUniqueOrderId } from '../utils/generateUniqueOrderId'

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

// Replace localStorage orders with given orders
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
    const [order] = orders.filter((order) => order.id === id)
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
    const userOrders = orders.filter((order) => order.userId === userId)
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

// Create order using details entered into checkout and data of Demo user's cart in local storage, then delete Demo user's cart.
export function createOrder(orderCheckoutDetails: OrderCheckoutDetails): void {
  try {
    const cart: CartItem[] = getCartItemsFromLocalStorage()
    if (cart.length === 0) {
      console.log('Cart is empty. No order created.')
      return
    }

    const demoUser = getDemoUserDetails()

    if (!demoUser) {
      return
    }

    const orders = getOrdersFromLocalStorage()

    const newOrderItems = cart.map(({ productId, quantity }) => ({
      productId,
      quantity,
    }))

    const newOrder: Order = {
      id: generateUniqueOrderId(),
      userId: demoUser.userId,
      purchasedAt: generateCurrentDateTime(),
      shippingId: orderCheckoutDetails.shippingId,
      phoneNumber: orderCheckoutDetails.phoneNumber,
      firstName: orderCheckoutDetails.firstName,
      lastName: orderCheckoutDetails.lastName,
      address: orderCheckoutDetails.address,
      city: orderCheckoutDetails.city,
      zipCode: orderCheckoutDetails.zipCode,
      country: orderCheckoutDetails.country,
      orderItems: newOrderItems,
    }

    orders.push(newOrder)

    setOrdersInLocalStorage(orders)

    deleteAllCartItems()

    console.log('Order created and cart cleared successfully.')
  } catch (error) {
    console.error('Failed to transfer demo user cart to orders:', error)
  }
}

// Get the the latest order the demo user made
export function getLatestOrderOfDemoUser(): Order | null {
  try {
    const demoUser = getDemoUserDetails()
    if (!demoUser) {
      return null
    }
    const demoUserOrders = getOrdersByUserId(demoUser.userId)

    if (demoUserOrders.length === 0) {
      console.log('No orders found for the demo user')
      return null
    }
    const latestId = demoUserOrders.reduce((mostRecent, item) => {
      return new Date(item.purchasedAt) > new Date(mostRecent.purchasedAt)
        ? item
        : mostRecent
    }).id

    const latestOrder = demoUserOrders.find((order) => order.id === latestId)

    if (latestOrder) {
      return latestOrder
    }
    return null
  } catch (error) {
    console.error('Failed to get the latest order id for the demo user:', error)
    return null
  }
}

export function getOrderExtraDetailsById(
  orderId: number
): OrderExtraDetails | undefined {
  try {
    const orders = getOrdersFromLocalStorage()
    const order = orders.find((order) => order.id === orderId)
    if (order) {
      const totalSale = getTotalSaleOfOrderById(order.id)
      const shippingOption = getShippingOptionById(order.shippingId)
      const orderItemsExtraDetails = getOrderItemsExtraDetailsByOrderId(
        order.id
      )
      if (shippingOption && orderItemsExtraDetails) {
        const userEmail = getUserByUserId(order.userId)?.emailAddress
        return {
          orderId: order.id,
          firstName: order.firstName,
          lastName: order.lastName,
          address: order.address,
          city: order.city,
          country: order.country,
          zipCode: order.zipCode,
          email: userEmail ? userEmail : '',
          phoneNumber: order.phoneNumber,
          totalSale: totalSale,
          amountOfItems: order.orderItems.length,
          purchasedAt: order.purchasedAt,
          shippingType: shippingOption.shippingType,
          shippingPrice: shippingOption.price,
          orderItemsExtraDetails: orderItemsExtraDetails,
        }
      }
    }
    return undefined
  } catch (error) {
    console.error(`Error retrieving order details for order ID: ${orderId}`)
    return undefined
  }
}

// Given the order ID, return associated order items as OrderItemExtraDetails[]
export function getOrderItemsExtraDetailsByOrderId(
  orderId: number
): OrderItemExtraDetails[] {
  try {
    const orders = getOrdersFromLocalStorage()
    const orderItems = orders.find((order) => order.id === orderId)?.orderItems
    if (orderItems) {
      const orderItemsDetailed = orderItems
        .map((orderItem) => {
          const product = getProductByIdShopper(orderItem.productId)
          if (product) {
            return {
              productName: product.name,
              productSale: parseFloat(
                (product.price * orderItem.quantity).toFixed(2)
              ),
              productImage: product.image,
              itemQuantity: orderItem.quantity,
            }
          }
          return undefined
        })
        .filter((item): item is OrderItemExtraDetails => item !== undefined)

      return orderItemsDetailed
    }

    return []
  } catch (error) {
    console.error(
      `Error getting order items associated with order ID: ${orderId}`
    )
    return []
  }
}

// Get all orders that demo user has made as OrderExtraDetails[]
export function getDemoUserOrdersExtraDetails(): OrderExtraDetails[] {
  try {
    const orders = getOrdersFromLocalStorage()
    const demoUser = getDemoUserDetails()
    if (demoUser) {
      const demoUserOrders = orders
        .filter((order) => order.userId === demoUser.userId)
        .map((demoOrder) => getOrderExtraDetailsById(demoOrder.id))
        .filter((item): item is OrderExtraDetails => item !== undefined)
      return demoUserOrders
    }
    return []
  } catch (error) {
    console.error(`Error retrieving demo user's orders`)
    return []
  }
}

// Get count of orders that were made on the given 'YYYY-MM-DD HH:MM:SS' date
export function getOrderCountFromDate(date: string): number {
  try {
    const formattedDate = formatDateToDDMMYYYY(date)
    const orders = getOrdersFromLocalStorage()
    const orderCountFromDate = orders.filter(
      (order) => formatDateToDDMMYYYY(order.purchasedAt) === formattedDate
    ).length
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

    const shippingPrice = getShippingOptionById(order.shippingId)?.price ?? 0
    console.log(shippingPrice)

    const totalSale = order.orderItems.reduce((total, orderItem) => {
      try {
        const product = getProductByIdAdmin(orderItem.productId)
        if (product) {
          return total + orderItem.quantity * product.price
        } else {
          console.log(`Product with id ${orderItem.productId} not found`)
        }
      } catch (productError) {
        console.error(
          `Failed to get product by id ${orderItem.productId}:`,
          productError
        )
      }
      return total
    }, 0)

    return totalSale + shippingPrice
  } catch (error) {
    console.error('Failed to get total sale of order by id:', error)
    return 0
  }
}

// Gets all orders of demo user as UserOrderSummary[]
export function getDemoUserOrdersSummary(): UserOrderSummary[] {
  try {
    const demoUser = getDemoUserDetails()

    if (!demoUser) {
      return []
    }
    const demoUserOrders = getOrdersByUserId(demoUser.userId)
    if (demoUserOrders.length === 0) {
      console.log('No orders found for the demo user')
      return []
    }

    const ordersSummary = demoUserOrders.map((order) => {
      const totalSale = getTotalSaleOfOrderById(order.id)

      return {
        orderId: order.id,
        purchasedAt: order.purchasedAt,
        totalSale,
      }
    })

    return ordersSummary
  } catch (error) {
    console.error('Failed to get orders of demo user:', error)
    return []
  }
}

// Gets all orders as AdminOrderSummary[]
export function getAllOrdersAdminSummary(): AdminOrderSummary[] {
  try {
    const orders = getOrdersFromLocalStorage()

    const adminOrdersSummary = orders.map((order) => {
      const user = getUserByUserId(order.userId)
      const userName = user ? user.userName : 'Error retrieving username'
      const shippingOption = getShippingOptionById(order.shippingId)
      const shippingPrice = shippingOption ? shippingOption.price : 0
      const totalSale = getTotalSaleOfOrderById(order.id)

      return {
        userName,
        orderId: order.id,
        totalSale,
        purchasedAt: order.purchasedAt,
        shippingPrice,
      }
    })

    return adminOrdersSummary
  } catch (error) {
    console.error('Failed to get all orders summary:', error)
    return []
  }
}
