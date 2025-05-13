import { format, parseISO } from "date-fns";

/**
 * Format a price as a currency string
 * 
 * @param price - The price to format
 * @param currencyCode - The currency code (default: USD)
 * @returns Formatted price string
 */
export const formatPrice = (price: number, currencyCode = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(price);
};

/**
 * Format an ISO date string to a readable format
 * 
 * @param dateString - ISO date string
 * @param formatStr - Format string for date-fns (default: 'MMM d, yyyy')
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, formatStr = "MMM d, yyyy"): string => {
  try {
    return format(parseISO(dateString), formatStr);
  } catch (error) {
    console.error("Invalid date format:", dateString);
    return "Invalid date";
  }
};

/**
 * Format a date-time string
 * 
 * @param dateString - ISO date string
 * @returns Formatted date-time string
 */
export const formatDateTime = (dateString: string): string => {
  return formatDate(dateString, "MMM d, yyyy h:mm a");
};

/**
 * Truncate a string to a specified length
 * 
 * @param str - The string to truncate
 * @param length - Max length (default: 100)
 * @returns Truncated string with ellipsis if needed
 */
export const truncateString = (str: string, length = 100): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
};

/**
 * Capitalize the first letter of a string
 * 
 * @param str - The string to capitalize
 * @returns String with first letter capitalized
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format a phone number
 * 
 * @param phone - The phone number string
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "");
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone; // Return original if can't format
};