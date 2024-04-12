import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a given date into a string representation.
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string} The formatted date string.
 */
export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats a given date into a string representation of the time in the format "hh:mm AM/PM".
 *
 * @param date - The date to be formatted.
 * @returns A string representation of the time in the format "hh:mm AM/PM".
 */
export function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
}

/**
 * Formats a given amount of money into a currency string.
 *
 * @param amount - The amount of money to format.
 * @returns The formatted currency string.
 */
export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Returns a string representing the relative date from the given date to the current date.
 *
 * @param {Date} date - The date to calculate the relative date from.
 * @returns {string} - The relative date string.
 */
export function relativeDate(date: Date) {
  return formatDistanceToNowStrict(date, { addSuffix: true });
}

/**
 * Converts a string to a slug format.
 *
 * @param str - The string to be converted.
 * @returns The slug version of the input string.
 */
export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param str - The string to be capitalized.
 * @returns The capitalized string.
 */
export function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
