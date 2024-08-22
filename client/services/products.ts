import { OrderItem } from '../../models/Orders'
import {
  ShopperProduct,
  UpsertProduct,
  AdminProduct,
  LowStockProduct,
} from '../../models/Products'
import initialProducts from '../data/productsData'

// Initialize new key 'products' to be equal to value of initialProducts IF localStorage 'products' key doesn't exist
export function setProductsInLocalStorageInitial(): void {
  try {
    const productsInStorage = localStorage.getItem('products')

    if (!productsInStorage) {
      localStorage.setItem('products', JSON.stringify(initialProducts))
    }
  } catch (error) {
    console.error('Failed to initialize products in localStorage:', error)
  }
}

// Replace localStorage products with given products
export function setProductsInLocalStorage(products: AdminProduct[]): void {
  try {
    localStorage.setItem('products', JSON.stringify(products))
  } catch (error) {
    console.error('Failed to set products in localStorage:', error)
  }
}

// Retrieve array of objects 'products' from localStorage
function getProductsFromLocalStorage(): AdminProduct[] {
  try {
    const products = localStorage.getItem('products')
    return products ? JSON.parse(products) : []
  } catch (error) {
    console.error('Failed to get products from localStorage:', error)
    return []
  }
}

// Get all products from localStorage for admin use, INCLUDING the isEnabled field
export function getAllProductsAdmin(): AdminProduct[] {
  try {
    return getProductsFromLocalStorage()
  } catch (error) {
    console.error('Failed to get all products for admin:', error)
    return []
  }
}

// Get all products from localStorage for shopper use, WITHOUT the isEnabled field
export function getAllProductsShopper(): ShopperProduct[] {
  try {
    const products = getProductsFromLocalStorage()
    const enabledProducts = products.filter((product) => product.isEnabled)
    const shopperProducts = enabledProducts.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ isEnabled, ...rest }) => rest
    )
    return shopperProducts
  } catch (error) {
    console.error('Failed to get all products for shopper:', error)
    return []
  }
}

// Given a product ID and a stock, change the stock associated with the product ID to the given stock
export function updateStockByProductId(id: number, newStock: number) {
  try {
    const products = getProductsFromLocalStorage()
    const updatedStockProducts = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          stock: newStock,
        }
      }
      return product
    })

    setProductsInLocalStorage(updatedStockProducts)
  } catch (error) {
    console.error(
      `Error updating stock of product with ID: ${id} to given stock of ${newStock}`,
      error
    )
  }
}

// Given a product ID, return the stock of the product
export function getStockByProductId(productId: number): number {
  try {
    const product = getProductByIdAdmin(productId)
    if (product) {
      return product.stock
    }
    return 0
  } catch (error) {
    console.error(
      `Failed to retrieve stock of product associated with ID: ${productId}`,
      error
    )
    return 0
  }
}

// Returns new product id, unique from every other product id
export function generateNewProductId(): number {
  const products = getAllProductsAdmin()
  const newId =
    products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1

  return newId
}

// Get product that matches given id, for admin use
export function getProductByIdAdmin(id: number): AdminProduct | undefined {
  try {
    const products = getAllProductsAdmin()
    const product = products.find((product) => product.id === id)
    return product
  } catch (error) {
    console.error(`Failed to get product by ID for admin: ${id}`, error)
    return undefined
  }
}

// Get product that matches given id, for shopper use
export function getProductByIdShopper(id: number): ShopperProduct | undefined {
  try {
    const products = getAllProductsShopper()
    const product = products.find((product) => product.id === id)
    return product
  } catch (error) {
    console.error(`Failed to get product by ID for shopper: ${id}`, error)
    return undefined
  }
}

// Get id, name, stock and image of products below given stock threshold, sorting from lowest to highest stock
export function getProductsBelowStockThreshold(
  stockThreshold: number
): LowStockProduct[] {
  try {
    const products = getAllProductsAdmin()
    return products
      .filter((product) => product.stock < stockThreshold)
      .map(({ id, name, image, stock }) => ({ id, name, image, stock }))
      .sort((a, b) => a.stock - b.stock)
  } catch (error) {
    console.error(
      `Failed to get products below stock threshold: ${stockThreshold}`,
      error
    )
    return []
  }
}

// Get count of products that are below given stockThreshold
export function countProductsBelowStockThreshold(
  stockThreshold: number
): number {
  try {
    const products = getProductsBelowStockThreshold(stockThreshold)
    return products.length
  } catch (error) {
    console.error(
      `Failed to count products below stock threshold: ${stockThreshold}`,
      error
    )
    return 0
  }
}

// Update details of product, given its id and updated object fields
export function updateProductById(
  id: number,
  updatedProduct: UpsertProduct
): void {
  try {
    const products = getAllProductsAdmin()
    const productIndex = products.findIndex((product) => product.id === id)
    if (productIndex !== -1) {
      // Merge the existing product with the updated fields
      products[productIndex] = {
        ...products[productIndex],
        ...updatedProduct,
      }
      setProductsInLocalStorage(products)
    } else {
      console.error(`Product with ID: ${id} not found`)
    }
  } catch (error) {
    console.error(`Failed to update product by ID: ${id}`, error)
  }
}

// Create a new product, given its data
export function createProduct(newProduct: UpsertProduct): void {
  try {
    const products = getAllProductsAdmin()

    const newProductId = generateNewProductId()

    products.push({
      id: newProductId,
      ...newProduct,
      averageRating: 0,
    })

    setProductsInLocalStorage(products)
  } catch (error) {
    console.error('Failed to create product:', error)
  }
}

// Given an id, delete the product with the matching id
export function deleteProductById(id: number): void {
  try {
    const products = getAllProductsAdmin()

    const newProducts = products.filter((product) => product.id !== id)

    setProductsInLocalStorage(newProducts)
  } catch (error) {
    console.error(`Failed to delete product with ID: ${id}`, error)
  }
}
