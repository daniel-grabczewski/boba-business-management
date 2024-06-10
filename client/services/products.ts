import {
  ShopperProduct,
  UpsertProduct,
  AdminProduct,
  LowStockProducts,
} from '../../models/Products'
import initialProducts from '../data/productsData'

// If localStorage 'products' key doesn't exist, initialize new key 'products' to be equal to value of initialProducts
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
      ({ isEnabled, ...rest }) => rest
    )
    return shopperProducts
  } catch (error) {
    console.error('Failed to get all products for shopper:', error)
    return []
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

// Get id, name and image of products below given stockThreshold
export function getProductsBelowStockThreshold(
  stockThreshold: number
): LowStockProducts[] {
  try {
    const products = getAllProductsAdmin()
    return products
      .filter((product) => product.stock < stockThreshold)
      .map(({ id, name, image }) => ({ id, name, image }))
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

    const newId = generateNewProductId()

    products.push({
      id: newId,
      ...newProduct,
      averageRating: 0,
    })

    setProductsInLocalStorage(products)
  } catch (error) {
    console.error('Failed to create product:', error)
  }
}

// Delete a product, given its id
export function deleteProduct(removeProductId: number): void {
  try {
    const products = getAllProductsAdmin()

    const newProducts = products.filter(
      (product) => product.id !== removeProductId
    )

    setProductsInLocalStorage(newProducts)
  } catch (error) {
    console.error(`Failed to delete product with ID: ${removeProductId}`, error)
  }
}
