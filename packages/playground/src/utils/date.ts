/**
 * Returns a new date object with the same date as the given date, but one year before.
 * @param date The date to get the year before.
 * @returns A new date object with the same date as the given date, but one year before.
 */
export function oneYearBefore(date: Date): Date {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() - 1);
  return newDate;
}

/**
 * Returns an array of weeks between the two given dates.
 * The week start is always Sunday.
 * First week should not contain days lower than date1 (undefined instead).
 * Last week should not contain days higher than date2 (undefined instead).
 * Week object contains the year and week number in the year. It also contains the month number of the first day of the week.
 * @param date1 The first date.
 * @param date2 The second date.
 */
export function getWeeksBetween(date1: Date, date2: Date): Week[] {
  const weeks: Week[] = [];
  const date = new Date(date1);
  date.setDate(date.getDate() - date.getDay());
  while (date <= date2) {
    const week: Week = {
      year: date.getFullYear(),
      week: getWeekNumber(date),
      month: date.getMonth(),
      days: [],
    };
    for (let i = 0; i < 7; i++) {
      if (date > date1 && date <= date2) {
        week.days.push(new Date(date));
      } else {
        week.days.push(undefined);
      }
      date.setDate(date.getDate() + 1);
    }
    if (week.days.filter(Boolean).length > 0) {
      weeks.push(week);
    }
  }
  return weeks;
}

/**
 * Returns the week number of the given date.
 * @param date The date to get the week number of.
 * @returns The week number of the given date.
 */
export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

/**
 * Returns the name of the month at the given index.
 * @param index The index of the month.
 * @param format The format of the month name.
 * @returns The name of the month at the given index.
 */
export function getMonthName(
  index: number,
  format: "long" | "short" = "short",
): string {
  return new Date(0, index).toLocaleString("en-US", { month: format });
}

/**
 * Returns the name of the day at the given index.
 * @param index The index of the day.
 * @param format The format of the day name.
 */
export function getDayName(
  index: number,
  format: "long" | "short" = "short",
): string {
  return new Date(0, 0, index).toLocaleString("en-US", { weekday: format });
}

export type Week = {
  year: number;
  week: number;
  month: number;
  days: (Date | undefined)[];
};
