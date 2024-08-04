// Given a date in 'YYYY-MM-DD HH-MM-SS' format, returns it in 'DD/MM/YYYY' format
export function formatDateToDDMMYYYY(dateString: string): string {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

// Given a date in 'YYYY-MM-DD HH-MM-SS' format, return it in 'HH:MMAMPM' format
export function format24HourTo12Hour(dateString: string): string {
  const date = new Date(dateString)

  const hour = date.getHours()
  const minute = date.getMinutes()
  const twelveHour = hour % 12 || 12

  // Determine whether it's AM or PM
  const ampm = hour < 12 ? 'AM' : 'PM'

  // Pad the minute with a zero if it's less than 10
  const minuteString = String(minute).padStart(2, '0')

  // Return the formatted time
  return `${twelveHour}:${minuteString}${ampm}`
}

// Given a date in 'YYYY-MM-DD HH-MM-SS' format, returns it as a relative string or 'DD/MM/YYYY' format
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()

  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return 'Today'
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays <= 3) {
    return `${diffDays} days ago`
  } else {
    return formatDateToDDMMYYYY(dateString)
  }
}
