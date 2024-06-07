import { UserProduct, UpsertProduct, AdminProduct } from '../../models/Products'
import initialProducts from '../data/productsData'

//Needed apis:
//set products in localStorage
//get products from localStorage
//!fetchProductByIdAdmin(id : number)
//fetchProductByIdShopper(id : number)
//!fetchAllProductsAdmin()
//fetchAllProductsShopper()
//!countProductsBelowStockThreshold(stockThreshold : number)
//!modifyProductById(id: number, updatedProduct: UpsertProduct)
//!createProduct(newProduct: UpsertProduct)
//!deleteProduct(productId)

// Retrieve array of objects 'products' from localStorage
function getProductsFromLocalStorage(): AdminProduct[] {
  const products = localStorage.getItem('cart')
  return products ? JSON.parse(products) : []
}

// This will run in App.tsx or index.tsx in a useEffect, essentially running on app startup.
function setProductsInLocalStorageInitial(): void {
  // Check what is currently inside localStorage for array of objects 'products'
  const productsInStorage = localStorage.getItem('products')

  // If localStorage is empty, initialize localStorage to be initialProducts
  if (!productsInStorage) {
    localStorage.setItem('products', JSON.stringify(initialProducts))
  }

  // Through this condition, this function will only execute once when the app is first loaded. It will only run again if the user clears their browser cache.
  // So, the Admin's modified/added products will never be replaced by the initialProducts
}
