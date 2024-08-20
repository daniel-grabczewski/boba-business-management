import { futureOrders } from '../data/futureData/futureOrdersData'
import { futureReviews } from '../data/futureData/futureReviewsData'
import { futureEmails } from '../data/futureData/futureEmailData'
import { generateCurrentDate } from '../utils/generateDate'
import { formatDateToDDMMYYYY } from '../utils/formatDate'
import { generateRandomNumber } from '../utils/generateRandomNumber'

//Given start ID and end ID, cut the array (inclusively) to be between the two IDs, then return a deep copy of the cut array.
function cutArray<T extends { id: number }>(
  array: T[],
  startId: number,
  endId: number
): T[] {
  // Adjust to match indices to ID values: IDs start from 1, indices start from 0
  const slicedArray = array.slice(startId - 1, endId)
  return structuredClone(slicedArray)
}

const minItems = 2
const maxItems = 5

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
    const reviewCount = generateRandomNumber(minItems, maxItems)
    const emailCount = generateRandomNumber(minItems, maxItems)

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

    //Function to process selectedFutureOrders will go here
    //Function to process selectedFutureReviews will go here
    //Function to process selectedFutureEmails will go here

    //There is nothing else to do in this function, so we leave
    return
  }

  //Otherwise, we use the latest Ids we set as the start point, we generate the numbers again, use them to cut them up, set the numbers as the latest IDs, and then process the cut up arrays into the functions

  const latestDate = JSON.parse(latestDateInStorage).currentDate

  //If the date in local storage is the same as the current day, do nothing
  if (currentDate === latestDate) {
    return
  }

  //Otherwise, we cut up the arrays
  const latestIds = JSON.parse(latestIdsInStorage)

  const orderCount = generateRandomNumber(minItems, maxItems)
  const reviewCount = generateRandomNumber(minItems, maxItems)
  const emailCount = generateRandomNumber(minItems, maxItems)

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

  //Function to process selectedFutureOrders will go here
  //Function to process selectedFutureReviews will go here
  //Function to process selectedFutureEmails will go here

  localStorage.setItem(
    'latestIdsInStorage',
    JSON.stringify({
      latestOrderId: latestIds.latestOrderId + orderCount,
      latestReviewId: latestIds.latestReviewId + reviewCount,
      latestEmailId: latestIds.latestEmailId + emailCount,
    })
  )

  //Set local storage date to current date, so when this function is run again, it won't get past the if statement 'currentDate === latestDate' check
  localStorage.setItem(
    'latestDateInStorage',
    JSON.stringify({ currentDate: currentDate })
  )
}
