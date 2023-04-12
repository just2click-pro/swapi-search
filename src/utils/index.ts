export function isStringArray(arr: string[] | unknown[]): arr is string[] {
  return Array.isArray(arr) && arr.every(item => typeof item === 'string')
}

export function capitalizeFirstLetter(str: string): string {
  const firstLetter = str.charAt(0)
  return firstLetter.toUpperCase() + str.slice(1)
}
