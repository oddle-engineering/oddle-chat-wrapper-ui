/**
 * Utility function to build CSS class names without external library dependency.
 * Filters out falsy values and joins the remaining class names with spaces.
 * 
 * @param classes - Array of class names, which can be strings, undefined, or false
 * @returns A single string with space-separated class names
 * 
 * @example
 * buildClasses('base', isActive && 'active', condition && 'conditional')
 * // Returns: 'base active conditional' (if isActive and condition are true)
 */
export const buildClasses = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};