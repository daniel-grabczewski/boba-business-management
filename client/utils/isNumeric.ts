// Given a string, return true if the string contains only numeric characters. Otherwise, return false
export function isNumeric(input: string | number | undefined): boolean {
  if (input === undefined) {
    return false
  }
  return /^\d+$/.test(`${input}`)
}
