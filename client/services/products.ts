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
  const products = localStorage.getItem('products')
  return products ? JSON.parse(products) : []
}

function getAllProductsAdmin() : AdminProduct[] {
  return getProductsFromLocalStorage()
}

function getAllProductsShopper() : UserProduct[] {
  const products = getProductsFromLocalStorage()
  const enabledProducts = products.filter((product) => product.isEnabled)
  const shopperProducts = enabledProducts.map(({ isEnabled, ...rest }) => rest)
  return shopperProducts
}

// If localStorage is empty, initialize localStorage to be initialProducts
function setProductsInLocalStorageInitial(): void {
  const productsInStorage = localStorage.getItem('products')

  if (!productsInStorage) {
    localStorage.setItem('products', JSON.stringify(initialProducts))
  }
}

//!fetchProductByIdAdmin
function fetchProductByIdAdmin(id : number) : AdminProduct {


  return 
}

