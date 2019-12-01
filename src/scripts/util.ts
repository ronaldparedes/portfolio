/**
 * Utility function to generate random integers between
 * @param min value include
 * @param max value included
 */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Utility function to generate random floats between
 * @param min value include
 * @param max value included
 */
export function randomFloatBetween(min: number, max: number): number {
  return Math.random() * (max - min + 1) + min;
}
