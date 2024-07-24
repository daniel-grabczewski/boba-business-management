// Parses the date string in the format 'YYYY-MM-DD HH:MM:SS' and converts it to a Date object
function parseDateString(dateString: string): Date {
  const [datePart, timePart] = dateString.split(' ')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hours, minutes, seconds] = timePart.split(':').map(Number)
  return new Date(year, month - 1, day, hours, minutes, seconds)
}


