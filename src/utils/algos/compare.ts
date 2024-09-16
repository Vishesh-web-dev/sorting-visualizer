const compare = (
  a: number,
  b: number,
  sortOrder: string,
  checkStrict: boolean = true
) => {
  if (sortOrder === "Ascending" && checkStrict) {
    return a > b;
  } else if (sortOrder === "Descending" && checkStrict) {
    return a < b;
  } else if (sortOrder === "Ascending") {
    return a >= b;
  } else if (sortOrder === "Descending") {
    return a <= b;
  }
  return false;
};
export default compare;
