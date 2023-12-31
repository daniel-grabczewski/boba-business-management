import { beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import knex from 'knex'

import * as db from './cart'
import config from './knexfile'
import { CartItem } from '../../models/Cart'
const testDb = knex(config.test)

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})

afterAll(async () => {
  await testDb.destroy()
})

// Tests if it returns cart by userId
describe('gets cart by userId', () => {
  it('should return cart by userId', async () => {
    const cart = await db.getCartByUserId('auth0|rigelle-test', testDb)

    expect(cart[0]).toHaveProperty('userId')
    expect(cart[0]).toHaveProperty('productId')
    expect(cart[0]).toHaveProperty('quantity')
  })
})

// Tests if it adds product to cart by userId

describe('checks userId is in the Cart', () => {
  it('should return true if the user is in the cart', async () => {
    const userId = 'auth0|rigelle-test'
    const result = await db.checkIsUserInCart(userId, testDb)
    expect(result).toBe(true)
  })

  it('should return false if the userId is not in the cart', async () => {
    const userId = 'non-existent-user'
    const result = await db.checkIsUserInCart(userId, testDb)
    expect(result).toBe(false)
  })
})

describe('adds product to cart by userId ', () => {
  it('should add a product to the cart', async () => {
    const newItem: CartItem = {
      userId: 'auth0|rigelle-test',
      productId: 15,
      quantity: 5,
    }

    await db.addProductToCartByUserId(newItem, testDb)

    // Check if the item was added to the cart
    const userInCart = await db.checkIsUserInCart('auth0|rigelle-test', testDb)
    expect(userInCart).toBe(true)

    const cartItem = await testDb('cart')
      .where({ user_id: 'auth0|rigelle-test', product_id: 15 })
      .first()

    expect(cartItem.product_id).toBe(newItem.productId)
    expect(cartItem.quantity).toBe(newItem.quantity)
  })
})

// Tests if it updates cart item quantity by productId

describe('update cart item quantity', () => {
  it('update cart item quantity by productId', async () => {
    const updatedCartItem = {
      userId: 'auth0|rigelle-test',
      productId: 6,
      quantity: 5,
    }

    await db.updateCartItemQuantityByProductId(updatedCartItem, testDb)

    const cartItem = await testDb('cart')
      .where({
        product_id: updatedCartItem.productId,
      })
      .first()

    expect(cartItem.quantity).toBe(updatedCartItem.quantity)
  })
})

// Tests if it removes cart item by productId

describe('removes cart item by productId', () => {
  it('should remove a cart item by productId', async () => {
    const userId = 'auth0|rigelle-test'
    const productId = 9

    await db.removeCartItemByProductId(userId, productId, testDb)

    const cart = await testDb('cart')
      .where({ user_id: userId, product_id: productId })
      .delete()

    expect(cart).toEqual(0)
  })
})

// Tests if it clears cart

describe('clears cart', () => {
  it('should remove items in cart', async () => {
    const userId = 'auth0|rigelle-test'

    await db.clearCartByUserId(userId, testDb)

    const cart = await testDb('cart').where({ user_id: userId }).delete()

    expect(cart).toEqual(0)
  })
})
