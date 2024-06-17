import { ShippingOption } from "../../models/ShippingOptions"
import shippingOptions from "../data/shippingOptionsData"

// If localStorage 'shippingOptions' key doesn't exist, initialize new key 'shippingOptions' to be equal to value of shippingOptions
export function setShippingOptionsInLocalStorageInitial(): void {
  try {
    const shippingOptionsInStorage = localStorage.getItem('shippingOptions')

    if (!shippingOptionsInStorage) {
      localStorage.setItem('shippingOptions', JSON.stringify(shippingOptions))
    }
  } catch (error) {
    console.error('Failed to initialize shippingOptions in localStorage:', error)
  }
}

// Retrieve array of objects 'shippingOptions' from localStorage
export function getShippingOptionsFromLocalStorage(): ShippingOption[] {
  try {
    const shippingOptions = localStorage.getItem('shippingOptions')
    return shippingOptions ? JSON.parse(shippingOptions) : []
  } catch (error) {
    console.error('Failed to get shipping options from localStorage:', error)
    return []
  }
}

// Get shipping option details by given id
export function getShippingOptionById(id: number): ShippingOption | null {
  try {
    const shippingOptions = getShippingOptionsFromLocalStorage()
    const [shippingOption] = shippingOptions.filter(option => option.id === id)
    if (!shippingOption) {
      console.log(`Shipping option with id ${id} not found`)
      return null
    }
    return shippingOption
  } catch (error) {
    console.error('Failed to get shipping option by id:', error)
    return null
  }
}
