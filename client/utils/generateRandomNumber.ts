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
