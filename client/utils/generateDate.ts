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
// Function to generate a random date within the last specified number of days in 'YYYY-MM-DD HH:MM:SS' format
export function getRandomDateTimeWithinLastDays(days: number): string {
  const now = new Date()
  const pastDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - days,
    6
  )

  // Generate a random date and time between pastDate and now
  const randomTime =
    pastDate.getTime() + Math.random() * (now.getTime() - pastDate.getTime())
  const randomDate = new Date(randomTime)

  // Constrain the time to be no later than the current time
  if (randomDate > now) {
    randomDate.setTime(now.getTime())
  }

  // Constrain the hours to be no earlier than 6 AM of each day
  if (randomDate.getHours() < 6) {
    randomDate.setHours(6)
  }

  // Format the date to 'YYYY-MM-DD HH:MM:SS'
  const year = randomDate.getFullYear()
  const month = String(randomDate.getMonth() + 1).padStart(2, '0')
  const day = String(randomDate.getDate()).padStart(2, '0')
  const hours = String(randomDate.getHours()).padStart(2, '0')
  const minutes = String(randomDate.getMinutes()).padStart(2, '0')
  const seconds = String(randomDate.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
