// Given a string and a max character count, return a truncated version of the text, followed be '...'
export const truncate = (str: string, charCount: number): string =>
  str.length > charCount ? str.slice(0, charCount) + '...' : str
