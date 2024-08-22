import { OrderItem } from '../../models/Orders'
import {
  ShopperProduct,
  UpsertProduct,
  AdminProduct,
  LowStockProduct,
} from '../../models/Products'
import initialProducts from '../data/productsData'
import { convertStringToSlug } from '../utils/convertStringToSlug'

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

// Given a slug and a product ID associated with it, add it to the local storage deprecated slugs
export function setDeprecatedSlugInLocalStorage(
  slug: string,
  productId: number
): void {
  try {
    const localStorageSlugs = localStorage.getItem('deprecatedSlugs')
    let deprecatedSlugs = []
    if (localStorageSlugs) {
      deprecatedSlugs = JSON.parse(localStorageSlugs)
    }
    // Check if the slug already exists and update the productId if it does
    const existingSlugIndex = deprecatedSlugs.findIndex(
      (item: { slug: string; productId: number }) => item.slug === slug
    )
    if (existingSlugIndex !== -1) {
      deprecatedSlugs[existingSlugIndex].productId = productId
    } else {
      deprecatedSlugs.push({ slug, productId })
    }

    const maxHistorySize = 100
    if (deprecatedSlugs.length > maxHistorySize) {
      deprecatedSlugs = deprecatedSlugs.slice(0, maxHistorySize)
    }

    localStorage.setItem('deprecatedSlugs', JSON.stringify(deprecatedSlugs))
  } catch (error) {
    console.error(
      `Error setting slug ${slug} with associated product ID of ${productId} into local storage: `,
      error
    )
  }
}

// Retrieves the product ID associated with a deprecated slug from local storage. If no matching product ID is found, return undefined
export function getProductIdByDeprecatedSlug(slug: string): number | undefined {
  try {
    const localStorageSlugs = localStorage.getItem('deprecatedSlugs')
    if (!localStorageSlugs) {
      return undefined
    }
    const deprecatedSlugs: { slug: string; productId: number }[] =
      JSON.parse(localStorageSlugs)
    const matchedSlug = deprecatedSlugs.find(
      (deprecatedSlug) => deprecatedSlug.slug === slug
    )
    return matchedSlug?.productId
  } catch (error) {
    console.error(`Error retrieving product ID for slug '${slug}':`, error)
    return undefined
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
export function updateStockOfProductById(id: number, newStock: number) {
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

// Given a product ID, return the slug associated with it
export function getSlugByProductId(id: number): string {
  try {
    const product = getProductByIdAdmin(id)
    if (product) {
      return product.slug
    }
    console.log(`Could not find product with ID of ${id}`)
    return 'default-slug'
  } catch (error) {
    console.error(`Failed to get slug of Product ID: ${id}`, error)
    return 'default-slug'
  }
}

//Given a slug, return the product ID associated with it
export function getProductIdBySlug(slug: string): number {
  try {
    const products = getAllProductsAdmin()
    const product = products.find((product) => product.slug === slug)
    if (product) {
      return product.id
    }
    console.log(`Could not find product with slug of ${slug}`)
    return 0
  } catch (error) {
    console.error(`Failed to get product ID of slug: ${slug}`, error)
    return 0
  }
}

//Given a product name, returns true if it doesn't match the name of any existing products, otherwise it returns false
export function isProductNameUnique(
  productName: string,
  productId?: number
): boolean {
  const products = getAllProductsAdmin()
  const productNameSlug = convertStringToSlug(productName)

  return !products.some(
    (product) =>
      convertStringToSlug(product.name) === productNameSlug &&
      (productId === undefined || product.id !== productId)
  )
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

// Given orderItem as OrderItem, return the number for how much stock was subtracted from the product with the given quantity of the order
// E.g. if the product's stock is only 2, but the desired quantity is 5, then return 2
// Additionally, this function will update the stock of the product by the orderable quantity
export function deductProductStockByOrderItem(orderItem: OrderItem): number {
  try {
    const currentStock = getStockByProductId(orderItem.productId)

    if (currentStock === 0) {
      return 0
    }

    const orderableQuantity = Math.min(currentStock, orderItem.quantity)

    updateStockOfProductById(
      orderItem.productId,
      currentStock - orderableQuantity
    )

    return orderableQuantity
  } catch (error) {
    console.error(
      `Error recalculating stock of order item: ${JSON.stringify(orderItem)}`,
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
    if (!isProductNameUnique(updatedProduct.name, id)) {
      console.log(
        `Unable to update product. There already exists a product with the name ${updatedProduct.name}`
      )
      return
    }

    const newSlug = convertStringToSlug(updatedProduct.name)

    const products = getAllProductsAdmin()
    const productIndex = products.findIndex((product) => product.id === id)
    if (productIndex !== -1) {
      // Merge the existing product with the updated fields
      products[productIndex] = {
        ...products[productIndex],
        ...updatedProduct,
        slug: newSlug,
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
    if (!isProductNameUnique(newProduct.name)) {
      console.log(
        `Unable to create product. There already exists a product with the name ${newProduct.name}`
      )
      return
    }

    const products = getAllProductsAdmin()

    const newProductId = generateNewProductId()

    const productSlug = convertStringToSlug(newProduct.name)

    products.push({
      id: newProductId,
      slug: productSlug,
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
