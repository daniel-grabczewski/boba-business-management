// Utility function to check if a string contains only numbers and spaces
export function checkIfStringIsOnlyNumbers(string: string): boolean {
  return /^[\d\s]+$/.test(string)
}

// Utility function to check if a string contains only letters and spaces
export function checkIfStringIsOnlyLetters(string: string): boolean {
  return /^[a-zA-Z\s]+$/.test(string)
}