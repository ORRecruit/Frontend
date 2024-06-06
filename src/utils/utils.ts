import DOMPurify from "dompurify";

export function formatString(str: string): string {
  const capitalizeWords = (s: string): string =>
    s
      .split(" ")
      ?.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");

  const splitCamelCase = (s: string): string =>
    capitalizeWords(s.replace(/([a-z])([A-Z])/g, "$1 $2"));

  return str
    .split("-")
    ?.map((part: string) => splitCamelCase(part.trim()))
    .join(" - ");
}

export function createMarkup(htmlContent: any) {
  return { __html: DOMPurify.sanitize(htmlContent) };
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function isSessionValid(): boolean {
  const tokenTime = localStorage.getItem('tokenTime');
  const currentTime = Date.now();

  if (tokenTime) {
    const tokenTimestamp = Number(tokenTime);
    const diff = currentTime - tokenTimestamp;
    return diff < 1800000;
  }

  return false;
}

export function resetSessionTimer() {
  localStorage.setItem('tokenTime', Date.now().toString());
}
