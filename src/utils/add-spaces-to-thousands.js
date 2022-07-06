export const addSpacesToThousands = (num) =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
