export const isWholeNumber = (x: number) =>
  x * 100 - Math.trunc(x * 100) < Number.EPSILON;
