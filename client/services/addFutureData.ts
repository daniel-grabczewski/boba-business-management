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

