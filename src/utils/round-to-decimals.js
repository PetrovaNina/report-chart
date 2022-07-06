export const roundToDecimals = (num, afterZero) => {
  const decimal = Math.pow(10, afterZero);
  return Math.round(num * decimal) / decimal;
};
