export function isStringArray(arr: string[] | unknown[]): arr is string[] {
  return Array.isArray(arr) && arr.every(item => typeof item === 'string')
}

export function capitalizeFirstLetter(str: string): string {
  const firstLetter = str.charAt(0)
  return firstLetter.toUpperCase() + str.slice(1)
}

export function convertUnderscoresToSpaces(value: string): string {
  if (!value) return ''
  const withSpaces = value.replaceAll('_', ' ')
  return capitalizeFirstLetter(withSpaces)
}

function formatNumbers(value: string): string {
  return parseInt(value).toLocaleString('en-US')
}

function formatHeight(value: string): string {
  const valueAsNumber = parseInt(value)

  return (valueAsNumber / 100).toFixed(2) + ' m'
}

export function formatTableValues(value: string, header: string): string | any {
  if (!value) return ''
  const isNumeric = /^\d+$/.test(value)

  // Special handling of specific values
  switch (header) {
    case 'gender':
      return
    case 'height':
      return formatHeight(value)
  }

  if (isNumeric) {
    return formatNumbers(value)
  }

  return capitalizeFirstLetter(value)
}
