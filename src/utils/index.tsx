export const firstLetterUppercase = (text: string): string => {
  text.toLowerCase()
  return text.charAt(0).toUpperCase() + text.slice(1)
}