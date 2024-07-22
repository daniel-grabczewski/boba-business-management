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
  const pastDate = new Date()
  pastDate.setDate(now.getDate() - days)

  // Generate a random date between pastDate and now
  const randomDate = new Date(
    pastDate.getTime() + Math.random() * (now.getTime() - pastDate.getTime())
  )

  // Set a random time between 6am and 1am
  const randomHour = Math.floor(Math.random() * (25 - 6) + 6) // Random hour between 6 and 24 (24 is 0 of next day)
  const randomMinute = Math.floor(Math.random() * 60)
  const randomSecond = Math.floor(Math.random() * 60)

  randomDate.setHours(randomHour % 24, randomMinute, randomSecond)

  // Format the date to 'YYYY-MM-DD HH:MM:SS'
  const year = randomDate.getFullYear()
  const month = String(randomDate.getMonth() + 1).padStart(2, '0')
  const day = String(randomDate.getDate()).padStart(2, '0')
  const hours = String(randomDate.getHours()).padStart(2, '0')
  const minutes = String(randomDate.getMinutes()).padStart(2, '0')
  const seconds = String(randomDate.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
