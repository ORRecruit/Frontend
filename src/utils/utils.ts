export function formatString(str: string): string {
  const capitalizeWords = (s: string): string =>
    s
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const splitCamelCase = (s: string): string =>
    capitalizeWords(s.replace(/([a-z])([A-Z])/g, "$1 $2"));

  return str
    .split("-")
    .map((part: string) => splitCamelCase(part.trim()))
    .join(" - ");
}
