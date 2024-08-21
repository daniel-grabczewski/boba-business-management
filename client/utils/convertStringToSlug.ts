// Given a string, convert it to a slug with kebab casing
export function convertStringToSlug(str: string): string {
  str = str.toLowerCase()

  // Replace spaces and undesired characters with hyphens
  // This regex handles multiple spaces and special characters at once
  str = str.replace(/[\s\W-]+/g, '-')

  // Remove leading and trailing hyphens (if any)
  str = str.replace(/^-+|-+$/g, '')

  return str
}
