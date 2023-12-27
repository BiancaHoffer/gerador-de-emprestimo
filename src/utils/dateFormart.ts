export function dateFormat(value: any) {
  if (!value) {
    return "dd/mm/aaaa"
  }

  const date = new Date(value);

  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: "numeric",
    month: "long",
    year: "numeric"
  })
    .replace(/\b(\w{3,})\b/g, match => match.charAt(0).toUpperCase() + match.slice(1));
  return formattedDate;
}