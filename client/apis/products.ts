import { UserProduct, UpsertProduct, AdminProduct } from '../../models/Products'

//Needed apis:
//set products in localStorage
//get products from localStorage
//!fetchProductByIdAdmin(id : number)
//fetchProductByIdUser(id : number)
//!fetchAllProductsAdmin()
//fetchAllProductsUser()
//!countProductsBelowStockThreshold(stockThreshold : number)
//!modifyProductById(id: number, updatedProduct: UpsertProduct)
//!createProduct(newProduct: UpsertProduct)

// Retrieve array of objects 'products' from localStorage
function getProductsFromLocalStorage(): AdminProduct[] {
  const products = localStorage.getItem('cart')
  return products ? JSON.parse(products) : []
}