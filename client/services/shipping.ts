import shippingOptions from "../data/shippingOptionsData"

// If localStorage 'shippingOptions' key doesn't exist, initialize new key 'shippingOptions' to be equal to value of shippingOptions
export function setOrdersInLocalStorageInitial(): void {
  try {
    const shippingOptionsInStorage = localStorage.getItem('shippingOptions')

    if (!shippingOptionsInStorage) {
      localStorage.setItem('shippingOptions', JSON.stringify(shippingOptions))
    }
  } catch (error) {
    console.error('Failed to initialize shippingOptions in localStorage:', error)
  }
}