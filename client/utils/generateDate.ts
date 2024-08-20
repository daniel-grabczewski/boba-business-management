// Returns the current date & time in 'YYYY-MM-DD HH:MM:SS' format
export function generateCurrentDateTime(): string {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// Returns the current date in 'YYYY-MM-DD' format
export function generateCurrentDate(): string {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// Function to generate a random date within the last specified number of days in 'YYYY-MM-DD HH:MM:SS' format
export function getRandomDateTimeWithinLastDays(days: number): string {
  const now = new Date()

  // Determine the start time based on the current time and the days parameter
  const startTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - days + 1,
    6,
    0,
    0
  )

  // Adjust start time back to the previous day if it's currently before 6 AM and days is 1
  if (now.getHours() < 6 && days === 1) {
    startTime.setDate(startTime.getDate() - 1)
  }

  // The end time is always the current moment unless it's before 6 AM and days is 1
  const endTime =
    now.getHours() < 6 && days === 1
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0)
      : now

  // Generate a random date between the calculated start time and the current time
  const randomTimestamp =
    startTime.getTime() +
    Math.random() * (endTime.getTime() - startTime.getTime())
  const randomDate = new Date(randomTimestamp)

  // Format the date to 'YYYY-MM-DD HH:MM:SS'
  const year = randomDate.getFullYear()
  const month = String(randomDate.getMonth() + 1).padStart(2, '0')
  const day = String(randomDate.getDate()).padStart(2, '0')
  const hours = String(randomDate.getHours()).padStart(2, '0')
  const minutes = String(randomDate.getMinutes()).padStart(2, '0')
  const seconds = String(randomDate.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
