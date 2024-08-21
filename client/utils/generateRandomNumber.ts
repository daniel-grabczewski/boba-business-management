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

//Given products as AdminProduct[], assign a random stock number to each product.
export function assignRandomStocks(
  products: AdminProduct[],
  lowStockThreshold: number,
  totalMax: number,
  excludeIds: number[] // Array of IDs to exclude from random stock assignment
): AdminProduct[] {
  // Helper function to generate unique random stock
  const generateUniqueStock = (
    min: number,
    max: number,
    usedStocks: Set<number>
  ): number => {
    let potentialStock
    do {
      potentialStock = Math.floor(Math.random() * (max - min + 1)) + min
    } while (usedStocks.has(potentialStock))
    usedStocks.add(potentialStock)
    return potentialStock
  }

  // Set to track used stock values
  const usedStocks = new Set<number>()

  // Filter out products to be excluded based on IDs
  const filteredProducts = products.filter(
    (product) => !excludeIds.includes(product.id)
  )

  // Randomly pick 1 to 4 products to have low stock
  const shuffledProducts = [...filteredProducts].sort(() => 0.5 - Math.random())
  const lowStockCount = Math.floor(Math.random() * 4) + 1 // Between 1 and 4
  const lowStockProducts = shuffledProducts.slice(0, lowStockCount)
  const remainingProducts = shuffledProducts.slice(lowStockCount)

  // Assign unique low stock values
  lowStockProducts.forEach((product) => {
    product.stock = generateUniqueStock(0, lowStockThreshold, usedStocks) // 0 to lowStockThreshold
  })

  // Determine the upper 25% limit
  const upperQuarterStart = Math.floor(
    lowStockThreshold + 1 + 0.75 * (totalMax - lowStockThreshold)
  )

  // Assign stock to the rest of the products
  remainingProducts.forEach((product, index) => {
    if (index < Math.floor(0.75 * remainingProducts.length)) {
      // 75% of the remaining products get stock in the upper 25% of the range
      product.stock = generateUniqueStock(
        upperQuarterStart,
        totalMax,
        usedStocks
      )
    } else {
      // Remaining 25% get stock randomly between lowStockThreshold+1 and the upper quarter start
      product.stock = generateUniqueStock(
        lowStockThreshold + 1,
        upperQuarterStart - 1,
        usedStocks
      )
    }
  })

  // Re-merge the excluded products
  const excludedProducts = products.filter((product) =>
    excludeIds.includes(product.id)
  )
  return [...filteredProducts, ...excludedProducts].sort((a, b) => a.id - b.id) // Re-sort by ID for consistency
}
