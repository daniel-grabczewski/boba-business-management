import { firstNames, lastNames } from '../data/randomNamesData'

export function generateRandomName(): string {
  // Function to get a random element from an array
  const getRandomElement = (arr: string[]): string =>
    arr[Math.floor(Math.random() * arr.length)]

  // Function to check if a name already exists in localStorage
  const nameExists = (name: string): boolean => {
    const storedNames = JSON.parse(
      localStorage.getItem('generatedNames') || '[]'
    )
    return storedNames.includes(name)
  }

  // Function to save a name to localStorage
  const saveName = (name: string) => {
    const storedNames = JSON.parse(
      localStorage.getItem('generatedNames') || '[]'
    )
    storedNames.push(name)
    localStorage.setItem('generatedNames', JSON.stringify(storedNames))
  }

  // Attempt to generate a unique name
  for (let i = 0; i < 5; i++) {
    const randomFirstName = getRandomElement(firstNames)
    const randomLastName = getRandomElement(lastNames)
    const randomName = `${randomFirstName} ${randomLastName}`

    if (!nameExists(randomName)) {
      saveName(randomName)
      return randomName
    }
  }

  // If no unique name is found after 5 attempts, return 'John Doe'
  return 'John Doe'
}
