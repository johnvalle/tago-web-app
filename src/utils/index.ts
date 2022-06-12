import dayjs from 'dayjs';

/**
 * Generic pipe utility function.
 * @param fns Array of functions
 * @returns
 */
export const pipe =
  <T>(fns: Array<(arg: T) => any>) =>
  (value: T) =>
    fns.reduce((currVal, fn) => fn(currVal), value);

/**
 * Truncates text to 20 words.
 * @param text
 * @returns truncated text
 */
export const truncate = (text: string) => {
  const splitText = text.split('');

  if (splitText.length <= 20) return text;
  return splitText.splice(0, 20).join('').concat('...');
};

/**
 * Formats date.
 * @example Jun 12, 2022 8:00 PM
 * @param rawDate Date to be formatted.
 * @returns Formatted date
 */
export const formatDate = (rawDate: string) => dayjs(rawDate).format('MMM DD, YYYY h:MM A');
