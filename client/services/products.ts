import {
  ShopperProduct,
  UpsertProduct,
  AdminProduct,
  LowStockProducts,
} from '../../models/Products'
import initialProducts from '../data/productsData'

//ADD FAIL/SUCCESS STATUS LATER??

//Needed apis:
//set products in localStorage initialize
//set products in localStore
//get products from localStorage
//!fetchProductByIdAdmin(id : number)
//fetchProductByIdShopper(id : number)
//!fetchAllProductsAdmin()
//fetchAllProductsShopper()
//!getProductsBelowStockThreshold(stockThreshold : number)
//!countProductsBelowStockThreshold(stockThreshold : number)
//!updateProductById(id: number, updatedProduct: UpsertProduct)
//!createProduct(newProduct: UpsertProduct)
//!deleteProduct(productId)

// If localStorage is empty, initialize localStorage to be equal to initialProducts
export function setProductsInLocalStorageInitial(): void {
  const productsInStorage = localStorage.getItem('products')

  if (!productsInStorage) {
    localStorage.setItem('products', JSON.stringify(initialProducts))
  }
}

// Replace localStore products, with given products
export function setProductsInLocalStorage(products: AdminProduct[]): void {
  localStorage.setItem('products', JSON.stringify(products))
}

// Retrieve array of objects 'products' from localStorage
function getProductsFromLocalStorage(): AdminProduct[] {
  const products = localStorage.getItem('products')
  return products ? JSON.parse(products) : []
}

//! Get all products from localStorage for admin use, INCLUDING the isEnabled field
export function getAllProductsAdmin(): AdminProduct[] {
  return getProductsFromLocalStorage()
}

// Get all products from localStorage for shopper use, WITHOUT the isEnabled field
export function getAllProductsShopper(): ShopperProduct[] {
  const products = getProductsFromLocalStorage()
  const enabledProducts = products.filter((product) => product.isEnabled)
  const shopperProducts = enabledProducts.map(({ isEnabled, ...rest }) => rest)
  return shopperProducts
}

//! Get product that matches given id, for admin use
export function getProductByIdAdmin(id: number): AdminProduct {
  const products = getAllProductsAdmin()
  const [product] = products.filter((product) => product.id === id)
  return product
}

// Get product that matches given id, for shopper use
export function getProductByIdShopper(id: number): ShopperProduct {
  const products = getAllProductsShopper()
  const [product] = products.filter((product) => product.id === id)
  return product
}

//! Get id, name and image of products below given stockThreshold
export function getProductsBelowStockThreshold(
  stockThreshold: number
): LowStockProducts[] {
  const products = getAllProductsAdmin()
  return products
    .filter((product) => product.stock < stockThreshold)
    .map(({ id, name, image }) => ({ id, name, image }))
}

//! Get count of products that are below given stockThreshold
export function countProductsBelowStockThrehold(stockThreshold: number): number {
  const products = getProductsBelowStockThreshold(stockThreshold)
  return products.length
}

//! Update details of product, given it's id and updated object fields
export function updateProductById(
  id: number,
  updatedProduct: UpsertProduct
): void {
  const products = getAllProductsAdmin()
  const productIndex = products.findIndex((product) => product.id === id)
  if (productIndex !== -1) {
    // Merge the existing product with the updated fields
    products[productIndex] = {
      ...products[productIndex],
      ...updatedProduct,
    }
    setProductsInLocalStorage(products)
  }
}
