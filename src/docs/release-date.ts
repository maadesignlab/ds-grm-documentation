const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export function formatReleaseDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}
