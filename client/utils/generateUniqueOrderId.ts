// Parses the date string in the format 'YYYY-MM-DD HH:MM:SS' and converts it to a Date object
function parseDateString(dateString: string): Date {
  const [datePart, timePart] = dateString.split(' ')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hours, minutes, seconds] = timePart.split(':').map(Number)
  return new Date(year, month - 1, day, hours, minutes, seconds)
}

// Generate a unique order ID based on current date/time.
// Optionally, provide a date/time in 'YYYY-MM-DD HH:MM:SS' format, to generate a unique order ID based on it.
export function generateUniqueOrderId(dateString?: string): number {
  let date: Date

  if (dateString) {
      date = parseDateString(dateString)
  } else {
      date = new Date()
  }

  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0')

  const baseString = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`

  let scrambledString = ''
  const scrambleOrder = [2, 5, 8, 11, 1, 9] 
  scrambleOrder.forEach((index) => {
      scrambledString += baseString[index]
  })

  if (scrambledString.startsWith('0')) {
      scrambledString = '1' + scrambledString.slice(1)
  }

  return Number(scrambledString)
}
