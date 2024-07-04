import { setUsersInLocalStorageInitial } from './users'
import { setEmailsInLocalStorageInitial } from './emails'
import { setOrdersInLocalStorageInitial } from './orders'
import { setReviewsInLocalStorageInitial } from './reviews'
import { setProductsInLocalStorageInitial } from './products'
import { setShippingOptionsInLocalStorageInitial } from './shipping'

export function initializeLocalStorage() {
  setUsersInLocalStorageInitial()
  setEmailsInLocalStorageInitial()
  setOrdersInLocalStorageInitial()
  setReviewsInLocalStorageInitial()
  setProductsInLocalStorageInitial()
  setShippingOptionsInLocalStorageInitial()
}
