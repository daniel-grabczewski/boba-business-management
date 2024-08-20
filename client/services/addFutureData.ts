import { futureOrders } from '../data/futureData/futureOrdersData'
import { futureReviews } from '../data/futureData/futureReviewsData'
import { futureEmails } from '../data/futureData/futureEmailData'
import { generateCurrentDate } from '../utils/generateDate'
import { formatDateToDDMMYYYY } from '../utils/formatDate'
import { generateRandomNumber } from '../utils/generateRandomNumber'
import { processFutureOrders } from './orders'
import { processFutureReviews } from './reviews'
import { processFutureEmails } from './emails'

const minItems = 2
const maxItems = 5

//Given start ID and end ID, cut the array (inclusively) to be between the two IDs, then return a deep copy of the cut array.
function cutArray<T extends { id: number }>(
  array: T[],
  startId: number,
  endId: number
): T[] {
  const startIndex = Math.max(startId - 1, 0)
  const endIndex = Math.min(endId, array.length)
  const slicedArray = array.slice(startIndex, endIndex)
  return structuredClone(slicedArray)
}

export function addFutureData(): void {
  const currentDate = formatDateToDDMMYYYY(generateCurrentDate())

  const latestDateInStorage = localStorage.getItem('latestDateInStorage')
  const latestIdsInStorage = localStorage.getItem('latestIdsInStorage')

  // Initialise the data for the first time it is used
  if (!latestDateInStorage || !latestIdsInStorage) {
    localStorage.setItem(
      'latestDateInStorage',
      JSON.stringify({ currentDate: currentDate })
    )

    const orderCount = generateRandomNumber(minItems, maxItems)
    const reviewCount = generateRandomNumber(minItems, maxItems, [orderCount])
    const emailCount = generateRandomNumber(minItems, maxItems, [
      orderCount,
      reviewCount,
    ])

    localStorage.setItem(
      'latestIdsInStorage',
      JSON.stringify({
        latestOrderId: orderCount,
        latestReviewId: reviewCount,
        latestEmailId: emailCount,
      })
    )

    const selectedFutureOrders = cutArray(futureOrders, 1, orderCount)
    const selectedFutureReviews = cutArray(futureReviews, 1, reviewCount)
    const selectedFutureEmails = cutArray(futureEmails, 1, emailCount)

    // Process data if arrays are not empty
    if (selectedFutureOrders.length > 0) {
      processFutureOrders(selectedFutureOrders)
    }
    if (selectedFutureReviews.length > 0) {
      processFutureReviews(selectedFutureReviews)
    }
    if (selectedFutureEmails.length > 0) {
      processFutureEmails(selectedFutureEmails)
    }

    return
  }

  const latestDate = JSON.parse(latestDateInStorage).currentDate

  // If the date in local storage is the same as the current day, do nothing
  if (currentDate === latestDate) {
    return
  }

  const latestIds = JSON.parse(latestIdsInStorage)

  const orderCount = generateRandomNumber(minItems, maxItems)
  const reviewCount = generateRandomNumber(minItems, maxItems, [orderCount])
  const emailCount = generateRandomNumber(minItems, maxItems, [
    orderCount,
    reviewCount,
  ])

  const selectedFutureOrders = cutArray(
    futureOrders,
    latestIds.latestOrderId + 1,
    latestIds.latestOrderId + orderCount
  )
  const selectedFutureReviews = cutArray(
    futureReviews,
    latestIds.latestReviewId + 1,
    latestIds.latestReviewId + reviewCount
  )
  const selectedFutureEmails = cutArray(
    futureEmails,
    latestIds.latestEmailId + 1,
    latestIds.latestEmailId + emailCount
  )

  // Process data if arrays are not empty
  if (selectedFutureOrders.length > 0) {
    processFutureOrders(selectedFutureOrders)
  }

  if (selectedFutureReviews.length > 0) {
    processFutureReviews(selectedFutureReviews)
  }

  if (selectedFutureEmails.length > 0) {
    processFutureEmails(selectedFutureEmails)
  }

  // Update the latest IDs in local storage
  localStorage.setItem(
    'latestIdsInStorage',
    JSON.stringify({
      latestOrderId: latestIds.latestOrderId + orderCount,
      latestReviewId: latestIds.latestReviewId + reviewCount,
      latestEmailId: latestIds.latestEmailId + emailCount,
    })
  )

  // Set local storage date to current date
  localStorage.setItem(
    'latestDateInStorage',
    JSON.stringify({ currentDate: currentDate })
  )
}
