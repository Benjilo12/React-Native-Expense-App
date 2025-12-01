// Format a JS Date object into YYYY-MM-DD format
export function getFormattedDate(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1) // Months start from 0, so add 1
    .toString()
    .padStart(2, "0")}-${date
    .getDate() // Add leading zero if needed
    .toString()
    .padStart(2, "0")}  `;
}

// Return a new date X days before the given date
export function getDateMinusDays(date, days) {
  // Create a new date by subtracting the number of days
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
