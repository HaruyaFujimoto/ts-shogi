export const range = (start: number, length: number): number[] =>
  [...new Array(length)].map( (_, i) => start + i );
