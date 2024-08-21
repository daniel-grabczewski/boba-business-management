import { AdminProduct } from '../../models/Products'

//Generate a random number between the min and max. Optionally, give an array of numbers to be avoided for the result.
export function generateRandomNumber(
  min: number,
  max: number,
  avoid: number[] = []
): number {
  const range = max - min + 1

  if (avoid.length >= range && avoid.every((num) => num >= min && num <= max)) {
    return Math.floor(Math.random() * range) + min
  }

  let randomNumber
  do {
    randomNumber = Math.floor(Math.random() * range) + min
  } while (avoid.includes(randomNumber))
  return randomNumber
}

export function assignRandomStocks(
  products: AdminProduct[],
  lowStockThreshold: number,
  totalMax: number
): AdminProduct[] {
  // Determine the upper 25% limit
  const upperQuarterStart = Math.floor(
    lowStockThreshold + 1 + 0.75 * (totalMax - lowStockThreshold)
  )

  // Randomly pick 1 to 4 products to have low stock
  const shuffledProducts = [...products].sort(() => 0.5 - Math.random())
  const lowStockCount = Math.floor(Math.random() * 4) + 1 // Between 1 and 4
  const lowStockProducts = shuffledProducts.slice(0, lowStockCount)
  const remainingProducts = shuffledProducts.slice(lowStockCount)

  // Assign low stock values
  lowStockProducts.forEach((product) => {
    product.stock = Math.floor(Math.random() * (lowStockThreshold + 1)) // 0 to lowStockThreshold
  })

  // Assign stock to the rest of the products
  remainingProducts.forEach((product, index) => {
    if (index < Math.floor(0.75 * remainingProducts.length)) {
      // 75% of the remaining products get stock in the upper 25% of the range
      product.stock =
        Math.floor(Math.random() * (totalMax - upperQuarterStart + 1)) +
        upperQuarterStart
    } else {
      // Remaining 25% get stock randomly between lowStockThreshold+1 and the upper quarter start
      product.stock =
        Math.floor(
          Math.random() * (upperQuarterStart - (lowStockThreshold + 1))
        ) +
        (lowStockThreshold + 1)
    }
  })

  return products
}
